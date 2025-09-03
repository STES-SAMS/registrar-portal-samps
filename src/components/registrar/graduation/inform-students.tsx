"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Textarea } from "@/components/ui/textarea"
import { 
  Search, 
  Mail, 
  Send,
  Users,
  MessageCircle,
  Bell,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"

interface Student {
  id: string
  name: string
  studentId: string
  email: string
  program: string
  status: "Eligible" | "Pending" | "Confirmed" | "Notified"
  lastNotified?: string
  ceremonyDate?: string
}

interface NotificationTemplate {
  id: string
  name: string
  type: "Eligibility" | "Confirmation" | "Ceremony Details" | "Requirements" | "Reminder"
  subject: string
  preview: string
}

export function InformStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "John Smith",
      studentId: "2021001",
      email: "john.smith@student.edu",
      program: "Computer Science",
      status: "Confirmed",
      lastNotified: "2024-01-15",
      ceremonyDate: "2025-05-15"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      studentId: "2021002",
      email: "sarah.johnson@student.edu",
      program: "Business Administration",
      status: "Eligible",
      ceremonyDate: "2025-05-15"
    },
    {
      id: "3",
      name: "Michael Brown",
      studentId: "2021003",
      email: "michael.brown@student.edu",
      program: "Engineering",
      status: "Pending",
      lastNotified: "2024-01-10"
    },
    {
      id: "4",
      name: "Emily Davis",
      studentId: "2021004",
      email: "emily.davis@student.edu",
      program: "Mathematics",
      status: "Notified",
      lastNotified: "2024-01-20",
      ceremonyDate: "2025-05-15"
    }
  ])

  const notificationTemplates: NotificationTemplate[] = [
    {
      id: "1",
      name: "Graduation Eligibility Notification",
      type: "Eligibility",
      subject: "Congratulations! You're Eligible for Graduation",
      preview: "We're pleased to inform you that you've met all graduation requirements..."
    },
    {
      id: "2",
      name: "Ceremony Confirmation Request",
      type: "Confirmation",
      subject: "Confirm Your Attendance - Graduation Ceremony",
      preview: "Please confirm your attendance for the upcoming graduation ceremony..."
    },
    {
      id: "3",
      name: "Graduation Ceremony Details",
      type: "Ceremony Details",
      subject: "Important Details About Your Graduation Ceremony",
      preview: "Here are the important details for your graduation ceremony on..."
    },
    {
      id: "4",
      name: "Outstanding Requirements Reminder",
      type: "Requirements",
      subject: "Action Required: Complete Graduation Requirements",
      preview: "You have outstanding requirements that need to be completed..."
    },
    {
      id: "5",
      name: "Graduation Reminder",
      type: "Reminder",
      subject: "Reminder: Graduation Ceremony Approaching",
      preview: "This is a reminder that your graduation ceremony is scheduled for..."
    }
  ]

  const programs = ["Computer Science", "Business Administration", "Engineering", "Mathematics"]

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesProgram = selectedProgram === "all" || student.program === selectedProgram
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus

    return matchesSearch && matchesProgram && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Confirmed</Badge>
      case "Eligible":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Eligible</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>
      case "Notified":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Notified</Badge>
      default:
        return <Badge className="bg-white text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Eligibility":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Confirmation":
        return <MessageCircle className="h-4 w-4 text-blue-600" />
      case "Ceremony Details":
        return <Calendar className="h-4 w-4 text-purple-600" />
      case "Requirements":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "Reminder":
        return <Bell className="h-4 w-4 text-gray-600" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId])
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(student => student.id))
    } else {
      setSelectedStudents([])
    }
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="text-lg text-black font-bold">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Inform Students
          </div>
          <div className="flex gap-2">
            {selectedStudents.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Notification ({selectedStudents.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Send Notification</DialogTitle>
                    <DialogDescription>
                      Send notification to {selectedStudents.length} selected student(s).
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Template</label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose notification template" />
                        </SelectTrigger>
                        <SelectContent>
                          {notificationTemplates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              <div className="flex items-center gap-2">
                                {getTypeIcon(template.type)}
                                {template.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedTemplate && (
                      <div className="p-4 bg-white rounded-lg">
                        <h4 className="font-medium mb-2">Template Preview</h4>
                        <p className="text-sm font-medium">
                          {notificationTemplates.find(t => t.id === selectedTemplate)?.subject}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notificationTemplates.find(t => t.id === selectedTemplate)?.preview}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium mb-2 block">Additional Message (Optional)</label>
                      <Textarea placeholder="Add any additional information..." rows={3} />
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-[#026892] hover:bg-[#024f70] text-white">
                        Send Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Schedule for Later
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Notification Templates */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notificationTemplates.map((template) => (
              <Card key={template.id} className="border border-gray-200 hover:border-[#026892] cursor-pointer transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-white">
                      {getTypeIcon(template.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{template.name}</h4>
                      <Badge variant="outline" className="text-xs mb-2">{template.type}</Badge>
                      <p className="text-xs text-gray-600 line-clamp-2">{template.preview}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Notified">Notified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Students Table */}
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-semibold text-black">Student</TableHead>
                <TableHead className="font-semibold text-black">Program</TableHead>
                <TableHead className="font-semibold text-black">Email</TableHead>
                <TableHead className="font-semibold text-black">Status</TableHead>
                <TableHead className="font-semibold text-black">Last Notified</TableHead>
                <TableHead className="text-right font-semibold text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-white transition-colors">
                  <TableCell>
                    <Checkbox 
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-gray-900">{student.name}</div>
                      <div className="text-sm font-bold text-gray-900">{student.studentId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{student.program}</TableCell>
                  <TableCell>
                    <a href={`mailto:${student.email}`} className="text-[#026892] hover:underline text-sm">
                      {student.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(student.status)}
                  </TableCell>
                  <TableCell>
                    {student.lastNotified ? (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        {new Date(student.lastNotified).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Never</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Send Individual Notification</DialogTitle>
                          <DialogDescription>
                            Send notification to {student.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose template" />
                            </SelectTrigger>
                            <SelectContent>
                              {notificationTemplates.map(template => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Textarea placeholder="Additional message..." rows={3} />
                          <Button className="w-full bg-[#026892] hover:bg-[#024f70] text-white">
                            Send Notification
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#026892]">{students.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.status === "Confirmed").length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {students.filter(s => s.status === "Eligible").length}
            </div>
            <div className="text-sm text-gray-600">Eligible</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {students.filter(s => s.lastNotified).length}
            </div>
            <div className="text-sm text-gray-600">Notified</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
