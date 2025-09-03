"use client"

import React from "react"
import Link from "next/link"
import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Upload,
  Edit,
  Eye,
  FileDown,
  Users,
  GraduationCap,
  TrendingUp,
  UserCheck
} from "lucide-react"

export default function StudentRecords() {
  const stats = [
    { title: "Total Students", value: "12,347", color: "#6b7280", icon: Users },
    { title: "Active Students", value: "11,890", color: "#10b981", icon: UserCheck },
    { title: "Average GPA", value: "3.6", color: "#3b82f6", icon: TrendingUp },
    { title: "Graduating", value: "856", color: "#8b5cf6", icon: GraduationCap },
  ]

  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      program: "Computer Science",
      year: "3rd Year",
      gpa: "3.8",
      status: "Active",
      statusColor: "#10b981"
    },
    {
      id: "STU002",
      name: "Bob Smith",
      program: "Business Administration",
      year: "2nd Year",
      gpa: "3.6",
      status: "Active",
      statusColor: "#10b981"
    },
    {
      id: "STU003",
      name: "Carol Davis",
      program: "Engineering",
      year: "4th Year",
      gpa: "3.9",
      status: "Active",
      statusColor: "#10b981"
    },
    {
      id: "STU004",
      name: "David Wilson",
      program: "Medicine",
      year: "1st Year",
      gpa: "3.7",
      status: "Active",
      statusColor: "#10b981"
    },
    {
      id: "STU005",
      name: "Eva Brown",
      program: "Law",
      year: "3rd Year",
      gpa: "3.5",
      status: "Suspended",
      statusColor: "#ef4444"
    },
  ]

  const getStatusBadge = (status: string, color: string) => {
    return (
      <Badge 
        variant="secondary" 
        style={{ 
          backgroundColor: `${color}20`, 
          color: color,
          border: `1px solid ${color}40`
        }}
      >
        {status}
      </Badge>
    )
  }

  return (
    <RegistrarLayout role="registrar" title="Student Records">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-[#026892] mb-2">Student Records</h1>
            <p className="text-gray-600">Manage student information and academic records</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
              <FileDown className="h-4 w-4" />
              View All Student Reports
            </Button>
            <Button className="bg-[#026892] hover:bg-[#024f70] text-white flex items-center gap-2 shadow-md">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold" style={{ color: stat.color }}>
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-3 rounded-full" style={{ backgroundColor: `${stat.color}20` }}>
                      <IconComponent className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
            <Plus className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Add New Student</div>
              <div className="text-sm opacity-70">Register new student</div>
            </div>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
            <Upload className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Import Students</div>
              <div className="text-sm opacity-70">Bulk import from file</div>
            </div>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
            <Edit className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Bulk Edit</div>
              <div className="text-sm opacity-70">Edit multiple records</div>
            </div>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
            <Download className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Export Records</div>
              <div className="text-sm opacity-70">Download student data</div>
            </div>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search student..." 
                    className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                      <Filter className="h-4 w-4" />
                      Department
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Departments</DropdownMenuItem>
                    <DropdownMenuItem>Computer Science</DropdownMenuItem>
                    <DropdownMenuItem>Engineering</DropdownMenuItem>
                    <DropdownMenuItem>Business</DropdownMenuItem>
                    <DropdownMenuItem>Medicine</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                      <Filter className="h-4 w-4" />
                      School
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Schools</DropdownMenuItem>
                    <DropdownMenuItem>School of Technology</DropdownMenuItem>
                    <DropdownMenuItem>School of Business</DropdownMenuItem>
                    <DropdownMenuItem>School of Medicine</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                      <Filter className="h-4 w-4" />
                      Program
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Programs</DropdownMenuItem>
                    <DropdownMenuItem>Undergraduate</DropdownMenuItem>
                    <DropdownMenuItem>Graduate</DropdownMenuItem>
                    <DropdownMenuItem>Doctorate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                      <Filter className="h-4 w-4" />
                      Year
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Years</DropdownMenuItem>
                    <DropdownMenuItem>1st Year</DropdownMenuItem>
                    <DropdownMenuItem>2nd Year</DropdownMenuItem>
                    <DropdownMenuItem>3rd Year</DropdownMenuItem>
                    <DropdownMenuItem>4th Year</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Records Table */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="text-black font-weight-600">
            <CardTitle>Student Records</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-semibold text-black">Student ID</TableHead>
                  <TableHead className="font-semibold text-black">Name</TableHead>
                  <TableHead className="font-semibold text-black">Program</TableHead>
                  <TableHead className="font-semibold text-black">Year</TableHead>
                  <TableHead className="font-semibold text-black">GPA</TableHead>
                  <TableHead className="font-semibold text-black">Status</TableHead>
                  <TableHead className="text-right font-semibold text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-white transition-colors">
                    <TableCell className="font-medium text-black">
                      {student.id}
                    </TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell className="font-semibold">{student.gpa}</TableCell>
                    <TableCell>
                      {getStatusBadge(student.status, student.statusColor)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/registrar/student-records/${student.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/registrar/student-records/${student.id}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </RegistrarLayout>
  )
}
