"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { useCurrentAcademicYearId, useAcademicContext } from '@/appContext/academicContext'
import { generateYearSummarySheet } from '@/lib/api-summary'

export function TestAcademicContext() {
  const currentYearId = useCurrentAcademicYearId()
  const context = useAcademicContext()
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleGenerateSummary = async () => {
    if (!currentYearId) {
      console.warn('No academic year selected')
      return
    }

    setIsGenerating(true)
    try {
      console.log('Generating summary for academic year:', currentYearId)
      // For now, let's just test with dummy parameter for the second argument
      await generateYearSummarySheet(currentYearId, 'test-filename')
      console.log('Summary sheet generated successfully!')
    } catch (error) {
      console.error('Error generating summary sheet:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Academic Context Test</h3>
      
      <div className="space-y-2 mb-4">
        <p><strong>Current Academic Year ID:</strong> {currentYearId || 'None selected'}</p>
        <p><strong>Selected Semester ID:</strong> {context?.selectedSemester || 'None selected'}</p>
        <p><strong>Academic Years Available:</strong> {context?.academicYears?.length || 0}</p>
        <p><strong>Semesters Available:</strong> {context?.academicSemesters?.length || 0}</p>
        <p><strong>Loading:</strong> {context?.isLoading ? 'Yes' : 'No'}</p>
        {context?.error && (
          <p className="text-red-500"><strong>Error:</strong> {context.error}</p>
        )}
      </div>

      <Button 
        onClick={handleGenerateSummary} 
        disabled={!currentYearId || isGenerating}
        className="w-full"
      >
        {isGenerating ? 'Generating...' : 'Generate Year Summary Sheet'}
      </Button>
    </div>
  )
}