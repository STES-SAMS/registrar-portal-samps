"use client"

import React from "react"
import Link from "next/link"
import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  User,
  GraduationCap,
  FileText,
  BookOpen,
  CreditCard,
  
} from "lucide-react"

export default function StudentDetails() {
  // Mock student data - in real app, this would come from params/API
  const student = {
    id: "STU001",
    personal: {
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      address: "123 Campus Drive, University City, State 12345",
      dateOfBirth: "2002-03-15",
      studentId: "2021-STU-001",
      emergencyContact: "+1 (555) 987-6543"
    },
    academic: {
      program: "Computer Science",
      degree: "Bachelor of Science",
      year: "3rd Year",
      semester: "Fall 2025",
      gpa: "3.8",
      credits: "98",
      expectedGraduation: "May 2026",
      advisor: "Dr. Sarah Wilson",
      status: "Active",
      statusColor: "#10b981"
    },
    enrollment: {
      admissionDate: "2021-09-01",
      currentSemester: "6",
      totalSemesters: "8",
      enrollmentStatus: "Full-time"
    },
    grades: [
      { course: "CS 301 - Data Structures", semester: "Fall 2024", grade: "A", credits: "3" },
      { course: "CS 305 - Algorithms", semester: "Fall 2024", grade: "A-", credits: "3" },
      { course: "MATH 210 - Calculus III", semester: "Fall 2024", grade: "B+", credits: "4" },
      { course: "CS 280 - Database Systems", semester: "Spring 2024", grade: "A", credits: "3" },
      { course: "CS 250 - Computer Architecture", semester: "Spring 2024", grade: "B+", credits: "3" }
    ],
    financials: {
      tuitionStatus: "Paid",
      balance: "$0.00",
      scholarship: "Merit Scholarship - $5,000",
      financialAid: "Yes"
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return '#10b981'
    if (grade.startsWith('B')) return '#3b82f6'
    if (grade.startsWith('C')) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <RegistrarLayout role="registrar" title="Student Details">
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center">
          <Link href="/registrar/student-records">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white font-medium shadow-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Student Records
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Student Details</h1>
              <p className="text-gray-600 font-medium">Student ID: <span className="text-[#026892] font-semibold">{student.id}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/registrar/student-records/${student.id}/edit`}>
                <Button variant="outline" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                  <FileText className="h-4 w-4" />
                  Edit Record
                </Button>
              </Link>
              <Button className="bg-[#026892] hover:bg-[#024f70] text-white flex items-center gap-2 shadow-md">
                <Download className="h-4 w-4" />
                Download Transcript
              </Button>
            </div>
          </div>
        </div>

        {/* Status and Academic Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-3">
                <Badge 
                  variant="secondary" 
                  style={{ 
                    backgroundColor: `${student.academic.statusColor}20`, 
                    color: student.academic.statusColor,
                    border: `1px solid ${student.academic.statusColor}40`
                  }}
                >
                  {student.academic.status}
                </Badge>
              </div>
              <p className="text-sm font-medium text-gray-600">Status</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#026892] mb-3">
                {student.academic.gpa}
              </div>
              <p className="text-sm font-medium text-gray-600">Current GPA</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#026892] mb-3">
                {student.academic.credits}
              </div>
              <p className="text-sm font-medium text-gray-600">Credits Earned</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#026892] mb-3">
                {student.academic.year}
              </div>
              <p className="text-sm font-medium text-gray-600">Academic Year</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <label className="text-sm font-semibold text-[#026892] uppercase tracking-wide">Full Name</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{student.personal.name}</p>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Mail className="h-4 w-4 text-[#026892]" />
                <span className="text-gray-700">{student.personal.email}</span>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Phone className="h-4 w-4 text-[#026892]" />
                <span className="text-gray-700">{student.personal.phone}</span>
              </div>
              <div className="flex items-center gap-2 py-2">
                <MapPin className="h-4 w-4 text-[#026892]" />
                <span className="text-gray-700">{student.personal.address}</span>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Calendar className="h-4 w-4 text-[#026892]" />
                <span className="text-gray-700">Born: {student.personal.dateOfBirth}</span>
              </div>
              <div className="pt-2">
                <label className="text-sm font-semibold text-[#026892] uppercase tracking-wide">Emergency Contact</label>
                <p className="text-gray-900 mt-1">{student.personal.emergencyContact}</p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <label className="text-sm font-semibold text-[#026892] uppercase tracking-wide">Program</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{student.academic.program}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#026892] uppercase tracking-wide">Degree</label>
                <p className="text-gray-900 mt-1">{student.academic.degree}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#026892] uppercase tracking-wide">Academic Advisor</label>
                <p className="text-gray-900 mt-1">{student.academic.advisor}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#026892] uppercase tracking-wide">Expected Graduation</label>
                <p className="text-gray-900 mt-1">{student.academic.expectedGraduation}</p>
              </div>
              <Separator className="my-4" />
              <div>
                <label className="text-sm font-semibold text-[#026892] uppercase tracking-wide">Enrollment</label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-[#026892] font-medium">Admission Date</p>
                    <p className="font-semibold text-gray-900">{student.enrollment.admissionDate}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-[#026892] font-medium">Enrollment Status</p>
                    <p className="font-semibold text-gray-900">{student.enrollment.enrollmentStatus}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Grades and Financial Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Grades */}
          <Card className="lg:col-span-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Grades
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {student.grades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{grade.course}</p>
                      <p className="text-sm text-gray-600">{grade.semester} • {grade.credits} credits</p>
                    </div>
                    <Badge 
                      variant="secondary"
                      style={{ 
                        backgroundColor: `${getGradeColor(grade.grade)}20`, 
                        color: getGradeColor(grade.grade),
                        border: `1px solid ${getGradeColor(grade.grade)}40`
                      }}
                    >
                      {grade.grade}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Financial Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <label className="text-sm font-semibold text-black uppercase tracking-wide">Tuition Status</label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    {student.financials.tuitionStatus}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-black uppercase tracking-wide">Outstanding Balance</label>
                <p className="text-lg font-bold text-gray-900 mt-1">{student.financials.balance}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-black uppercase tracking-wide">Scholarship</label>
                <p className="text-gray-900 mt-1">{student.financials.scholarship}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-black uppercase tracking-wide">Financial Aid</label>
                <p className="text-gray-900 mt-1">{student.financials.financialAid}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-[#026892] mb-2">Quick Actions</h3>
                <p className="text-gray-600">Manage student record and academic status</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="text-[#026892] border-[#026892] hover:bg-[#026892] hover:text-white font-medium">
                  Generate Report
                </Button>
                <Button variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50 hover:border-amber-400 font-medium">
                  Update Status
                </Button>
                <Button className="bg-[#026892] hover:bg-[#024f70] text-white font-medium shadow-md">
                  View Full Transcript
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RegistrarLayout>
  )
}
