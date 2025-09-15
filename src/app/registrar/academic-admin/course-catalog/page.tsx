"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Eye,
  Edit,
  BookOpen,
  Clock,
  GraduationCap,
  Filter
} from "lucide-react"
import { RegistrarLayout } from "@/components/registrar"
import BackButton from "@/components/registrar/academic-admin/backbutton"

interface Course {
  id: string
  code: string
  title: string
  credits: number
  department: string
  level: "Undergraduate" | "Graduate"
  prerequisites: string[]
  description: string
  semester: string[]
  status: "Active" | "Inactive" | "Under Review"
}

export default function CourseCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [courses] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      title: "Introduction to Computer Science",
      credits: 3,
      department: "Computer Science",
      level: "Undergraduate",
      prerequisites: [],
      description: "An introduction to computer science concepts, programming fundamentals, and problem-solving techniques using modern programming languages.",
      semester: ["Fall", "Spring"],
      status: "Active"
    },
    {
      id: "2",
      code: "CS201",
      title: "Data Structures and Algorithms",
      credits: 4,
      department: "Computer Science",
      level: "Undergraduate",
      prerequisites: ["CS101"],
      description: "Study of fundamental data structures and algorithms including arrays, linked lists, stacks, queues, trees, graphs, and sorting algorithms.",
      semester: ["Fall", "Spring"],
      status: "Active"
    },
    {
      id: "3",
      code: "MATH101",
      title: "Calculus I",
      credits: 4,
      department: "Mathematics",
      level: "Undergraduate",
      prerequisites: [],
      description: "Introduction to differential and integral calculus with applications to science and engineering.",
      semester: ["Fall", "Spring", "Summer"],
      status: "Active"
    },
    {
      id: "4",
      code: "ENG102",
      title: "English Composition",
      credits: 3,
      department: "English",
      level: "Undergraduate",
      prerequisites: ["ENG101"],
      description: "Advanced composition focusing on critical thinking, research methods, and academic writing.",
      semester: ["Fall", "Spring"],
      status: "Active"
    },
    {
      id: "5",
      code: "CS501",
      title: "Advanced Machine Learning",
      credits: 3,
      department: "Computer Science",
      level: "Graduate",
      prerequisites: ["CS301", "MATH301"],
      description: "Advanced topics in machine learning including deep learning, neural networks, and artificial intelligence applications.",
      semester: ["Spring"],
      status: "Under Review"
    },
    {
      id: "6",
      code: "PHYS201",
      title: "Physics II",
      credits: 4,
      department: "Physics",
      level: "Undergraduate",
      prerequisites: ["PHYS101", "MATH201"],
      description: "Continuation of introductory physics covering electricity, magnetism, and modern physics concepts.",
      semester: ["Spring"],
      status: "Active"
    }
  ])

  const departments = ["Computer Science", "Mathematics", "English", "Physics", "Chemistry", "Biology"]
  const semesters = ["Fall", "Spring", "Summer"]

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || course.department === selectedDepartment
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    const matchesSemester = selectedSemester === "all" || course.semester.includes(selectedSemester)

    return matchesSearch && matchesDepartment && matchesLevel && matchesSemester
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
      case "Inactive":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Inactive</Badge>
      case "Under Review":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Under Review</Badge>
      default:
        return <Badge className="bg-white text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getLevelBadge = (level: string) => {
    return level === "Graduate"
      ? <Badge variant="outline" className="text-purple-700 border-purple-200">Graduate</Badge>
      : <Badge variant="outline" className="text-blue-700 border-blue-200">Undergraduate</Badge>
  }

  return (
    <RegistrarLayout role="registrar" title="Course Catalog">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="text-black text-lg font-bold">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BackButton />
              <BookOpen className="h-5 w-5" />
              Course Catalog Management
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>
                    Add a new course to the academic catalog.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Course Code (e.g., CS101)" />
                    <Input placeholder="Credits" type="number" />
                  </div>
                  <Input placeholder="Course Title" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Prerequisites (comma separated)" />
                  <Textarea placeholder="Course Description" rows={4} />
                  <Button className="w-full bg-[#026892] hover:bg-[#024f70] text-white">
                    Add Course to Catalog
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                <SelectItem value="Graduate">Graduate</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map(sem => (
                  <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-[#026892]">{course.code}</CardTitle>
                      <p className="text-sm text-gray-600">{course.title}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {getStatusBadge(course.status)}
                      {getLevelBadge(course.level)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{course.department}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Credits:</span>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4 text-[#026892]" />
                        <span className="font-medium">{course.credits}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Offered:</span>
                      <div className="flex gap-1">
                        {course.semester.map(sem => (
                          <Badge key={sem} variant="outline" className="text-xs">
                            {sem}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {course.prerequisites.length > 0 && (
                      <div className="text-sm">
                        <span className="text-gray-600">Prerequisites:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {course.prerequisites.map(prereq => (
                            <Badge key={prereq} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 text-[#026892] border-[#026892] hover:bg-[#026892] hover:text-white">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-[#026892] border-[#026892] hover:bg-[#026892] hover:text-white">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}

          {/* Summary Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#026892]">{courses.length}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {courses.filter(c => c.status === "Active").length}
              </div>
              <div className="text-sm text-gray-600">Active Courses</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {courses.filter(c => c.level === "Undergraduate").length}
              </div>
              <div className="text-sm text-gray-600">Undergraduate</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {courses.filter(c => c.level === "Graduate").length}
              </div>
              <div className="text-sm text-gray-600">Graduate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </RegistrarLayout>
  )
}