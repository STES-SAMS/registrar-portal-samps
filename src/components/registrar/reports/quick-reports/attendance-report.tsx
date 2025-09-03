"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Clock, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Users,
  CheckCircle,
  AlertTriangle,
  Calendar,
  BookOpen,
  Search,
  UserCheck
} from "lucide-react"

interface AttendanceData {
  course: string
  instructor: string
  department: string
  enrolled: number
  averageAttendance: number
  totalSessions: number
  attendedSessions: number
  absentStudents: number
  tardyStudents: number
  attendanceRate: number
  trend: "up" | "down" | "stable"
  riskLevel: "Low" | "Medium" | "High"
}

export function AttendanceReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-semester")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const attendanceData: AttendanceData[] = [
    {
      course: "CS 101 - Introduction to Programming",
      instructor: "Dr. Sarah Johnson",
      department: "Computer Science",
      enrolled: 120,
      averageAttendance: 112,
      totalSessions: 48,
      attendedSessions: 43,
      absentStudents: 8,
      tardyStudents: 15,
      attendanceRate: 93.3,
      trend: "up",
      riskLevel: "Low"
    },
    {
      course: "MATH 201 - Calculus II",
      instructor: "Prof. Michael Chen",
      department: "Mathematics",
      enrolled: 85,
      averageAttendance: 68,
      totalSessions: 48,
      attendedSessions: 38,
      absentStudents: 17,
      tardyStudents: 8,
      attendanceRate: 80.0,
      trend: "down",
      riskLevel: "Medium"
    },
    {
      course: "BUS 301 - Marketing Fundamentals",
      instructor: "Dr. Emily Rodriguez",
      department: "Business",
      enrolled: 95,
      averageAttendance: 91,
      totalSessions: 45,
      attendedSessions: 43,
      absentStudents: 4,
      tardyStudents: 12,
      attendanceRate: 95.8,
      trend: "up",
      riskLevel: "Low"
    },
    {
      course: "PSYC 101 - General Psychology",
      instructor: "Dr. James Wilson",
      department: "Psychology",
      enrolled: 150,
      averageAttendance: 135,
      totalSessions: 45,
      attendedSessions: 40,
      absentStudents: 15,
      tardyStudents: 20,
      attendanceRate: 90.0,
      trend: "stable",
      riskLevel: "Low"
    },
    {
      course: "NURS 250 - Pathophysiology",
      instructor: "Dr. Lisa Park",
      department: "Nursing",
      enrolled: 60,
      averageAttendance: 58,
      totalSessions: 50,
      attendedSessions: 48,
      absentStudents: 2,
      tardyStudents: 3,
      attendanceRate: 96.7,
      trend: "up",
      riskLevel: "Low"
    },
    {
      course: "ENG 102 - Composition II",
      instructor: "Prof. David Martinez",
      department: "English",
      enrolled: 110,
      averageAttendance: 82,
      totalSessions: 42,
      attendedSessions: 32,
      absentStudents: 28,
      tardyStudents: 18,
      attendanceRate: 74.5,
      trend: "down",
      riskLevel: "High"
    },
    {
      course: "CHEM 101 - General Chemistry",
      instructor: "Dr. Anna Williams",
      department: "Chemistry",
      enrolled: 100,
      averageAttendance: 88,
      totalSessions: 48,
      attendedSessions: 41,
      absentStudents: 12,
      tardyStudents: 10,
      attendanceRate: 88.0,
      trend: "stable",
      riskLevel: "Low"
    }
  ]

  const filteredData = attendanceData.filter(item => {
    const matchesSearch = item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || item.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const totalEnrolled = filteredData.reduce((sum, item) => sum + item.enrolled, 0)
  const totalAverageAttendance = filteredData.reduce((sum, item) => sum + item.averageAttendance, 0)
  const overallAttendanceRate = ((totalAverageAttendance / totalEnrolled) * 100).toFixed(1)
  const totalAbsentStudents = filteredData.reduce((sum, item) => sum + item.absentStudents, 0)
  const coursesCount = filteredData.length

  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600"
    if (rate >= 80) return "text-blue-600"
    if (rate >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Low":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Low Risk</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Medium Risk</Badge>
      case "High":
        return <Badge className="bg-red-100 text-red-700 border-red-200">High Risk</Badge>
      default:
        return <Badge className="bg-white text-gray-700 border-gray-200">{risk}</Badge>
    }
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
            <Clock className="h-8 w-8 text-[#026892]" />
            Attendance Report
          </h1>
          <p className="text-gray-600">Class attendance rates and patterns analysis</p>
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
              <label className="text-sm font-medium text-gray-700">Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-semester">Current Semester</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
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
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
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

      {/* Attendance Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Course Attendance Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-white">
                  <TableHead className="font-semibold text-black">Course</TableHead>
                  <TableHead className="font-semibold text-black">Instructor</TableHead>
                  <TableHead className="font-semibold text-black">Enrolled</TableHead>
                  <TableHead className="font-semibold text-black">Avg. Attendance</TableHead>
                  <TableHead className="font-semibold text-black">Attendance Rate</TableHead>
                  <TableHead className="font-semibold text-black">Absent/Tardy</TableHead>
                  <TableHead className="font-semibold text-black">Risk Level</TableHead>
                  <TableHead className="font-semibold text-black">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-white transition-colors">
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
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{item.averageAttendance}</div>
                        <div className="text-sm text-gray-500">avg. per session</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.attendanceRate >= 90 ? 'bg-[#026892]' :
                              item.attendanceRate >= 80 ? 'bg-[#026892]' :
                              item.attendanceRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.attendanceRate}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getAttendanceRateColor(item.attendanceRate)}`}>
                          {item.attendanceRate.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                          <span className="text-sm text-gray-600">{item.absentStudents} absent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm text-gray-600">{item.tardyStudents} tardy</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRiskBadge(item.riskLevel)}</TableCell>
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

      {/* Attendance Patterns */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#026892]" />
            Attendance Patterns Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">High Performing Courses</h3>
              {filteredData
                .filter(item => item.attendanceRate >= 90)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.course.split(' - ')[0]}</div>
                      <div className="text-sm text-gray-600">{item.instructor}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{item.attendanceRate.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">{item.enrolled} students</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Needs Attention</h3>
              {filteredData
                .filter(item => item.attendanceRate < 85)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.course.split(' - ')[0]}</div>
                      <div className="text-sm text-gray-600">{item.instructor}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-600">{item.attendanceRate.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">{item.absentStudents} absent</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Critical Cases</h3>
              {filteredData
                .filter(item => item.attendanceRate < 80)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.course.split(' - ')[0]}</div>
                      <div className="text-sm text-gray-600">{item.instructor}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">{item.attendanceRate.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">Urgent intervention</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
