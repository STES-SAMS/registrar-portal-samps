export interface ResultRecord {
  id: string
  studentId: string
  studentName: string
  course: string
  module: string
  semester: string
  marks: number
  grade: string
  status: "pending" | "approved" | "rejected" | "under_review"
  submittedBy: string
  submittedDate: string
  moderatedBy?: string
  moderatedDate?: string
  comments?: string
}

export interface ResultProcessingFilters {
  searchTerm: string
  statusFilter: string
  courseFilter: string
}

export interface ResultProcessingProps {
  className?: string
}
