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
import { Textarea } from "@/components/ui/textarea"
import { 
  Search, 
  Plus, 
  Edit, 
  Eye,
  GraduationCap,
  Users,
  Calendar,
  Award,
  Mail,
  FileCheck,
} from "lucide-react"

interface GraduationBatch {
  id: string
  name: string
  date: string
  venue: string
  program: string
  totalStudents: number
  confirmedStudents: number
  status: "Planning" | "Active" | "Completed" | "Cancelled"
  ceremony: string
}

export function GraduationManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [graduationBatches] = useState<GraduationBatch[]>([
    {
      id: "1",
      name: "Spring 2025 Graduation",
      date: "2025-05-15",
      venue: "Main Auditorium",
      program: "All Programs",
      totalStudents: 856,
      confirmedStudents: 734,
      status: "Active",
      ceremony: "Morning Ceremony"
    },
    {
      id: "2",
      name: "Winter 2024 Graduation",
      date: "2024-12-20",
      venue: "Convention Center",
      program: "All Programs",
      totalStudents: 450,
      confirmedStudents: 450,
      status: "Completed",
      ceremony: "Evening Ceremony"
    },
    {
      id: "3",
      name: "Fall 2025 Graduation",
      date: "2025-12-18",
      venue: "Main Auditorium",
      program: "All Programs",
      totalStudents: 0,
      confirmedStudents: 0,
      status: "Planning",
      ceremony: "Afternoon Ceremony"
    }
  ])

  const filteredBatches = graduationBatches.filter(batch => {
    const matchesSearch = 
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.venue.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === "all" || batch.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
      case "Planning":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Planning</Badge>
      case "Completed":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Completed</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getProgressPercentage = (confirmed: number, total: number) => {
    if (total === 0) return 0
    return Math.round((confirmed / total) * 100)
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="text-lg text-black font-bold">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Graduation Management
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="flex items-center gap-2 bg-[#026892] text-white hover:bg-[#024f70]">
                <Plus className="h-4 w-4" />
                Add Graduation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Graduation Ceremony</DialogTitle>
                <DialogDescription>
                  Set up a new graduation ceremony and batch.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Graduation Name (e.g., Spring 2025 Graduation)" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Date" type="date" />
                  <Input placeholder="Time" type="time" />
                </div>
                <Input placeholder="Venue" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="business">Business Administration</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Ceremony Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning Ceremony</SelectItem>
                    <SelectItem value="afternoon">Afternoon Ceremony</SelectItem>
                    <SelectItem value="evening">Evening Ceremony</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea placeholder="Special instructions or notes" rows={3} />
                <Button className="w-fit bg-[#026892] hover:bg-[#024f70] text-white">
                  Create Graduation Ceremony
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search graduation ceremonies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Graduation Batches Table */}
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-black">Graduation</TableHead>
                <TableHead className="font-semibold text-black">Date & Venue</TableHead>
                <TableHead className="font-semibold text-black">Program</TableHead>
                <TableHead className="font-semibold text-black">Students</TableHead>
                <TableHead className="font-semibold text-black">Progress</TableHead>
                <TableHead className="font-semibold text-black">Status</TableHead>
                <TableHead className="text-right font-semibold text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBatches.map((batch) => (
                <TableRow key={batch.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{batch.name}</div>
                      <div className="text-sm text-gray-500">{batch.ceremony}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-sm">{new Date(batch.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm text-gray-500">{batch.venue}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[#026892] border-[#026892]">
                      {batch.program}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{batch.confirmedStudents}/{batch.totalStudents}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Confirmed</span>
                        <span>{getProgressPercentage(batch.confirmedStudents, batch.totalStudents)}%</span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(batch.confirmedStudents, batch.totalStudents)} 
                        className="h-2 w-20" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(batch.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#026892]">
              {graduationBatches.length}
            </div>
            <div className="text-sm text-gray-600">Total Ceremonies</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {graduationBatches.filter(b => b.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {graduationBatches.filter(b => b.status === "Planning").length}
            </div>
            <div className="text-sm text-gray-600">Planning</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {graduationBatches.reduce((sum, batch) => sum + batch.confirmedStudents, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Graduates</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Review Requirements
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Send Notifications
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Generate Certificates
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
