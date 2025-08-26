"use client"

import { useState } from "react"
import { ResultProcessingHeader } from './result-processing-header'
import { ResultProcessingStats } from './result-processing-stats'
import { ResultProcessingFiltersComponent } from './result-processing-filters'
import { ResultProcessingBulkActions } from './result-processing-bulk-actions'
import { ResultProcessingTable } from './result-processing-table'
import { ResultProcessingSummary } from './result-processing-summary'
import { mockResults } from './mock-data'
import { ResultProcessingFilters, ResultProcessingProps } from './types'

export function ResultProcessing({ className }: ResultProcessingProps) {
  const [selectedResults, setSelectedResults] = useState<string[]>([])
  const [filters, setFilters] = useState<ResultProcessingFilters>({
    searchTerm: "",
    statusFilter: "all",
    courseFilter: "all"
  })

  const filteredResults = mockResults.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         result.studentId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         result.module.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesStatus = filters.statusFilter === "all" || result.status === filters.statusFilter
    const matchesCourse = filters.courseFilter === "all" || result.course === filters.courseFilter
    
    return matchesSearch && matchesStatus && matchesCourse
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResults(filteredResults.map(result => result.id))
    } else {
      setSelectedResults([])
    }
  }

  const handleSelectResult = (resultId: string, checked: boolean) => {
    if (checked) {
      setSelectedResults([...selectedResults, resultId])
    } else {
      setSelectedResults(selectedResults.filter(id => id !== resultId))
    }
  }

  const handleBulkApprove = () => {
    console.log('Bulk approve:', selectedResults)
    // Add bulk approve logic here
  }

  const handleBulkReview = () => {
    console.log('Bulk review:', selectedResults)
    // Add bulk review logic here
  }

  const handleBulkReject = () => {
    console.log('Bulk reject:', selectedResults)
    // Add bulk reject logic here
  }

  return (
    <div className={`space-y-6 ${className || ""}`}>
      {/* Header */}
      <ResultProcessingHeader />

      {/* Quick Stats */}
      <ResultProcessingStats />

      {/* Filters */}
      <ResultProcessingFiltersComponent 
        filters={filters} 
        onFiltersChange={setFilters} 
      />

      {/* Bulk Actions */}
      <ResultProcessingBulkActions
        selectedCount={selectedResults.length}
        onBulkApprove={handleBulkApprove}
        onBulkReview={handleBulkReview}
        onBulkReject={handleBulkReject}
      />

      {/* Results Table */}
      <ResultProcessingTable
        results={filteredResults}
        selectedResults={selectedResults}
        onSelectAll={handleSelectAll}
        onSelectResult={handleSelectResult}
      />

      {/* Summary Cards */}
      <ResultProcessingSummary />
    </div>
  )
}
