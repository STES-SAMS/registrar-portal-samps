export interface DocumentStats {
  total: number
  published: number
  draft: number
  underReview: number
}

export interface Document {
  id: string
  documentId: string
  name: string
  type: "PDF" | "DOCX" | "XLSX" | "PPT"
  size: string
  date: string
  status: "Published" | "Draft" | "Review" | "Archived"
  department: string
  school: string
  author: string
  category: "Academic" | "Administrative" | "Policy" | "Forms" | "Reports"
}

export interface DocumentFilters {
  searchTerm: string
  departmentFilter: string
  schoolFilter: string
  statusFilter: string
  categoryFilter: string
}

export interface PaginationState {
  currentPage: number
  itemsPerPage: number
}
