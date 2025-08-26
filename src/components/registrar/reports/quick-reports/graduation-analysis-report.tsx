"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  GraduationCap, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Award,
  CheckCircle,
  Calendar,
  Search,
} from "lucide-react"

interface GraduationData {
  program: string
  degree: string
  department: string
  graduatingStudents: number
  totalCandidates: number
  averageYearsToComplete: number
  graduationRate: number
  honorsStudents: number
  trend: "up" | "down" | "stable"
  year: string
}

export function GraduationAnalysisReport() {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const graduationData: GraduationData[] = [
    {
      program: "Computer Science",
      degree: "Bachelor of Science",
      department: "Engineering",
      graduatingStudents: 145,
      totalCandidates: 150,
      averageYearsToComplete: 4.2,
      graduationRate: 96.7,
      honorsStudents: 28,
      trend: "up",
      year: "2025"
    },
    {
      program: "Business Administration",
      degree: "Bachelor of Business",
      department: "Business",
      graduatingStudents: 120,
      totalCandidates: 125,
      averageYearsToComplete: 4.1,
      graduationRate: 96.0,
      honorsStudents: 22,
      trend: "up",
      year: "2025"
    },
    {
      program: "Nursing",
      degree: "Bachelor of Science in Nursing",
      department: "Health Sciences",
      graduatingStudents: 85,
      totalCandidates: 88,
      averageYearsToComplete: 4.0,
      graduationRate: 96.6,
      honorsStudents: 18,
      trend: "stable",
      year: "2025"
    },
    {
      program: "Psychology",
      degree: "Bachelor of Arts",
      department: "Liberal Arts",
      graduatingStudents: 95,
      totalCandidates: 102,
      averageYearsToComplete: 4.3,
      graduationRate: 93.1,
      honorsStudents: 15,
      trend: "down",
      year: "2025"
    },
    {
      program: "Mechanical Engineering",
      degree: "Bachelor of Science",
      department: "Engineering",
      graduatingStudents: 75,
      totalCandidates: 80,
      averageYearsToComplete: 4.5,
      graduationRate: 93.8,
      honorsStudents: 12,
      trend: "up",
      year: "2025"
    },
    {
      program: "Education",
      degree: "Bachelor of Education",
      department: "Education",
      graduatingStudents: 65,
      totalCandidates: 70,
      averageYearsToComplete: 4.1,
      graduationRate: 92.9,
      honorsStudents: 8,
      trend: "down",
      year: "2025"
    },
    {
      program: "Master of Business Administration",
      degree: "Master of Business",
      department: "Business",
      graduatingStudents: 45,
      totalCandidates: 48,
      averageYearsToComplete: 2.2,
      graduationRate: 93.8,
      honorsStudents: 12,
      trend: "up",
      year: "2025"
    }
  ]

  const filteredData = graduationData.filter(item => {
    const matchesSearch = item.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.degree.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || item.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const totalGraduating = filteredData.reduce((sum, item) => sum + item.graduatingStudents, 0)
  const totalCandidates = filteredData.reduce((sum, item) => sum + item.totalCandidates, 0)
  const overallGraduationRate = ((totalGraduating / totalCandidates) * 100).toFixed(1)
  const totalHonorsStudents = filteredData.reduce((sum, item) => sum + item.honorsStudents, 0)
  const averageCompletionTime = (filteredData.reduce((sum, item) => sum + (item.averageYearsToComplete * item.graduatingStudents), 0) / totalGraduating).toFixed(1)

  const getGraduationRateColor = (rate: number) => {
    if (rate >= 95) return "text-green-600"
    if (rate >= 90) return "text-blue-600"
    if (rate >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  const getCompletionTimeColor = (years: number) => {
    if (years <= 4.0) return "text-green-600"
    if (years <= 4.5) return "text-blue-600"
    if (years <= 5.0) return "text-yellow-600"
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
            <GraduationCap className="h-8 w-8 text-[#026892]" />
            Graduation Analysis Report
          </h1>
          <p className="text-gray-600">Graduation rates, completion times, and degree distribution analysis</p>
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
              <label className="text-sm font-medium text-gray-700">Graduation Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
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
                  <SelectItem value="Health Sciences">Health Sciences</SelectItem>
                  <SelectItem value="Liberal Arts">Liberal Arts</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Programs</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search programs or degrees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graduation Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Program Graduation Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-[#026892]">Program</TableHead>
                  <TableHead className="font-semibold text-[#026892]">Degree Type</TableHead>
                  <TableHead className="font-semibold text-[#026892]">Graduates</TableHead>
                  <TableHead className="font-semibold text-[#026892]">Graduation Rate</TableHead>
                  <TableHead className="font-semibold text-[#026892]">Avg. Completion</TableHead>
                  <TableHead className="font-semibold text-[#026892]">Honors Students</TableHead>
                  <TableHead className="font-semibold text-[#026892]">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{item.program}</div>
                        <Badge variant="outline" className="text-[#026892] border-[#026892] mt-1">
                          {item.department}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        {item.degree.includes("Master") ? "Graduate" : "Undergraduate"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{item.graduatingStudents}</div>
                        <div className="text-sm text-gray-500">of {item.totalCandidates}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.graduationRate >= 95 ? 'bg-green-500' :
                              item.graduationRate >= 90 ? 'bg-blue-500' :
                              item.graduationRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.graduationRate}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getGraduationRateColor(item.graduationRate)}`}>
                          {item.graduationRate.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getCompletionTimeColor(item.averageYearsToComplete)}`}>
                        {item.averageYearsToComplete} years
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium text-gray-900">{item.honorsStudents}</span>
                        <span className="text-sm text-gray-500">
                          ({((item.honorsStudents / item.graduatingStudents) * 100).toFixed(1)}%)
                        </span>
                      </div>
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
