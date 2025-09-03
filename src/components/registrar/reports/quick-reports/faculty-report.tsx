"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  School, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  Award,
  Search,
  GraduationCap,
  Star
} from "lucide-react"

interface FacultyData {
  name: string
  department: string
  position: string
  coursesTeaching: number
  totalStudents: number
  averageRating: number
  teachingLoad: number
  researchHours: number
  officeHours: number
  status: "Full-time" | "Part-time" | "Adjunct"
  experience: number
  efficiency: number
  trend: "up" | "down" | "stable"
}

export function FacultyReport() {
  const [selectedSemester, setSelectedSemester] = useState("fall-2025")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const facultyData: FacultyData[] = [
    {
      name: "Dr. Sarah Johnson",
      department: "Computer Science",
      position: "Professor",
      coursesTeaching: 3,
      totalStudents: 185,
      averageRating: 4.7,
      teachingLoad: 12,
      researchHours: 20,
      officeHours: 6,
      status: "Full-time",
      experience: 15,
      efficiency: 92,
      trend: "up"
    },
    {
      name: "Prof. Michael Chen",
      department: "Mathematics",
      position: "Associate Professor",
      coursesTeaching: 4,
      totalStudents: 220,
      averageRating: 4.2,
      teachingLoad: 15,
      researchHours: 15,
      officeHours: 8,
      status: "Full-time",
      experience: 12,
      efficiency: 88,
      trend: "stable"
    },
    {
      name: "Dr. Emily Rodriguez",
      department: "Business",
      position: "Assistant Professor",
      coursesTeaching: 3,
      totalStudents: 160,
      averageRating: 4.5,
      teachingLoad: 12,
      researchHours: 18,
      officeHours: 5,
      status: "Full-time",
      experience: 8,
      efficiency: 90,
      trend: "up"
    },
    {
      name: "Dr. James Wilson",
      department: "Psychology",
      position: "Professor",
      coursesTeaching: 2,
      totalStudents: 280,
      averageRating: 4.1,
      teachingLoad: 10,
      researchHours: 25,
      officeHours: 4,
      status: "Full-time",
      experience: 20,
      efficiency: 85,
      trend: "down"
    },
    {
      name: "Dr. Lisa Park",
      department: "Nursing",
      position: "Associate Professor",
      coursesTeaching: 3,
      totalStudents: 120,
      averageRating: 4.8,
      teachingLoad: 12,
      researchHours: 12,
      officeHours: 7,
      status: "Full-time",
      experience: 14,
      efficiency: 95,
      trend: "up"
    },
    {
      name: "Prof. David Martinez",
      department: "English",
      position: "Associate Professor",
      coursesTeaching: 4,
      totalStudents: 195,
      averageRating: 3.9,
      teachingLoad: 16,
      researchHours: 10,
      officeHours: 6,
      status: "Full-time",
      experience: 11,
      efficiency: 82,
      trend: "down"
    },
    {
      name: "Dr. Anna Williams",
      department: "Chemistry",
      position: "Assistant Professor",
      coursesTeaching: 2,
      totalStudents: 140,
      averageRating: 4.3,
      teachingLoad: 8,
      researchHours: 22,
      officeHours: 4,
      status: "Full-time",
      experience: 6,
      efficiency: 87,
      trend: "stable"
    },
    {
      name: "Prof. Robert Brown",
      department: "Business",
      position: "Adjunct Professor",
      coursesTeaching: 2,
      totalStudents: 85,
      averageRating: 4.0,
      teachingLoad: 8,
      researchHours: 5,
      officeHours: 3,
      status: "Part-time",
      experience: 18,
      efficiency: 78,
      trend: "stable"
    }
  ]

  const filteredData = facultyData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || item.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const totalFaculty = filteredData.length
  const totalStudents = filteredData.reduce((sum, item) => sum + item.totalStudents, 0)
  const averageRating = (filteredData.reduce((sum, item) => sum + item.averageRating, 0) / totalFaculty).toFixed(1)
  const averageTeachingLoad = (filteredData.reduce((sum, item) => sum + item.teachingLoad, 0) / totalFaculty).toFixed(1)
  const totalCourses = filteredData.reduce((sum, item) => sum + item.coursesTeaching, 0)

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-blue-600"
    if (rating >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600"
    if (efficiency >= 80) return "text-blue-600"
    if (efficiency >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Full-time":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Full-time</Badge>
      case "Part-time":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Part-time</Badge>
      case "Adjunct":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Adjunct</Badge>
      default:
        return <Badge className="bg-white text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getPositionBadge = (position: string) => {
    switch (position) {
      case "Professor":
        return <Badge variant="outline" className="text-[#026892] border-[#026892]">Professor</Badge>
      case "Associate Professor":
        return <Badge variant="outline" className="text-purple-600 border-purple-200">Associate Prof.</Badge>
      case "Assistant Professor":
        return <Badge variant="outline" className="text-blue-600 border-blue-200">Assistant Prof.</Badge>
      case "Adjunct Professor":
        return <Badge variant="outline" className="text-gray-600 border-gray-200">Adjunct Prof.</Badge>
      default:
        return <Badge variant="outline">{position}</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />
    return <div className="h-4 w-4" />
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-3 w-3 fill-yellow-200 text-yellow-400" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <School className="h-8 w-8 text-black" />
            Faculty Report
          </h1>
          <p className="text-gray-600">Teaching loads, performance, and resource utilization analysis</p>
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
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Faculty</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search faculty members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Faculty Performance Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-white">
                  <TableHead className="font-semibold text-black">Faculty Member</TableHead>
                  <TableHead className="font-semibold text-black">Position</TableHead>
                  <TableHead className="font-semibold text-black">Courses/Students</TableHead>
                  <TableHead className="font-semibold text-black">Rating</TableHead>
                  <TableHead className="font-semibold text-black">Workload</TableHead>
                  <TableHead className="font-semibold text-black">Efficiency</TableHead>
                  <TableHead className="font-semibold text-black">Status</TableHead>
                  <TableHead className="font-semibold text-black">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-white transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <Badge variant="outline" className="text-[#026892] border-[#026892] mt-1">
                          {item.department}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {getPositionBadge(item.position)}
                        <span className="text-xs text-gray-500">{item.experience} years exp.</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{item.coursesTeaching} courses</div>
                        <div className="text-sm text-gray-500">{item.totalStudents} students</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center">
                        <span className={`font-bold ${getRatingColor(item.averageRating)}`}>
                          {item.averageRating.toFixed(1)}
                        </span>
                        <div className="flex items-center mt-1">
                          {renderStars(item.averageRating).slice(0, 5)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{item.teachingLoad}h</div>
                        <div className="text-xs text-gray-500">
                          {item.researchHours}h research
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.officeHours}h office
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.efficiency >= 90 ? 'bg-green-500' :
                              item.efficiency >= 80 ? 'bg-blue-500' :
                              item.efficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.efficiency}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getEfficiencyColor(item.efficiency)}`}>
                          {item.efficiency}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
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

      {/* Faculty Performance Overview */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Award className="h-5 w-5 text-black" />
            Faculty Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Top Performers</h3>
              {filteredData
                .sort((a, b) => b.averageRating - a.averageRating)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.department}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {renderStars(item.averageRating).slice(0, 5)}
                      </div>
                      <div className="text-sm text-green-600 font-medium">{item.averageRating.toFixed(1)}</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">High Workload</h3>
              {filteredData
                .sort((a, b) => b.teachingLoad - a.teachingLoad)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.totalStudents} students</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{item.teachingLoad}h</div>
                      <div className="text-sm text-gray-500">{item.coursesTeaching} courses</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Research Focus</h3>
              {filteredData
                .sort((a, b) => b.researchHours - a.researchHours)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.position}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">{item.researchHours}h</div>
                      <div className="text-sm text-gray-500">Research time</div>
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
