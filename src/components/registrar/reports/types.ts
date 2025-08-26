export interface ReportStats {
  totalReports: number
  scheduledReports: number
  completedReports: number
  activeUsers: number
}

export interface Report {
  id: string
  name: string
  type: "Enrollment" | "Academic" | "Financial" | "Graduation" | "Attendance" | "Custom"
  category: "Student" | "Faculty" | "Financial" | "Academic" | "Administrative"
  description: string
  lastGenerated: string
  frequency: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly" | "On-demand"
  status: "Active" | "Scheduled" | "Completed" | "Failed" | "Draft"
  format: "PDF" | "Excel" | "CSV" | "Word"
  department: string
  createdBy: string
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  icon: any
  category: string
}

export interface ReportFilters {
  searchTerm: string
  typeFilter: string
  statusFilter: string
  departmentFilter: string
}
