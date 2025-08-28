"use client"

import { useState } from "react"
import { RegistrarLayout } from "@/components/registrar/layout"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Download, Search, FileText, GraduationCap, Clock, CheckCircle, AlertCircle, ChevronDown } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const mockStudents = [
  {
    id: "ST001",
    name: "John Smith",
    studentId: "2021001",
    school: "School of ICT",
    department: "Computer Science",
    program: "CSE",
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
    school: "School of ICT",
    department: "Computer Science",
    program: "IT",
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
    school: "School of ICT",
    department: "Electronics Engineering",
    program: "ECE",
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
    school: "School of Engineering",
    department: "Mechanical Engineering",
    program: "ME",
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
    school: "School of Engineering",
    department: "Civil Engineering",
    program: "CE",
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
    school: "School of ICT",
    department: "Computer Science",
    program: "CS",
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
    school: "School of ICT",
    department: "Computer Science",
    program: "IS",
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
    school: "School of ICT",
    department: "Electronics Engineering",
    program: "ECE",
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
    school: "School of Engineering",
    department: "Mechanical Engineering",
    program: "ME",
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
    school: "School of Engineering",
    department: "Civil Engineering",
    program: "CE",
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
    school: "School of ICT",
    department: "Computer Science",
    program: "CS",
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
    school: "School of ICT",
    department: "Computer Science",
    program: "IT",
    course: "Information Technology",
    year: "4th Year",
    semester: "8th",
    cgpa: 9.01,
    status: "active",
    transcriptStatus: "available",
    lastUpdated: "2024-08-09"
  }
];


const ITEMS_PER_PAGE = 10
const SCHOOLS = ["All Schools", "School of ICT", "School of Business", "School of Arts"]
const DEPARTMENTS = ["All Departments", "Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"]
const PROGRAMS = ["All Programs", "CSE", "CS", "IT", "IS"]

export default function TranscriptsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSchool, setSelectedSchool] = useState("All Schools")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedProgram, setSelectedProgram] = useState("All Programs")

  // Filter students
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || student.transcriptStatus === statusFilter
    const matchesSchool = selectedSchool === "All Schools" || student.school === selectedSchool
    const matchesDept = selectedDepartment === "All Departments" || student.department === selectedDepartment
    const matchesProgram = selectedProgram === "All Programs" || student.program === selectedProgram

    return matchesSearch && matchesStatus && matchesSchool && matchesDept && matchesProgram
  })

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentStudents = filteredStudents.slice(startIndex, endIndex)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="default" className="bg-[#026892]"><CheckCircle className="w-3 h-3" />Available</Badge>
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
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push("ellipsis", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages)
      }
    }
    return pages
  }

  return (
    <RegistrarLayout role="registrar-academics" title="Transcripts">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Transcripts</h1>
            <p className="text-muted-foreground">Manage and view student academic transcripts</p>
          </div>
          <Badge variant="outline" className="text-sm">
            <FileText className="w-4 h-4" />
            {filteredStudents.length} Students
          </Badge>
        </div>

        {/* Filters */}

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, student ID, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Dropdowns */}
          {[{ label: "School", options: SCHOOLS, selected: selectedSchool, set: setSelectedSchool },
          { label: "Department", options: DEPARTMENTS, selected: selectedDepartment, set: setSelectedDepartment },
          { label: "Program", options: PROGRAMS, selected: selectedProgram, set: setSelectedProgram }].map((filter, idx) => (
            <DropdownMenu key={idx}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 min-w-[160px] justify-between">
                  {filter.selected}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                {filter.options.map((opt) => (
                  <DropdownMenuItem
                    key={opt}
                    onSelect={() => filter.set(opt)}
                    className={filter.selected === opt ? "bg-accent" : ""}
                  >
                    {opt}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          {/* Status Tabs */}
          <Tabs defaultValue="all" onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

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
                      <Badge variant="outline" className="font-mono">{student.cgpa.toFixed(2)}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(student.transcriptStatus)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm"><Eye className="w-4 h-4" />View</Button>
                        {student.transcriptStatus === "available" && (
                          <Button variant="outline" size="sm"><Download className="w-4 h-4" />Download</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} />
                  </PaginationItem>
                  {getPageNumbers().map((page, idx) => (
                    <PaginationItem key={idx}>
                      {page === "ellipsis" ? <PaginationEllipsis /> : (
                        <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page as number)}>
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </CardContent>
        </Card>
      </div>
    </RegistrarLayout>
  )
}
