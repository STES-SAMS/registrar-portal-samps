"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExcelPreviewTable } from '@/components/ui/excel-preview-table'
import { Download, FileSpreadsheet, AlertCircle, RefreshCw, Eye, Users } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useCurrentAcademicYearId, useAcademicContext } from '@/appContext/academicContext'
import { 
  generateYearSummarySheet, 
  generateTestSummarySheet,
  generateSummarySheetForPreview,
  getSubmittedGroups,
  getSubmittedGroupIds,
  getTestGroupData,
  TEST_GROUP_ID,
  type SummarySheetParams,
  type SummarySheetResponse
} from '@/lib/api-summary'
import { type GroupSubmission } from '@/lib/api-mark-submition'
import { 
  parseExcelForPreview,
  type ExcelPreviewData 
} from '@/lib/api-grading'

interface SummarySheetInfo {
  academicYearId: string
  selectedGroupIds: string[]
  filename?: string
  lastModified?: Date
  size?: number
  submittedGroups?: GroupSubmission[]
}

export default function SummaryPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [isGroupsLoading, setIsGroupsLoading] = useState(false)
  const currentYearId = useCurrentAcademicYearId()
  const { selectedYearData } = useAcademicContext()
  
  const [sheetInfo, setSheetInfo] = useState<SummarySheetInfo>({
    academicYearId: currentYearId || '',
    selectedGroupIds: [TEST_GROUP_ID], // Start with test group ID
    submittedGroups: [getTestGroupData()] // Include test group data
  })
  const [error, setError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<ExcelPreviewData | null>(null)
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info")
  const [lastGeneratedBlob, setLastGeneratedBlob] = useState<Blob | null>(null)
  const { toast } = useToast()

  // Update academic year when context changes
  useEffect(() => {
    if (currentYearId && currentYearId !== sheetInfo.academicYearId) {
      console.log('Summary: Academic year changed to:', currentYearId)
      console.log('Summary: Using test group ID:', TEST_GROUP_ID)
      setSheetInfo(prev => ({
        ...prev,
        academicYearId: currentYearId
      }))
    }
  }, [currentYearId, sheetInfo.academicYearId])

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
      
      setSheetInfo(prev => ({
        ...prev,
        submittedGroups: groups,
        selectedGroupIds: groups.map(g => g.groupId) // Auto-select all submitted groups
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

  // Function to generate test summary sheet
  const generateTestSummary = async () => {
    if (!sheetInfo.academicYearId) {
      toast({
        title: "No Academic Year Selected",
        description: "Please select an academic year from the header dropdown.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      console.log('Generating test summary with group ID:', TEST_GROUP_ID)
      const result = await generateTestSummarySheet(sheetInfo.academicYearId)
      
      if (result.success) {
        setSheetInfo(prev => ({
          ...prev,
          filename: result.data?.fileName,
          size: result.data?.fileSize,
          lastModified: new Date()
        }))

        toast({
          title: "Test Summary Generated",
          description: `Test summary sheet generated successfully using group ID: ${TEST_GROUP_ID}`,
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

  // Function to generate the summary sheet for all submitted groups
  const generateSummarySheet = async () => {
    if (!sheetInfo.academicYearId || sheetInfo.selectedGroupIds.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please ensure academic year is selected and there are submitted groups.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Generate summary for each selected group (using test group ID for now)
      const results = await Promise.allSettled(
        sheetInfo.selectedGroupIds.map(groupId => 
          generateYearSummarySheet(sheetInfo.academicYearId, TEST_GROUP_ID) // Use test ID
        )
      )

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
    if (!sheetInfo.academicYearId) {
      toast({
        title: "Missing Information",
        description: "Please ensure academic year is selected.",
        variant: "destructive",
      })
      return
    }

    setIsPreviewLoading(true)
    setError(null)

    try {
      console.log('Generating summary sheet for preview with test group ID:', TEST_GROUP_ID)
      
      // Generate the Excel file for preview (without downloading) using test group ID
      const { blob, filename } = await generateSummarySheetForPreview(
        sheetInfo.academicYearId, 
        TEST_GROUP_ID
      )
      
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
    if (!sheetInfo.academicYearId) {
      toast({
        title: "No Academic Year Selected",
        description: "Please select an academic year to download the summary.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      console.log('Downloading summary sheet with test group ID:', TEST_GROUP_ID)
      const result = await generateTestSummarySheet(sheetInfo.academicYearId)
      
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
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "info" | "preview")} className="w-full min-w-[600px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Sheet Information</TabsTrigger>
            <TabsTrigger value="preview">Excel Preview</TabsTrigger>
          </TabsList>

        <TabsContent value="info" className="space-y-6">
          {/* Academic Year Information Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Summary Sheet Generation</h3>
                  <p className="text-gray-600">Generate comprehensive summary reports</p>
                </div>
              </div>
              
              {/* Current Academic Year Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Academic Year</label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">
                      {selectedYearData?.name || selectedYearData?.title || 'No academic year selected'}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {currentYearId || 'None'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Submitted Groups</label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">
                      {sheetInfo.selectedGroupIds.length} groups
                    </p>
                    <p className="text-xs text-gray-500">
                      Including test group
                    </p>
                  </div>
                </div>
              </div>

              {/* Test Group Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Test Group Information</h4>
                <p className="text-sm text-blue-800 mb-2">
                  Using test group ID: <code className="bg-blue-100 px-1 rounded">{TEST_GROUP_ID}</code>
                </p>
                <p className="text-xs text-blue-700">
                  This is a test implementation that uses mock data for demonstration purposes.
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={generateAndPreviewSheet}
                  disabled={isPreviewLoading || !currentYearId}
                  className="flex items-center gap-2"
                >
                  {isPreviewLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="h-4 w-4" />
                  )}
                  {isPreviewLoading ? 'Loading Preview...' : 'Load Preview'}
                </Button>
                
                <Button 
                  onClick={generateTestSummary}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-[#026892] hover:bg-[#026899]"
                >
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {isGenerating ? 'Downloading...' : 'Download Excel Sheet'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Error:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {(isLoading || isGenerating) && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm font-medium">
                      {isLoading ? 'Fetching sheet information...' : 'Preparing download...'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        
          </TabsContent>

        <TabsContent value="preview" className="space-y-6">
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
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
