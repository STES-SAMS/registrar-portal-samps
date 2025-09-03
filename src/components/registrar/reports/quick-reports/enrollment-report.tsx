"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Users, 
  Download, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  BookOpen,
  GraduationCap,
  BarChart3,
  Filter,
  Search
} from "lucide-react"

interface EnrollmentData {
  program: string
  department: string
  newEnrollments: number
  totalEnrolled: number
  capacity: number
  waitlist: number
  trend: "up" | "down" | "stable"
  percentage: number
}

export function EnrollmentReport() {
  const [selectedSemester, setSelectedSemester] = useState("fall-2025")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const enrollmentData: EnrollmentData[] = [
    {
      program: "Computer Science",
      department: "Engineering",
      newEnrollments: 245,
      totalEnrolled: 1200,
      capacity: 1300,
      waitlist: 45,
      trend: "up",
      percentage: 12.5
    },
    {
      program: "Business Administration",
      department: "Business",
      newEnrollments: 180,
      totalEnrolled: 950,
      capacity: 1000,
      waitlist: 25,
      trend: "up",
      percentage: 8.2
    },
    {
      program: "Psychology",
      department: "Liberal Arts",
      newEnrollments: 165,
      totalEnrolled: 800,
      capacity: 850,
      waitlist: 32,
      trend: "down",
      percentage: -3.1
    },
    {
      program: "Nursing",
      department: "Health Sciences",
      newEnrollments: 120,
      totalEnrolled: 600,
      capacity: 650,
      waitlist: 78,
      trend: "up",
      percentage: 15.3
    },
    {
      program: "Mechanical Engineering",
      department: "Engineering",
      newEnrollments: 95,
      totalEnrolled: 480,
      capacity: 500,
      waitlist: 18,
      trend: "stable",
      percentage: 0.8
    },
    {
      program: "Education",
      department: "Education",
      newEnrollments: 85,
      totalEnrolled: 420,
      capacity: 450,
      waitlist: 12,
      trend: "down",
      percentage: -5.2
    }
  ]

  const filteredData = enrollmentData.filter(item => {
    const matchesSearch = item.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || item.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const totalNewEnrollments = filteredData.reduce((sum, item) => sum + item.newEnrollments, 0)
  const totalEnrolled = filteredData.reduce((sum, item) => sum + item.totalEnrolled, 0)
  const totalCapacity = filteredData.reduce((sum, item) => sum + item.capacity, 0)
  const totalWaitlist = filteredData.reduce((sum, item) => sum + item.waitlist, 0)

  const utilizationRate = ((totalEnrolled / totalCapacity) * 100).toFixed(1)

  const getTrendIcon = (trend: string, percentage: number) => {
    if (trend === "up") {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (trend === "down") {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return <div className="h-4 w-4" />
  }

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-green-600"
    if (trend === "down") return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-8 w-8 text-[#026892]" />
            Enrollment Report
          </h1>
          <p className="text-gray-600">Student enrollment statistics by program and department</p>
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
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Liberal Arts">Liberal Arts</SelectItem>
                  <SelectItem value="Health Sciences">Health Sciences</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Programs</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Program Enrollment Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-white">
                  <TableHead className="font-semibold text-black">Program</TableHead>
                  <TableHead className="font-semibold text-black">Department</TableHead>
                  <TableHead className="font-semibold text-black">New Enrollments</TableHead>
                  <TableHead className="font-semibold text-black">Total Enrolled</TableHead>
                  <TableHead className="font-semibold text-black">Capacity</TableHead>
                  <TableHead className="font-semibold text-black">Utilization</TableHead>
                  <TableHead className="font-semibold text-black">Waitlist</TableHead>
                  <TableHead className="font-semibold text-black">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => {
                  const utilization = ((item.totalEnrolled / item.capacity) * 100).toFixed(1)
                  return (
                    <TableRow key={index} className="hover:bg-white transition-colors">
                      <TableCell className="font-medium text-gray-900">{item.program}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[#026892] border-[#026892]">
                          {item.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{item.newEnrollments.toLocaleString()}</TableCell>
                      <TableCell className="font-medium text-gray-900">{item.totalEnrolled.toLocaleString()}</TableCell>
                      <TableCell className="text-gray-600">{item.capacity.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                parseFloat(utilization) >= 90 ? 'bg-[#026892]' :
                                parseFloat(utilization) >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(parseFloat(utilization), 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 min-w-[40px]">{utilization}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={item.waitlist > 50 ? 'text-red-600 border-red-200' : 'text-gray-600 border-gray-300'}
                        >
                          {item.waitlist}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(item.trend, item.percentage)}
                          <span className={`text-sm ${getTrendColor(item.trend)}`}>
                            {item.percentage > 0 ? '+' : ''}{item.percentage}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
