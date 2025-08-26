import React, { useState, useMemo } from "react"
import { Users, BookOpen, DollarSign, GraduationCap, Clock, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReportsHeader } from "./reports-header"
import { ReportsStatsCards } from "./reports-stats-cards"
import { ReportTemplates } from "./report-templates"
import { ReportsSearchFilters } from "./reports-search-filters"
import { ReportsTable } from "./reports-table"
import { CreateReportDialog } from "./create-report-dialog"
import { Report, ReportStats, ReportTemplate, ReportFilters } from "./types"
import { 
  EnrollmentReport,
  AcademicPerformanceReport,
  GraduationAnalysisReport,
  FinancialReport,
  AttendanceReport,
  FacultyReport
} from "./quick-reports"

interface ReportsManagementProps {
  initialStats?: ReportStats
  initialReports?: Report[]
}

export function ReportsManagement({ 
  initialStats, 
  initialReports 
}: ReportsManagementProps) {
  // State management
  const [filters, setFilters] = useState<ReportFilters>({
    searchTerm: "",
    typeFilter: "all",
    statusFilter: "all",
    departmentFilter: "all"
  })
  
  const [currentView, setCurrentView] = useState<"dashboard" | "enrollment" | "academic" | "graduation" | "financial" | "attendance" | "faculty">("dashboard")
  
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Default data
  const stats: ReportStats = initialStats || {
    totalReports: 45,
    scheduledReports: 12,
    completedReports: 38,
    activeUsers: 156
  }

  const reports: Report[] = initialReports || [
    {
      id: "1",
      name: "Monthly Enrollment Report",
      type: "Enrollment",
      category: "Student",
      description: "Comprehensive enrollment statistics by program and department",
      lastGenerated: "2025-08-20",
      frequency: "Monthly",
      status: "Completed",
      format: "PDF",
      department: "Registrar",
      createdBy: "John Smith"
    },
    {
      id: "2",
      name: "Academic Performance Analysis",
      type: "Academic",
      category: "Academic",
      description: "Student performance metrics and grade distribution",
      lastGenerated: "2025-08-22",
      frequency: "Weekly",
      status: "Active",
      format: "Excel",
      department: "Academic Affairs",
      createdBy: "Sarah Johnson"
    },
    {
      id: "3",
      name: "Graduation Readiness Report",
      type: "Graduation",
      category: "Student",
      description: "Students eligible for graduation with requirement status",
      lastGenerated: "2025-08-24",
      frequency: "Monthly",
      status: "Completed",
      format: "PDF",
      department: "Registrar",
      createdBy: "Michael Brown"
    },
    {
      id: "4",
      name: "Financial Aid Distribution",
      type: "Financial",
      category: "Financial",
      description: "Financial aid allocation and disbursement report",
      lastGenerated: "2025-08-21",
      frequency: "Quarterly",
      status: "Scheduled",
      format: "Excel",
      department: "Financial Aid",
      createdBy: "Emily Davis"
    },
    {
      id: "5",
      name: "Faculty Teaching Load",
      type: "Academic",
      category: "Faculty",
      description: "Faculty course assignments and teaching workload analysis",
      lastGenerated: "2025-08-19",
      frequency: "On-demand",
      status: "Draft",
      format: "PDF",
      department: "Human Resources",
      createdBy: "David Wilson"
    },
    {
      id: "6",
      name: "Student Attendance Summary",
      type: "Attendance",
      category: "Student",
      description: "Class attendance rates by course and student",
      lastGenerated: "2025-08-23",
      frequency: "Weekly",
      status: "Active",
      format: "CSV",
      department: "Academic Affairs",
      createdBy: "Lisa Chen"
    }
  ]

  const reportTemplates: ReportTemplate[] = [
    {
      id: "enrollment",
      name: "Enrollment Report",
      description: "Student enrollment statistics by program, semester, and demographics",
      icon: Users,
      category: "Student"
    },
    {
      id: "academic",
      name: "Academic Performance",
      description: "Grade distributions, GPA statistics, and academic standing reports",
      icon: BookOpen,
      category: "Academic"
    },
    {
      id: "graduation",
      name: "Graduation Analysis",
      description: "Graduation rates, completion times, and degree distribution",
      icon: GraduationCap,
      category: "Student"
    },
    {
      id: "financial",
      name: "Financial Reports",
      description: "Tuition, fees, financial aid, and revenue analysis",
      icon: DollarSign,
      category: "Financial"
    },
    {
      id: "attendance",
      name: "Attendance Reports",
      description: "Class attendance rates and patterns analysis",
      icon: Clock,
      category: "Student"
    },
    {
      id: "faculty",
      name: "Faculty Reports",
      description: "Teaching loads, performance, and resource utilization",
      icon: School,
      category: "Faculty"
    }
  ]

  // Filter reports based on search and filters
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = 
        report.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        report.createdBy.toLowerCase().includes(filters.searchTerm.toLowerCase())

      const matchesType = filters.typeFilter === "all" || report.type === filters.typeFilter
      const matchesStatus = filters.statusFilter === "all" || report.status === filters.statusFilter
      const matchesDepartment = filters.departmentFilter === "all" || report.department === filters.departmentFilter

      return matchesSearch && matchesType && matchesStatus && matchesDepartment
    })
  }, [filters, reports])

  // Template click handler
  const handleTemplateClick = (templateId: string) => {
    switch (templateId) {
      case "enrollment":
        setCurrentView("enrollment")
        break
      case "academic":
        setCurrentView("academic")
        break
      case "graduation":
        setCurrentView("graduation")
        break
      case "financial":
        setCurrentView("financial")
        break
      case "attendance":
        setCurrentView("attendance")
        break
      case "faculty":
        setCurrentView("faculty")
        break
      default:
        setCurrentView("dashboard")
    }
  }

  // Render different views based on current view
  if (currentView === "enrollment") {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("dashboard")}
          className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
        >
          ← Back to Reports Dashboard
        </Button>
        <EnrollmentReport />
      </div>
    )
  }

  if (currentView === "academic") {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("dashboard")}
          className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
        >
          ← Back to Reports Dashboard
        </Button>
        <AcademicPerformanceReport />
      </div>
    )
  }

  if (currentView === "graduation") {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("dashboard")}
          className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
        >
          ← Back to Reports Dashboard
        </Button>
        <GraduationAnalysisReport />
      </div>
    )
  }

  if (currentView === "financial") {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("dashboard")}
          className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
        >
          ← Back to Reports Dashboard
        </Button>
        <FinancialReport />
      </div>
    )
  }

  if (currentView === "attendance") {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("dashboard")}
          className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
        >
          ← Back to Reports Dashboard
        </Button>
        <AttendanceReport />
      </div>
    )
  }

  if (currentView === "faculty") {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("dashboard")}
          className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
        >
          ← Back to Reports Dashboard
        </Button>
        <FacultyReport />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <ReportsHeader onCreateReport={() => setShowCreateDialog(true)} />

      {/* Statistics Cards */}
      <ReportsStatsCards stats={stats} />

      {/* Report Templates */}
      <ReportTemplates 
        templates={reportTemplates} 
        onTemplateClick={handleTemplateClick}
      />

      {/* Search and Filters */}
      <ReportsSearchFilters
        filters={filters}
        setFilters={setFilters}
        filteredCount={filteredReports.length}
        totalCount={reports.length}
      />

      {/* Reports Table */}
      <ReportsTable 
        reports={filteredReports}
        onCreateReport={() => setShowCreateDialog(true)}
      />

      {/* Create Report Dialog */}
      <CreateReportDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        templates={reportTemplates}
      />
    </div>
  )
}
