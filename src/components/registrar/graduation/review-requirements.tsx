"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  FileCheck,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  BookOpen,
  DollarSign,
  Award,
  Eye,
  Edit
} from "lucide-react"

interface Student {
  id: string
  name: string
  studentId: string
  program: string
  gpa: number
  creditsCompleted: number
  creditsRequired: number
  financialClearance: boolean
  finalProjects: boolean
  internship: boolean
  thesis: boolean
  overallStatus: "Eligible" | "Pending" | "Not Eligible"
}

interface RequirementCategory {
  name: string
  icon: React.ElementType
  completed: number
  total: number
  percentage: number
  status: "Complete" | "In Progress" | "Pending"
}

export function ReviewRequirements() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const requirementCategories: RequirementCategory[] = [
    {
      name: "Credit Requirements",
      icon: BookOpen,
      completed: 856,
      total: 856,
      percentage: 100,
      status: "Complete"
    },
    {
      name: "Financial Clearance",
      icon: DollarSign,
      completed: 728,
      total: 856,
      percentage: 85,
      status: "In Progress"
    },
    {
      name: "Final Projects",
      icon: Award,
      completed: 556,
      total: 856,
      percentage: 65,
      status: "Pending"
    },
    {
      name: "Internship Requirements",
      icon: Users,
      completed: 634,
      total: 856,
      percentage: 74,
      status: "In Progress"
    }
  ]

  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "John Smith",
      studentId: "2021001",
      program: "Computer Science",
      gpa: 3.8,
      creditsCompleted: 120,
      creditsRequired: 120,
      financialClearance: true,
      finalProjects: true,
      internship: true,
      thesis: true,
      overallStatus: "Eligible"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      studentId: "2021002",
      program: "Business Administration",
      gpa: 3.9,
      creditsCompleted: 118,
      creditsRequired: 120,
      financialClearance: true,
      finalProjects: false,
      internship: true,
      thesis: false,
      overallStatus: "Pending"
    },
    {
      id: "3",
      name: "Michael Brown",
      studentId: "2021003",
      program: "Engineering",
      gpa: 3.7,
      creditsCompleted: 120,
      creditsRequired: 120,
      financialClearance: false,
      finalProjects: true,
      internship: false,
      thesis: true,
      overallStatus: "Pending"
    },
    {
      id: "4",
      name: "Emily Davis",
      studentId: "2021004",
      program: "Mathematics",
      gpa: 2.8,
      creditsCompleted: 115,
      creditsRequired: 120,
      financialClearance: false,
      finalProjects: false,
      internship: false,
      thesis: false,
      overallStatus: "Not Eligible"
    }
  ])

  const programs = ["Computer Science", "Business Administration", "Engineering", "Mathematics"]

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProgram = selectedProgram === "all" || student.program === selectedProgram
    const matchesStatus = selectedStatus === "all" || student.overallStatus === selectedStatus

    return matchesSearch && matchesProgram && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Complete":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Complete</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>
      case "Pending":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Pending</Badge>
      case "Eligible":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Eligible</Badge>
      case "Not Eligible":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Not Eligible</Badge>
      default:
        return <Badge className="bg-white text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getRequirementIcon = (completed: boolean) => {
    return completed ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-600" />
    )
  }

  return (
    <Card className="border border-gray-200 shadow-sm">

      {/* Requirements Overview */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {requirementCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full  bg-opacity-10">
                      <IconComponent className="h-4 w-4 text-[#026892]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{category.name}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{category.completed}/{category.total}</span>
                        <span>{category.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2 mb-2" />
                  {getStatusBadge(category.status)}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
          />
        </div>
        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
          <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
            <SelectValue placeholder="Program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            {programs.map(program => (
              <SelectItem key={program} value={program}>{program}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Eligible">Eligible</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Not Eligible">Not Eligible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students Requirements Table */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-white">
              <TableHead className="font-semibold text-[#026892]">Student</TableHead>
              <TableHead className="font-semibold text-[#026892]">Program</TableHead>
              <TableHead className="font-semibold text-[#026892]">Credits</TableHead>
              <TableHead className="font-semibold text-[#026892]">GPA</TableHead>
              <TableHead className="font-semibold text-[#026892]">Requirements</TableHead>
              <TableHead className="font-semibold text-[#026892]">Status</TableHead>
              <TableHead className="text-right font-semibold text-[#026892]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-white transition-colors">
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.studentId}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{student.program}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">{student.creditsCompleted}</span>
                      <span className="text-gray-500">/{student.creditsRequired}</span>
                    </div>
                    <Progress
                      value={(student.creditsCompleted / student.creditsRequired) * 100}
                      className="h-1 w-20"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={student.gpa >= 3.0 ? "text-green-700 border-green-200" : "text-red-700 border-red-200"}
                  >
                    {student.gpa.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center gap-1">
                      {getRequirementIcon(student.financialClearance)}
                      <span className="text-xs">Financial</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getRequirementIcon(student.finalProjects)}
                      <span className="text-xs">Projects</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getRequirementIcon(student.internship)}
                      <span className="text-xs">Internship</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getRequirementIcon(student.thesis)}
                      <span className="text-xs">Thesis</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(student.overallStatus)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Student Requirements Detail</DialogTitle>
                          <DialogDescription>
                            Detailed requirements status for {student.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Student ID</label>
                              <p className="text-sm text-gray-600">{student.studentId}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Program</label>
                              <p className="text-sm text-gray-600">{student.program}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-medium">Requirements Status</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center justify-between p-3 bg-white rounded">
                                <span className="text-sm">Credits</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{student.creditsCompleted}/{student.creditsRequired}</span>
                                  {getRequirementIcon(student.creditsCompleted >= student.creditsRequired)}
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-white rounded">
                                <span className="text-sm">Financial Clearance</span>
                                {getRequirementIcon(student.financialClearance)}
                              </div>
                              <div className="flex items-center justify-between p-3 bg-white rounded">
                                <span className="text-sm">Final Projects</span>
                                {getRequirementIcon(student.finalProjects)}
                              </div>
                              <div className="flex items-center justify-between p-3 bg-white rounded">
                                <span className="text-sm">Internship</span>
                                {getRequirementIcon(student.internship)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button className="bg-[#026892] hover:bg-[#024f70] text-white">
          Approve Eligible Students
        </Button>
        <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
          Export Requirements Report
        </Button>
        <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
          Send Notifications
        </Button>
      </div>
    </Card>
  )
}
