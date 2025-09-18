"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { ExcelPreviewTable } from '@/components/ui/excel-preview-table'
import { FileSpreadsheet, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useCurrentAcademicYearId, useAcademicContext } from '@/appContext/academicContext'
import {
  generateYearSummarySheet,
  getSubmittedGroups,
  generateSummarySheetForPreview
} from '@/lib/api-summary'
import { type GroupSubmission } from '@/lib/api-mark-submition'
import {
  parseExcelForPreview,
  type ExcelPreviewData
} from '@/lib/api-grading'

interface SummarySheetInfo {
  academicYearId: string
  groupId: string
  filename?: string
  lastModified?: Date
  size?: number
  submittedGroups?: GroupSubmission[]
}

interface SummaryPageProps {
  groupId: string;
  groupName?: string;
}

export default function SummaryPage({ groupId, groupName }: SummaryPageProps) {
  // Log the props when component mounts
  console.log('SummaryPage initializing with props:', { groupId, groupName });
  
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [isGroupsLoading, setIsGroupsLoading] = useState(false)
  const currentYearId = useCurrentAcademicYearId()
  const { selectedYearData } = useAcademicContext()

  const [sheetInfo, setSheetInfo] = useState<SummarySheetInfo>({
    academicYearId: currentYearId || '',
    groupId: groupId || '',
    submittedGroups: []
  })
  const [error, setError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<ExcelPreviewData | null>(null)
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info")
  const [lastGeneratedBlob, setLastGeneratedBlob] = useState<Blob | null>(null)
  const { toast } = useToast()

  // Update sheetInfo when academicYearId or groupId changes
  useEffect(() => {
    if (currentYearId || groupId) {
      console.log('Summary: Academic year changed to:', currentYearId)
      console.log('Summary: Using group ID:', groupId)
      setSheetInfo(prev => ({
        ...prev,
        academicYearId: currentYearId || prev.academicYearId,
        groupId: groupId || prev.groupId,
        filename: prev.filename,
        size: prev.size,
        lastModified: prev.lastModified
      }))
    }
  }, [currentYearId, groupId])

  // Function to fetch submitted groups
  const fetchSubmittedGroups = async () => {
    if (!sheetInfo.academicYearId) {
      toast({
        title: "No Academic Year Selected",
        description: "Please select an academic year from the header dropdown.",
        variant: "destructive",
      })
      return
    }

    setIsGroupsLoading(true)
    setError(null)

    try {
      const groups = await getSubmittedGroups()

      // We already have a specific groupId, but we'll still load all submitted groups for reference
      setSheetInfo(prev => ({
        ...prev,
        submittedGroups: groups
        // No longer setting selectedGroupIds since we're using the passed-in groupId
      }))

      toast({
        title: "Submitted Groups Loaded",
        description: `Found ${groups?.length || 0} groups with lesson submissions.`,
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch submitted groups'
      setError(errorMessage)
      toast({
        title: "Error Fetching Groups",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsGroupsLoading(false)
    }
  }

  // Function to generate summary sheet
  const generateSingleSummary = async () => {
    if (!sheetInfo.academicYearId || !sheetInfo.groupId) {
      toast({
        title: "Missing Required Information",
        description: "Please ensure an academic year is selected and group ID is available.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Detailed logging to verify the correct parameters are being used
      console.log('Generating summary with parameters:', {
        academicYearId: sheetInfo.academicYearId,
        groupId: sheetInfo.groupId,
        originalGroupId: groupId, // The prop passed to this component
        groupName
      })
      
      const result = await generateYearSummarySheet({
        academicYearId: sheetInfo.academicYearId,
        groupId: sheetInfo.groupId
      })

      if (result.success) {
        setSheetInfo(prev => ({
          ...prev,
          filename: result.data?.fileName,
          size: result.data?.fileSize,
          lastModified: new Date()
        }))

        toast({
          title: "Summary Generated",
          description: `Summary sheet generated successfully for group: ${groupName || sheetInfo.groupId}`,
        })
      } else {
        throw new Error(result.message)
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Test Generation Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Function to generate the summary sheet using the current group ID
  const generateSummarySheet = async () => {
    if (!sheetInfo.academicYearId || !sheetInfo.groupId) {
      toast({
        title: "Missing Information",
        description: "Please ensure academic year is selected and group ID is available.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Generate summary for the current group
      const results = await Promise.allSettled([
        generateYearSummarySheet({
          academicYearId: sheetInfo.academicYearId,
          groupId: sheetInfo.groupId
        })
      ])

      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
      const failed = results.length - successful

      if (successful > 0) {
        setSheetInfo(prev => ({
          ...prev,
          filename: `summary-sheets-${sheetInfo.academicYearId}-${successful}-groups.xlsx`,
          lastModified: new Date()
        }))

        toast({
          title: "Summary Sheets Generated",
          description: `Successfully generated ${successful} summary sheets${failed > 0 ? `, ${failed} failed` : ''}.`,
        })
      } else {
        throw new Error('All summary sheet generations failed')
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Function to generate and preview summary sheet
  const generateAndPreviewSheet = async () => {
    if (!sheetInfo.academicYearId || !sheetInfo.groupId) {
      toast({
        title: "Missing Information",
        description: "Please ensure academic year is selected and group ID is available.",
        variant: "destructive",
      })
      return
    }

    setIsPreviewLoading(true)
    setError(null)

    try {
      console.log('Generating summary sheet for preview with group ID:', sheetInfo.groupId)

      // Generate the Excel file for preview
      const { blob, filename } = await generateSummarySheetForPreview({
        academicYearId: sheetInfo.academicYearId,
        groupId: sheetInfo.groupId
      });

      console.log('Excel file generated for preview, parsing...', { filename, size: blob.size })

      // Parse the Excel file for preview
      const previewData = await parseExcelForPreview(blob, filename)

      console.log('Excel file parsed successfully:', previewData)

      // Set the preview data and update sheet info
      setPreviewData(previewData)
      setSheetInfo(prev => ({
        ...prev,
        filename,
        size: blob.size,
        lastModified: new Date()
      }))

      // Switch to preview tab
      setActiveTab("preview")

      toast({
        title: "Preview Generated",
        description: `Excel summary sheet parsed successfully with ${previewData.sheets.length} sheet(s).`,
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Preview generation failed:', err)
      toast({
        title: "Preview Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsPreviewLoading(false)
    }
  }

  // Function to handle download from preview
  const downloadFromPreview = async () => {
    if (!sheetInfo.academicYearId || !sheetInfo.groupId) {
      toast({
        title: "Missing Information",
        description: "Please ensure academic year is selected and group ID is available.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      console.log('Downloading summary sheet with group ID:', sheetInfo.groupId)
      const result = await generateYearSummarySheet({
        academicYearId: sheetInfo.academicYearId,
        groupId: sheetInfo.groupId
      })

      if (result.success) {
        toast({
          title: "Summary Downloaded",
          description: `Summary sheet downloaded successfully: ${result.data?.fileName}`,
        })
      } else {
        throw new Error(result.message)
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Download Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Auto-load submitted groups and preview when academic year is available
  const hasAutoLoaded = useRef(false)
  useEffect(() => {
    if (hasAutoLoaded.current || !sheetInfo.academicYearId) return
    hasAutoLoaded.current = true

    // Load both submitted groups and preview
    void fetchSubmittedGroups()
    void generateAndPreviewSheet()
  }, [sheetInfo.academicYearId])

  return (
    <div className="space-y-6 w-full min-w-0">
    
      
      
      {/* Main Content */}
      <div className="w-full overflow-x-auto">

            {previewData ? (
              <div className="w-full overflow-x-auto overflow-y-visible scroll-smooth">
                <div className="min-w-[800px]">
                  <ExcelPreviewTable
                    data={previewData.sheets}
                    onDownload={downloadFromPreview}
                    isDownloadLoading={isGenerating}
                  />
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Preview Available</h3>
                  <p className="text-gray-500 mb-4">
                    Load the Excel preview to view the sheet contents before downloading.
                  </p>
                  <Button onClick={generateAndPreviewSheet} disabled={isPreviewLoading}>
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
