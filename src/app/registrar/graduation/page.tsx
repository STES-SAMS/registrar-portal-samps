"use client"

import React, { useState } from "react"
import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { 
  GraduationCap, 
  Users, 
  Calendar,
  Award,
  Plus,
  Search,
  Eye,
  Mail,
  FileCheck,
  CheckCircle,
  AlertCircle,
  BarChart3,
  ArrowLeft
} from "lucide-react"
import {
  GraduationManagement,
  ReviewRequirements,
  InformStudents
} from "@/components/registrar/graduation"

interface GraduationStats {
  eligible: number
  confirmed: number
  daysToCeremony: number
  honorsStudents: number
}

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
  status: "Eligible" | "Pending" | "Confirmed" | "Graduated"
}

export default function GraduationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeComponent, setActiveComponent] = useState<string>("dashboard")
  
  const stats: GraduationStats = {
    eligible: 856,
    confirmed: 734,
    daysToCeremony: 45,
    honorsStudents: 23
  }

  const componentOptions = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "graduation-management", label: "Graduation Management", icon: GraduationCap },
    { id: "review-requirements", label: "Review Requirements", icon: FileCheck },
    { id: "inform-students", label: "Inform Students", icon: Mail },
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
      status: "Confirmed"
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
      status: "Pending"
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
      status: "Pending"
    },
    {
      id: "4",
      name: "Emily Davis",
      studentId: "2021004",
      program: "Mathematics",
      gpa: 3.95,
      creditsCompleted: 120,
      creditsRequired: 120,
      financialClearance: true,
      finalProjects: true,
      status: "Eligible"
    }
  ])

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm) ||
    student.program.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Confirmed</Badge>
      case "Eligible":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Eligible</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>
      case "Graduated":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Graduated</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getRequirementIcon = (completed: boolean) => {
    return completed ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-600" />
    )
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "graduation-management":
        return <GraduationManagement />
      case "review-requirements":
        return <ReviewRequirements />
      case "inform-students":
        return <InformStudents />
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eligible Graduates</p>
                <p className="text-3xl font-bold text-purple-600">{stats.eligible}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-3xl font-bold text-[#026892]">{stats.confirmed}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-[#026892]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days to Ceremony</p>
                <p className="text-3xl font-bold text-blue-600">{stats.daysToCeremony}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Honors Students</p>
                <p className="text-3xl font-bold text-orange-600">{stats.honorsStudents}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graduation Requirements */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Graduation Requirements</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Credit Requirements</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">856/856 students verified</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">Complete</Badge>
                </div>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Financial Requirements</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">728/856 students verified</span>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>
                </div>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Final Projects</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">556/856 students completed</span>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">Pending</Badge>
                </div>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            <Button 
              className="w-fit border bg-[#026892] hover:bg-[#024f70] text-white font-medium"
              onClick={() => setActiveComponent("review-requirements")}
            >
              Review Requirements
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-900">Graduation Candidates</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-black">Student</TableHead>
                  <TableHead className="font-semibold text-black">Program</TableHead>
                  <TableHead className="font-semibold text-black">GPA</TableHead>
                  <TableHead className="font-semibold text-black">Credits</TableHead>
                  <TableHead className="font-semibold text-black">Requirements</TableHead>
                  <TableHead className="font-semibold text-black">Status</TableHead>
                  <TableHead className="text-right font-semibold text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.studentId}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{student.program}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={student.gpa >= 3.8 ? "text-green-700 border-green-200" : "text-blue-700 border-blue-200"}>
                        {student.gpa.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{student.creditsCompleted}</span>
                        <span className="text-gray-500">/{student.creditsRequired}</span>
                      </div>
                      <Progress 
                        value={(student.creditsCompleted / student.creditsRequired) * 100} 
                        className="h-1 mt-1 w-16" 
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {getRequirementIcon(student.financialClearance)}
                          <span className="text-xs">Financial</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getRequirementIcon(student.finalProjects)}
                          <span className="text-xs">Projects</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(student.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white"
                          onClick={() => setActiveComponent("inform-students")}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#026892]"
          onClick={() => setActiveComponent("graduation-management")}
        >
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-opacity-10 w-fit mx-auto mb-4">
              <Plus className="h-8 w-8 text-[#026892]" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Add Graduation</h3>
            <p className="text-gray-600 text-sm mb-4">Create new graduation ceremonies and batches</p>
            <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
              Manage Graduations
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#026892]"
          onClick={() => setActiveComponent("review-requirements")}
        >
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-opacity-10 w-fit mx-auto mb-4">
              <FileCheck className="h-8 w-8 text-[#026892]" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Track Graduation</h3>
            <p className="text-gray-600 text-sm mb-4">Review student requirements and progress</p>
            <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
              Review Requirements
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#026892]"
          onClick={() => setActiveComponent("inform-students")}
        >
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-opacity-10 w-fit mx-auto mb-4">
              <Mail className="h-8 w-8 text-[#026892]" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Inform Student</h3>
            <p className="text-gray-600 text-sm mb-4">Send notifications and communications</p>
            <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
              Send Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <RegistrarLayout role="registrar">
      <div className="space-y-6">
        {/* Header with Component Navigation */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            {activeComponent !== "dashboard" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveComponent("dashboard")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <GraduationCap className="h-8 w-8" />
                Graduation Management
              </h1>
              <p className="text-gray-600">
                {activeComponent === "dashboard" 
                  ? "Manage graduation requirements and ceremonies" 
                  : componentOptions.find(opt => opt.id === activeComponent)?.label}
              </p>
            </div>
          </div>
          
          {activeComponent === "dashboard" && (
            <div className="flex flex-wrap gap-2">
              {componentOptions.slice(1).map((option) => {
                const IconComponent = option.icon
                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveComponent(option.id)}
                    className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
                  >
                    <IconComponent className="h-4 w-4" />
                    {option.label}
                  </Button>
                )
              })}
            </div>
          )}
        </div>

        {/* Render Active Component */}
        {renderActiveComponent()}
      </div>
    </RegistrarLayout>
  )
}
