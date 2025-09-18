"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ExcelPreviewTable } from '@/components/ui/excel-preview-table'
import { FileSpreadsheet, AlertCircle, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  fetchGradingExcelSheet,
  downloadGradingExcelSheet,
  fetchAndParseGradingSheet,
  validateGradingSheetParams,
  type ExcelPreviewData // Import the type from the API module
} from '@/lib/api-grading'
import { useCurrentAcademicSelection } from '@/appContext/academicContext'
import { useAuth } from '@/appContext/authcontext'

interface GradingSheetInfo {
  academicYearId: string  // This parameter name stays as semesterId for API compatibility, but we store academicYearId here
  groupId: string
  filename?: string
  lastModified?: Date
  size?: number
}

interface ExcelMarksPageProps {
  // The group ID from the class being viewed
  groupId: string;
  groupName?: string;
}

export default function ExcelMarksPage({ groupId, groupName }: ExcelMarksPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<ExcelPreviewData | null>(null)
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info")
  
  // Get authentication token
  const { token } = useAuth()
  
  // Get the current academic year ID and semester data from the academic context
  const { academicYearId, academicYearData } = useCurrentAcademicSelection()
  
  // Create a sheet info object with the academic year ID (used as semesterId param) and group ID
  const [sheetInfo, setSheetInfo] = useState<GradingSheetInfo>({
    academicYearId: academicYearId || '', // Using academicYearId instead of semesterId
    groupId: groupId || ''
  })
  
  // Update sheetInfo when academicYearId or groupId changes
  useEffect(() => {
    setSheetInfo({
      academicYearId: academicYearId || '', // API expects 'semesterId' param but we're sending academicYearId value
      groupId: groupId || '',
      filename: sheetInfo.filename,
      size: sheetInfo.size,
      lastModified: sheetInfo.lastModified
    })
  }, [academicYearId, groupId])
  const { toast } = useToast()

  // Function to fetch the Excel sheet info
  const fetchSheetInfo = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate parameters first
      validateGradingSheetParams(sheetInfo)

      const { blob, filename } = await fetchGradingExcelSheet(sheetInfo)

      // Update sheet info with fetched data
      setSheetInfo(prev => ({
        ...prev,
        filename,
        size: blob.size,
        lastModified: new Date()
      }))

      toast({
        title: "Sheet Info Updated",
        description: "Successfully fetched grading sheet information.",
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  const loadPreview = async (retryCount = 0) => {
    setIsPreviewLoading(true)
    setError(null)

    // Check token first
    if (!token) {
      console.error("Authentication token is missing when trying to load preview");
      setError("Authentication token is missing. Please log in again.");
      toast({
        title: "Authentication Error",
        description: "You must be logged in to view this data.",
        variant: "destructive",
      });
      setIsPreviewLoading(false);
      return;
    }
    
    // Double check local storage token exists
    const localToken = localStorage.getItem('token');
    if (!localToken) {
      console.error("No token in localStorage, updating localStorage");
      // Try to use the token from auth context
      localStorage.setItem('token', token);
    }

    try {
      // Log detailed information about the request
      console.log('Making grading sheet request with:', {
        academicYearId: sheetInfo.academicYearId,
        groupId: sheetInfo.groupId,
        tokenPresent: !!token,
        localTokenPresent: !!localToken,
        attempt: retryCount + 1
      });
      
      // Validate parameters first
      validateGradingSheetParams(sheetInfo)

      const previewData = await fetchAndParseGradingSheet(sheetInfo)
      setPreviewData(previewData)

      // Update sheet info with preview data
      setSheetInfo(prev => ({
        ...prev,
        filename: previewData.filename,
        size: previewData.fileSize,
        lastModified: new Date()
      }))

      setActiveTab("preview")

      toast({
        title: "Preview Loaded",
        description: `Successfully loaded Excel preview with ${previewData.sheets.length} sheet(s).`,
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      
      // Detailed error logging
      console.error('Preview load error:', {
        message: errorMessage,
        sheetInfo: {
          academicYearId: sheetInfo.academicYearId,
          groupId: sheetInfo.groupId
        },
        retryCount,
        error: err
      });
      
      // Check for 500 error - may be a temporary issue
      if (errorMessage.includes('500') && retryCount < 2) {
        // Retry after a delay
        toast({
          title: "Temporary Error",
          description: "Server error occurred. Retrying...",
          variant: "default",
        });
        
        setTimeout(() => {
          loadPreview(retryCount + 1);
        }, 2000); // Wait 2 seconds before retry
        return;
      }
      
      setError(errorMessage)
      
      // Detect if this is an authentication error
      if (errorMessage.includes('token') || errorMessage.includes('Authentication') || errorMessage.includes('unauthorized') || errorMessage.includes('401') || errorMessage.includes('403')) {
        toast({
          title: "Authentication Error",
          description: "Your session may have expired. Please log in again.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('500')) {
        toast({
          title: "Server Error (500)",
          description: "The server encountered an error. This may be due to invalid parameters or a temporary server issue.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Preview Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      // Only set loading to false if we're not retrying or if we've hit the max retries
      if (retryCount >= 2) {
        setIsPreviewLoading(false);
      }
    }
  }

  // Automatically load preview when component mounts or when semester/group changes
  useEffect(() => {
    // Check if all required data is available
    if (token && sheetInfo.academicYearId && sheetInfo.groupId) {
      console.log('Loading preview with:', {
        tokenAvailable: !!token,
        tokenLength: token ? token.length : 0,
        academicYearId: sheetInfo.academicYearId,
        groupId: sheetInfo.groupId,
        timestamp: new Date().toISOString()
      });
      
      // Add a small delay to ensure context is fully loaded
      const timer = setTimeout(() => {
        loadPreview();
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      console.warn('Cannot load preview, missing data:', {
        tokenAvailable: !!token,
        academicYearId: !!sheetInfo.academicYearId,
        groupId: !!sheetInfo.groupId
      });
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
      } else if (!sheetInfo.academicYearId || !sheetInfo.groupId) {
        setError("Missing required academic year or class information.");
      }
    }
  }, [token, sheetInfo.academicYearId, sheetInfo.groupId]);

  // This useEffect is already implemented above

  // Function to download the Excel sheet
  const downloadSheet = async () => {
    setIsDownloading(true)
    setError(null)

    // Check token first
    if (!token) {
      setError("Authentication token is missing. Please log in again.")
      toast({
        title: "Authentication Error",
        description: "You must be logged in to download this data.",
        variant: "destructive",
      })
      setIsDownloading(false)
      return
    }

    try {
      // Validate parameters first
      validateGradingSheetParams(sheetInfo)

      const filename = await downloadGradingExcelSheet(sheetInfo)

      toast({
        title: "Download Started",
        description: `Excel sheet "${filename}" is being downloaded.`,
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      
      // Detect if this is an authentication error
      if (errorMessage.includes('token') || errorMessage.includes('Authentication') || errorMessage.includes('unauthorized')) {
        toast({
          title: "Authentication Error",
          description: "Your session may have expired. Please log in again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Download Failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-6">  
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="space-y-1">
            <p><strong>Error:</strong> {error}</p>
            
            {error.includes('500') && (
              <div className="text-sm mt-2 p-2 bg-red-50 rounded">
                <p className="font-medium">Troubleshooting 500 errors:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>Verify that your academic year ID is correct: {sheetInfo.academicYearId}</li>
                  <li>Verify that your group ID is correct: {sheetInfo.groupId}</li>
                  <li>Try refreshing the page or logging out and back in</li>
                  <li>The server may be temporarily unavailable - try again later</li>
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Content Display */}
      <div className="mt-6">
        {previewData ? (
          <div>
         
            <ExcelPreviewTable
              data={previewData.sheets}
              onDownload={downloadSheet}
              isDownloadLoading={isDownloading}
            />
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Preview Available</h3>
              <p className="text-gray-500 mb-4">
                {!token
                  ? 'Authentication required. Please log in again.'
                  : !sheetInfo.academicYearId || !sheetInfo.groupId
                    ? 'Missing academic year or class information.'
                    : 'Load the Excel preview to view the sheet contents before downloading.'}
              </p>
              <Button
                onClick={() => loadPreview(0)}
                disabled={isPreviewLoading || !token || !sheetInfo.academicYearId || !sheetInfo.groupId}
              >
                {isPreviewLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                )}
                {isPreviewLoading ? 'Loading...' : 'Load Preview'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
