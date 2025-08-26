"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  BookOpen, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Award,
  AlertTriangle,
  Users,
  BarChart3,
  Search,
  GraduationCap
} from "lucide-react"

interface AcademicData {
  course: string
  department: string
  instructor: string
  enrolled: number
  averageGpa: number
  gradeDistribution: {
    A: number
    B: number
    C: number
    D: number
    F: number
    W: number
  }
  passRate: number
  trend: "up" | "down" | "stable"
  semester: string
}

export function AcademicPerformanceReport() {
  const [selectedSemester, setSelectedSemester] = useState("fall-2025")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const academicData: AcademicData[] = [
    {
      course: "CS 101 - Introduction to Programming",
      department: "Computer Science",
      instructor: "Dr. Sarah Johnson",
      enrolled: 120,
      averageGpa: 3.2,
      gradeDistribution: { A: 25, B: 35, C: 30, D: 8, F: 2, W: 0 },
      passRate: 93,
      trend: "up",
      semester: "Fall 2025"
    },
    {
      course: "MATH 201 - Calculus II",
      department: "Mathematics",
      instructor: "Prof. Michael Chen",
      enrolled: 85,
      averageGpa: 2.8,
      gradeDistribution: { A: 15, B: 25, C: 35, D: 15, F: 8, W: 2 },
      passRate: 75,
      trend: "down",
      semester: "Fall 2025"
    },
    {
      course: "BUS 301 - Marketing Fundamentals",
      department: "Business",
      instructor: "Dr. Emily Rodriguez",
      enrolled: 95,
      averageGpa: 3.4,
      gradeDistribution: { A: 30, B: 40, C: 25, D: 3, F: 1, W: 1 },
      passRate: 95,
      trend: "up",
      semester: "Fall 2025"
    },
    {
      course: "PSYC 101 - General Psychology",
      department: "Psychology",
      instructor: "Dr. James Wilson",
      enrolled: 150,
      averageGpa: 3.1,
      gradeDistribution: { A: 22, B: 38, C: 28, D: 10, F: 2, W: 0 },
      passRate: 88,
      trend: "stable",
      semester: "Fall 2025"
    },
    {
      course: "NURS 250 - Pathophysiology",
      department: "Nursing",
      instructor: "Dr. Lisa Park",
      enrolled: 60,
      averageGpa: 3.6,
      gradeDistribution: { A: 35, B: 45, C: 18, D: 2, F: 0, W: 0 },
      passRate: 98,
      trend: "up",
      semester: "Fall 2025"
    },
    {
      course: "ENG 102 - Composition II",
      department: "English",
      instructor: "Prof. David Martinez",
      enrolled: 110,
      averageGpa: 3.0,
      gradeDistribution: { A: 20, B: 35, C: 30, D: 12, F: 3, W: 0 },
      passRate: 85,
      trend: "down",
      semester: "Fall 2025"
    }
  ]

  const filteredData = academicData.filter(item => {
    const matchesSearch = item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || item.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const totalEnrolled = filteredData.reduce((sum, item) => sum + item.enrolled, 0)
  const averageGpa = (filteredData.reduce((sum, item) => sum + (item.averageGpa * item.enrolled), 0) / totalEnrolled).toFixed(2)
  const averagePassRate = (filteredData.reduce((sum, item) => sum + item.passRate, 0) / filteredData.length).toFixed(1)
  const coursesCount = filteredData.length

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600"
    if (gpa >= 3.0) return "text-blue-600"
    if (gpa >= 2.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getPassRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600"
    if (rate >= 80) return "text-blue-600"
    if (rate >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />
    return <div className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-[#026892]" />
            Academic Performance Report
          </h1>
          <p className="text-gray-600">Grade distributions, GPA statistics, and academic standing analysis</p>
        </div>
        
        <Button className="bg-[#026892] hover:bg-[#024f70] text-white font-medium flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Semester</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall-2025">Fall 2025</SelectItem>
                  <SelectItem value="spring-2025">Spring 2025</SelectItem>
                  <SelectItem value="summer-2025">Summer 2025</SelectItem>
                  <SelectItem value="fall-2024">Fall 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Psychology">Psychology</SelectItem>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Courses</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Performance Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Course Performance Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-black">Course</TableHead>
                  <TableHead className="font-semibold text-black">Instructor</TableHead>
                  <TableHead className="font-semibold text-black">Enrolled</TableHead>
                  <TableHead className="font-semibold text-black">Avg GPA</TableHead>
                  <TableHead className="font-semibold text-black">Grade Distribution</TableHead>
                  <TableHead className="font-semibold text-black">Pass Rate</TableHead>
                  <TableHead className="font-semibold text-black">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{item.course}</div>
                        <Badge variant="outline" className="text-[#026892] border-[#026892] mt-1">
                          {item.department}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{item.instructor}</TableCell>
                    <TableCell className="font-medium text-gray-900">{item.enrolled}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${getGpaColor(item.averageGpa)}`}>
                        {item.averageGpa.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-xs space-x-1">
                          <span className="bg-green-100 text-[#026892] px-2 py-1 rounded">A: {item.gradeDistribution.A}%</span>
                          <span className="bg-blue-100 text-[#026892] px-2 py-1 rounded">B: {item.gradeDistribution.B}%</span>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">C: {item.gradeDistribution.C}%</span>
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">D: {item.gradeDistribution.D}%</span>
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded">F: {item.gradeDistribution.F}%</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getPassRateColor(item.passRate)} border-current`}
                      >
                        {item.passRate}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className="text-sm text-gray-600 capitalize">{item.trend}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
