"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Search, 
  Plus, 
  Edit, 
  Eye, 
  BookOpen,
  Users,
  Clock,
  MapPin
} from "lucide-react"

interface Course {
  id: string
  code: string
  name: string
  credits: number
  instructor: string
  capacity: number
  enrolled: number
  schedule: string
  room: string
  status: string
}

export function ManageCourses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courses] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 3,
      instructor: "Dr. Smith",
      capacity: 50,
      enrolled: 45,
      schedule: "MWF 9:00-10:00",
      room: "A101",
      status: "Active"
    },
    {
      id: "2",
      code: "MATH201",
      name: "Calculus II",
      credits: 4,
      instructor: "Dr. Johnson",
      capacity: 40,
      enrolled: 38,
      schedule: "TTh 11:00-12:30",
      room: "B205",
      status: "Active"
    },
    {
      id: "3",
      code: "ENG102",
      name: "English Composition",
      credits: 3,
      instructor: "Prof. Williams",
      capacity: 30,
      enrolled: 30,
      schedule: "MWF 2:00-3:00",
      room: "C110",
      status: "Full"
    },
    {
      id: "4",
      code: "PHYS301",
      name: "Advanced Physics",
      credits: 4,
      instructor: "Dr. Brown",
      capacity: 25,
      enrolled: 15,
      schedule: "TTh 1:00-2:30",
      room: "D302",
      status: "Active"
    },
    {
      id: "5",
      code: "HIST150",
      name: "World History",
      credits: 3,
      instructor: "Prof. Davis",
      capacity: 35,
      enrolled: 0,
      schedule: "MWF 10:00-11:00",
      room: "E201",
      status: "Pending"
    }
  ])

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string, enrolled: number, capacity: number) => {
    if (status === "Full" || enrolled >= capacity) {
      return <Badge className="bg-red-100 text-red-700 border-red-200">Full</Badge>
    }
    if (status === "Pending") {
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>
    }
    return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="text-black text-lg font-bold">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Course Management
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#026892] hover:bg-[#024f70] text-white flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Create a new course offering for the current semester.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Course Code (e.g., CS101)" />
                <Input placeholder="Course Name" />
                <Input placeholder="Credits" type="number" />
                <Input placeholder="Instructor" />
                <Input placeholder="Capacity" type="number" />
                <Button className="w-full bg-[#026892] hover:bg-[#024f70] text-white">
                  Create Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Courses Table */}
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-black">Course Code</TableHead>
                <TableHead className="font-semibold text-black">Course Name</TableHead>
                <TableHead className="font-semibold text-black">Instructor</TableHead>
                <TableHead className="font-semibold text-black">Enrollment</TableHead>
                <TableHead className="font-semibold text-black">Schedule</TableHead>
                <TableHead className="font-semibold text-black">Status</TableHead>
                <TableHead className="text-right font-semibold text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-bold text-black">{course.code}</TableCell>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{course.enrolled}/{course.capacity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-sm">{course.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-sm">{course.room}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(course.status, course.enrolled, course.capacity)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#026892]">{courses.length}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter(c => c.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">
              {courses.filter(c => c.status === "Full" || c.enrolled >= c.capacity).length}
            </div>
            <div className="text-sm text-gray-600">Full Courses</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {courses.filter(c => c.status === "Pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending Courses</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
