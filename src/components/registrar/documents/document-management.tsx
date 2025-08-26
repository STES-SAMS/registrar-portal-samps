import React, { useState, useMemo } from "react"
import { DocumentHeader } from "./document-header"
import { DocumentStatsCards } from "./document-stats-cards"
import { DocumentSearchFilters } from "./document-search-filters"
import { DocumentTable } from "./document-table"
import { DocumentPagination } from "./document-pagination"
import { Document, DocumentStats, DocumentFilters, PaginationState } from "./types"

interface DocumentManagementProps {
  initialStats?: DocumentStats
  initialDocuments?: Document[]
}

export function DocumentManagement({ 
  initialStats, 
  initialDocuments 
}: DocumentManagementProps) {
  // State management
  const [filters, setFilters] = useState<DocumentFilters>({
    searchTerm: "",
    departmentFilter: "all",
    schoolFilter: "all",
    statusFilter: "all",
    categoryFilter: "all"
  })
  
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10
  })
  
  const [showFilters, setShowFilters] = useState(false)

  // Default data
  const stats: DocumentStats = initialStats || {
    total: 1234,
    published: 890,
    draft: 234,
    underReview: 110
  }

  const documents: Document[] = initialDocuments || [
    {
      id: "1",
      documentId: "DOC001",
      name: "Student Handbook 2025",
      type: "PDF",
      size: "2.5 MB",
      date: "2025-01-15",
      status: "Published",
      department: "Student Affairs",
      school: "All Schools",
      author: "Admin Office",
      category: "Policy"
    },
    {
      id: "2",
      documentId: "DOC002",
      name: "Academic Calendar",
      type: "PDF",
      size: "1.2 MB",
      date: "2025-01-14",
      status: "Published",
      department: "Academic Affairs",
      school: "All Schools",
      author: "Registrar Office",
      category: "Academic"
    },
    {
      id: "3",
      documentId: "DOC003",
      name: "Admission Guidelines",
      type: "DOCX",
      size: "850 KB",
      date: "2025-01-13",
      status: "Draft",
      department: "Admissions",
      school: "College of Engineering",
      author: "Admissions Team",
      category: "Administrative"
    },
    {
      id: "4",
      documentId: "DOC004",
      name: "Fee Structure 2025",
      type: "PDF",
      size: "1.8 MB",
      date: "2025-01-12",
      status: "Published",
      department: "Finance",
      school: "All Schools",
      author: "Finance Office",
      category: "Administrative"
    },
    {
      id: "5",
      documentId: "DOC005",
      name: "Course Catalog",
      type: "PDF",
      size: "5.2 MB",
      date: "2025-01-11",
      status: "Review",
      department: "Academic Affairs",
      school: "College of Arts & Sciences",
      author: "Academic Committee",
      category: "Academic"
    },
    {
      id: "6",
      documentId: "DOC006",
      name: "Enrollment Report Q4",
      type: "XLSX",
      size: "1.1 MB",
      date: "2025-01-10",
      status: "Published",
      department: "Registrar",
      school: "All Schools",
      author: "Data Analytics",
      category: "Reports"
    },
    {
      id: "7",
      documentId: "DOC007",
      name: "Application Form",
      type: "PDF",
      size: "750 KB",
      date: "2025-01-09",
      status: "Published",
      department: "Admissions",
      school: "School of Business",
      author: "Admissions Office",
      category: "Forms"
    },
    {
      id: "8",
      documentId: "DOC008",
      name: "Faculty Handbook",
      type: "PDF",
      size: "3.2 MB",
      date: "2025-01-08",
      status: "Review",
      department: "Human Resources",
      school: "All Schools",
      author: "HR Department",
      category: "Policy"
    }
  ]

  // Get unique values for filters
  const departments = useMemo(() => {
    return [...new Set(documents.map(doc => doc.department))].sort()
  }, [documents])

  const schools = useMemo(() => {
    return [...new Set(documents.map(doc => doc.school))].sort()
  }, [documents])

  const categories = useMemo(() => {
    return [...new Set(documents.map(doc => doc.category))].sort()
  }, [documents])

  // Filter documents based on search and filters
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        doc.documentId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        doc.author.toLowerCase().includes(filters.searchTerm.toLowerCase())

      const matchesDepartment = filters.departmentFilter === "all" || doc.department === filters.departmentFilter
      const matchesSchool = filters.schoolFilter === "all" || doc.school === filters.schoolFilter
      const matchesStatus = filters.statusFilter === "all" || doc.status === filters.statusFilter
      const matchesCategory = filters.categoryFilter === "all" || doc.category === filters.categoryFilter

      return matchesSearch && matchesDepartment && matchesSchool && matchesStatus && matchesCategory
    })
  }, [filters, documents])

  // Pagination logic
  const totalPages = Math.ceil(filteredDocuments.length / pagination.itemsPerPage)
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
  const endIndex = startIndex + pagination.itemsPerPage
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useMemo(() => {
    setPagination(prev => ({ ...prev, currentPage: 1 }))
  }, [filters])

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      departmentFilter: "all",
      schoolFilter: "all",
      statusFilter: "all",
      categoryFilter: "all"
    })
    setPagination(prev => ({ ...prev, currentPage: 1 }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <DocumentHeader />

      {/* Statistics Cards */}
      <DocumentStatsCards stats={stats} />

      {/* Search and Filters */}
      <DocumentSearchFilters
        filters={filters}
        setFilters={setFilters}
        pagination={pagination}
        setPagination={setPagination}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        departments={departments}
        schools={schools}
        categories={categories}
        filteredCount={filteredDocuments.length}
        totalCount={documents.length}
        startIndex={startIndex}
        endIndex={endIndex}
      />

      {/* Document Table */}
      <DocumentTable 
        documents={paginatedDocuments}
        onClearFilters={clearFilters}
      />

      {/* Pagination */}
      <DocumentPagination
        pagination={pagination}
        setPagination={setPagination}
        totalItems={filteredDocuments.length}
      />
    </div>
  )
}
