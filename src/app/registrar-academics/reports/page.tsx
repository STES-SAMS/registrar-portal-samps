"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  GraduationCap,
  DollarSign,
  FileText,
  TrendingUp,
  Filter,
  Search,
  Eye,
  RefreshCw,
} from "lucide-react"
import Link from "next/link";
import { RegistrarLayout } from "@/components/registrar"
import RegistrarAttendancePage from "@/components/academic/reports/attendance/page"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-semester")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Sample data for different report types
  const attendanceReports = [
    {
      id: "1",
      title: "Student Attendance Summary",
      description: "Overall attendance rates by program and department",
      period: "Semester 2, 2024-25",
      generated: "2024-03-15",
      status: "Ready",
      type: "attendance",
      department: "Computer Science",
      records: 1247,
    },
    {
      id: "2",
      title: "Staff Attendance Report",
      description: "Faculty and staff attendance tracking",
      period: "March 2024",
      generated: "2024-03-10",
      status: "Ready",
      type: "attendance",
      department: "All Departments",
      records: 89,
    },
    {
      id: "3",
      title: "Low Attendance Alert",
      description: "Students below 75% attendance threshold",
      period: "Current Week",
      generated: "2024-03-18",
      status: "Processing",
      type: "attendance",
      department: "Engineering",
      records: 23,
    },
  ]

  const academicReports = [
    {
      id: "4",
      title: "Grade Distribution Analysis",
      description: "Statistical analysis of grades across all modules",
      period: "Semester 2, 2024-25",
      generated: "2024-03-14",
      status: "Ready",
      type: "academic",
      department: "All Departments",
      records: 5678,
    },
    {
      id: "5",
      title: "Student Performance Trends",
      description: "Academic performance tracking over time",
      period: "Academic Year 2024-25",
      generated: "2024-03-12",
      status: "Ready",
      type: "academic",
      department: "Business Studies",
      records: 892,
    },
    {
      id: "6",
      title: "Module Success Rates",
      description: "Pass/fail rates by module and lecturer",
      period: "Semester 1, 2024-25",
      generated: "2024-02-28",
      status: "Ready",
      type: "academic",
      department: "Sciences",
      records: 2341,
    },
  ]

  const financialReports = [
    {
      id: "7",
      title: "Fee Collection Summary",
      description: "Student fee payments and outstanding balances",
      period: "Semester 2, 2024-25",
      generated: "2024-03-16",
      status: "Ready",
      type: "financial",
      department: "All Programs",
      records: 3456,
    },
    {
      id: "8",
      title: "Scholarship Distribution",
      description: "Financial aid and scholarship allocations",
      period: "Academic Year 2024-25",
      generated: "2024-03-13",
      status: "Ready",
      type: "financial",
      department: "All Departments",
      records: 234,
    },
  ]

  const operationalReports = [
    {
      id: "9",
      title: "Room Utilization Analysis",
      description: "Classroom and facility usage statistics",
      period: "March 2024",
      generated: "2024-03-17",
      status: "Ready",
      type: "operational",
      department: "Facilities",
      records: 156,
    },
    {
      id: "10",
      title: "Library Usage Report",
      description: "Book borrowing and resource utilization",
      period: "Semester 2, 2024-25",
      generated: "2024-03-11",
      status: "Ready",
      type: "operational",
      department: "Library",
      records: 1789,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-white text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "attendance":
        return <Users className="h-4 w-4" />
      case "academic":
        return <GraduationCap className="h-4 w-4" />
      case "financial":
        return <DollarSign className="h-4 w-4" />
      case "operational":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const ReportCard = ({ report }: { report: any }) => (
    // <RegistrarLayout role="registrar-academics" title="Reports & Analytics">
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(report.type)}
            <CardTitle className="text-lg">{report.title}</CardTitle>
          </div>
          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
        </div>
        <CardDescription>{report.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Period:</span>
            <span className="font-medium">{report.period}</span>
          </div>
          <div className="flex justify-between">
            <span>Department:</span>
            <span className="font-medium">{report.department}</span>
          </div>
          <div className="flex justify-between">
            <span>Records:</span>
            <span className="font-medium">{report.records.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Generated:</span>
            <span className="font-medium">{report.generated}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" className="flex-1 text-white bg-[#026892] hover:bg-[#014f61] border-0 hover:shadow-md">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <RegistrarLayout role="registrar-academics" title="Reports & Analytics">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Generate and manage institutional reports</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh All
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Custom Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ready to Download</p>
                  <p className="text-2xl font-bold">42</p>
                </div>
                <Download className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Processing</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <RefreshCw className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Reports Tabs */}
        <Tabs defaultValue="attendance">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attendance" >
              <Users className="h-4 w-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="academic">
              <GraduationCap className="h-4 w-4" />
              Academic
            </TabsTrigger>
            <TabsTrigger value="financial">
              <DollarSign className="h-4 w-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="operational">
              <BarChart3 className="h-4 w-4" />
              Operational
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Attendance Reports</h2>
            </div>
            <div className="grid grid-cols-1">
              <RegistrarAttendancePage />
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Academic Reports</h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {academicReports.map((report) => (
                <Link key={report.id} href={`/registrar-academics/reports/${report.id}`} style={{ textDecoration: 'none' }}>
                  <ReportCard report={report} />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Financial Reports</h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {financialReports.map((report) => (
                <Link key={report.id} href={`/registrar-academics/reports/${report.id}`} style={{ textDecoration: 'none' }}>
                  <ReportCard report={report} />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="operational" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Operational Reports</h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {operationalReports.map((report) => (
                <Link key={report.id} href={`/registrar-academics/reports/${report.id}`} style={{ textDecoration: 'none' }}>
                  <ReportCard report={report} />
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RegistrarLayout>
  )
}
