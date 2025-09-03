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
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react"

export default function ApplicationDetails() {
  // Mock application data - in real app, this would come from params/API
  const application = {
    id: "APP001",
    applicant: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, City, State 12345",
      dateOfBirth: "1995-06-15",
      nationality: "American"
    },
    program: {
      name: "Computer Science",
      degree: "Bachelor of Science",
      startDate: "2025-09-01"
    },
    application: {
      submittedDate: "2025-01-15",
      status: "Under Review",
      statusColor: "#026892",
      score: "85%",
      gpa: "3.7",
      testScores: {
        sat: "1450",
        act: "32"
      }
    },
    documents: [
      { name: "Transcript", status: "Received", date: "2025-01-10" },
      { name: "Letter of Recommendation", status: "Received", date: "2025-01-12" },
      { name: "Personal Statement", status: "Received", date: "2025-01-08" },
      { name: "Test Scores", status: "Pending", date: "2025-01-15" }
    ],
    timeline: [
      { date: "2025-01-15", event: "Application Submitted", status: "completed" },
      { date: "2025-01-16", event: "Initial Review", status: "completed" },
      { date: "2025-01-18", event: "Document Verification", status: "current" },
      { date: "2025-01-25", event: "Committee Review", status: "pending" },
      { date: "2025-02-01", event: "Decision", status: "pending" }
    ]
  }

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

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "Received":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "current":
        return <Clock className="h-5 w-5 text-[#026892]" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white" />
    }
  }

  return (
    <RegistrarLayout role="registrar" title="Application Details">
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center">
          <Link href="/registrar/admissions">
            <Button variant="outline" size="sm" className="flex items-center gap-2 text-[#026892] hover:bg-[#026892] hover:text-white font-medium shadow-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Admissions
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Application Details</h1>
              <p className="text-gray-600 font-medium">Application ID: <span className="text-[#026892]  ">{application.id}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/registrar/admissions/${application.id}/edit`}>
                <Button variant="outline" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                  <FileText className="h-4 w-4" />
                  Edit Application
                </Button>
              </Link>
              <Button className="bg-[#026892] hover:bg-[#024f70] text-white flex items-center gap-2 shadow-md">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Status and Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="mb-3">
                {getStatusBadge(application.application.status, application.application.statusColor)}
              </div>
              <p className="text-sm font-medium text-gray-600">Current Status</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#026892] mb-3">
                {application.application.score}
              </div>
              <p className="text-sm font-medium text-gray-600">Overall Score</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#026892] mb-3">
                {application.application.gpa}
              </div>
              <p className="text-sm font-medium text-gray-600">GPA</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applicant Information */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Applicant Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <label className="text-lg text-black uppercase tracking-wide">Full Name</label>
                <p className="text-lg text-gray-900 mt-1">{application.applicant.name}</p>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Mail className="h-4 w-4 text-[#026892]" />
                <span className="text-gray-700">{application.applicant.email}</span>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Phone className="h-4 w-4 text-[#026892]" />
                <span className="text-gray-700">{application.applicant.phone}</span>
              </div>
              <div className="flex items-center gap-2 py-2">
                <MapPin className="h-4 w-4 text-[#026892]" />
                <span className="text-gray-700">{application.applicant.address}</span>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Calendar className="h-4 w-4 text-[#026892]" />
                <span className="text-gray-700">Born: {application.applicant.dateOfBirth}</span>
              </div>
              <div className="pt-2">
                <label className="text-lg text-black uppercase tracking-wide">Nationality</label>
                <p className="text-gray-900 mt-1">{application.applicant.nationality}</p>
              </div>
            </CardContent>
          </Card>

          {/* Program Information */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Program Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <label className="text-lg text-black uppercase tracking-wide">Program</label>
                <p className="text-sm text-gray-900 mt-1">{application.program.name}</p>
              </div>
              <div>
                <label className="text-lg text-black uppercase tracking-wide">Degree</label>
                <p className="text-sm text-gray-900 mt-1">{application.program.degree}</p>
              </div>
              <div>
                <label className="text-lg text-black uppercase tracking-wide">Expected Start Date</label>
                <p className="text-sm text-gray-900 mt-1">{application.program.startDate}</p>
              </div>
              <Separator className="my-4" />
              <div>
                <label className="text-lg text-black uppercase tracking-wide">Test Scores</label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="bg-white p-3 rounded-lg border">
                    <p className="text-sm text-[#026892] font-medium">SAT</p>
                    <p className="font-bold text-xl text-gray-900">{application.application.testScores.sat}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <p className="text-sm text-[#026892] font-medium">ACT</p>
                    <p className="font-bold text-xl text-gray-900">{application.application.testScores.act}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Documents */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Required Documents
              </CardTitle>
            </CardHeader>Program Information

            <CardContent className="p-6">
              <div className="space-y-3">
                {application.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-white transition-colors">
                    <div className="flex items-center gap-3">
                      {getDocumentStatusIcon(doc.status)}
                      <div>
                        <p className="  text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">Received: {doc.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#026892] hover:bg-[#026892] hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Timeline */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {application.timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors">
                    {getTimelineIcon(item.status)}
                    <div className="flex-1">
                      <p className="  text-gray-900">{item.event}</p>
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
            <div className="flex items-center justify-end">
            
              <div className="flex gap-3">
                <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 font-medium">
                  Reject Application
                </Button>
                <Button variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50 hover:border-amber-400 font-medium">
                  Request Interview
                </Button>
                <Button className="bg-[#026892] hover:bg-[#024f70] text-white font-medium shadow-md">
                  Approve Application
                </Button>
              </div>
            </div>
      </div>
    </RegistrarLayout>
  )
}
