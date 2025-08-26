"use client"

import { useState } from "react"
import { RegistrarLayout } from "@/components/registrar/layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Eye, 
  Download, 
  Search, 
  Filter,
  FileText,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

// Mock data for students
const mockStudents = [
  {
    id: "ST001",
    name: "John Smith",
    studentId: "2021001",
    course: "Computer Science",
    year: "4th Year",
    semester: "8th",
    cgpa: 8.75,
    status: "active",
    transcriptStatus: "available",
    lastUpdated: "2024-08-20"
  },
  {
    id: "ST002", 
    name: "Sarah Johnson",
    studentId: "2021002",
    course: "Information Technology",
    year: "4th Year", 
    semester: "8th",
    cgpa: 9.12,
    status: "active",
    transcriptStatus: "available",
    lastUpdated: "2024-08-19"
  },
  {
    id: "ST003",
    name: "Michael Brown", 
    studentId: "2021003",
    course: "Electronics Engineering",
    year: "3rd Year",
    semester: "6th", 
    cgpa: 7.89,
    status: "active",
    transcriptStatus: "processing",
    lastUpdated: "2024-08-18"
  },
  {
    id: "ST004",
    name: "Emily Davis",
    studentId: "2021004", 
    course: "Mechanical Engineering",
    year: "4th Year",
    semester: "8th",
    cgpa: 8.45,
    status: "active",
    transcriptStatus: "available",
    lastUpdated: "2024-08-17"
  },
  {
    id: "ST005",
    name: "David Wilson",
    studentId: "2021005",
    course: "Civil Engineering", 
    year: "2nd Year",
    semester: "4th",
    cgpa: 8.12,
    status: "active",
    transcriptStatus: "pending",
    lastUpdated: "2024-08-16"
  },
  {
    id: "ST006",
    name: "Lisa Anderson",
    studentId: "2021006",
    course: "Computer Science",
    year: "4th Year",
    semester: "8th", 
    cgpa: 9.25,
    status: "active",
    transcriptStatus: "available",
    lastUpdated: "2024-08-15"
  },
  {
    id: "ST007",
    name: "Robert Taylor",
    studentId: "2021007",
    course: "Information Technology",
    year: "3rd Year",
    semester: "6th",
    cgpa: 7.95,
    status: "active", 
    transcriptStatus: "available",
    lastUpdated: "2024-08-14"
  },
  {
    id: "ST008",
    name: "Jennifer Martinez",
    studentId: "2021008",
    course: "Electronics Engineering",
    year: "4th Year",
    semester: "8th",
    cgpa: 8.67,
    status: "active",
    transcriptStatus: "processing",
    lastUpdated: "2024-08-13"
  },
  {
    id: "ST009", 
    name: "James Garcia",
    studentId: "2021009",
    course: "Mechanical Engineering",
    year: "2nd Year",
    semester: "4th",
    cgpa: 8.33,
    status: "active",
    transcriptStatus: "available",
    lastUpdated: "2024-08-12"
  },
  {
    id: "ST010",
    name: "Amanda Rodriguez",
    studentId: "2021010",
    course: "Civil Engineering",
    year: "4th Year",
    semester: "8th",
    cgpa: 8.89,
    status: "active",
    transcriptStatus: "pending",
    lastUpdated: "2024-08-11"
  },
  {
    id: "ST011",
    name: "Christopher Lee",
    studentId: "2021011", 
    course: "Computer Science",
    year: "3rd Year",
    semester: "6th",
    cgpa: 8.55,
    status: "active",
    transcriptStatus: "available",
    lastUpdated: "2024-08-10"
  },
  {
    id: "ST012",
    name: "Michelle White",
    studentId: "2021012",
    course: "Information Technology",
    year: "4th Year",
    semester: "8th",
    cgpa: 9.01,
    status: "active",
    transcriptStatus: "available", 
    lastUpdated: "2024-08-09"
  }
]

const ITEMS_PER_PAGE = 10

export default function TranscriptsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter students based on search and status
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.includes(searchTerm) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || student.transcriptStatus === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentStudents = filteredStudents.slice(startIndex, endIndex)

  const handleViewTranscript = (studentId: string) => {
    console.log(`Viewing transcript for student: ${studentId}`)
    // Here you would typically navigate to a detailed transcript view
    // or open a modal with the transcript details
  }

  const handleDownloadTranscript = (studentId: string) => {
    console.log(`Downloading transcript for student: ${studentId}`)
    // Here you would trigger the transcript download
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3" />Available</Badge>
      case "processing":
        return <Badge variant="secondary"><Clock className="w-3 h-3" />Processing</Badge>
      case "pending":
        return <Badge variant="outline"><AlertCircle className="w-3 h-3" />Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <RegistrarLayout role="registrar-academics" title="Academic Administration">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Transcripts</h1>
            <p className="text-muted-foreground">
              Manage and view student academic transcripts
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              <FileText className="w-4 h-4" />
              {filteredStudents.length} Students
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStudents.filter(s => s.transcriptStatus === "available").length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStudents.filter(s => s.transcriptStatus === "processing").length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStudents.filter(s => s.transcriptStatus === "pending").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>
              Find students by name, ID, or course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, student ID, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "available" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("available")}
                >
                  Available
                </Button>
                <Button
                  variant={statusFilter === "processing" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("processing")}
                >
                  Processing
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Transcripts</CardTitle>
            <CardDescription>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year/Semester</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {student.studentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.year}</div>
                        <div className="text-sm text-muted-foreground">{student.semester}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {student.cgpa.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(student.transcriptStatus)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewTranscript(student.studentId)}
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        {student.transcriptStatus === "available" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadTranscript(student.studentId)}
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(page as number)
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RegistrarLayout>
  )
}
