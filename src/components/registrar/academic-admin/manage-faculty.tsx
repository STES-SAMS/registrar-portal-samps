"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import {
  Search,
  Plus,
  Edit,
  Eye,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  Users
} from "lucide-react"

interface Faculty {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: "Professor" | "Associate Professor" | "Assistant Professor" | "Lecturer" | "Adjunct"
  status: "Active" | "On Leave" | "Inactive"
  hireDate: string
  courses: string[]
  office: string
  avatar?: string
}

export function ManageFaculty() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [faculty] = useState<Faculty[]>([
    {
      id: "1",
      name: "Dr. John Smith",
      email: "j.smith@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      position: "Professor",
      status: "Active",
      hireDate: "2015-08-15",
      courses: ["CS101", "CS301", "CS401"],
      office: "CS Building, Room 301"
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      email: "s.johnson@university.edu",
      phone: "+1 (555) 234-5678",
      department: "Mathematics",
      position: "Associate Professor",
      status: "Active",
      hireDate: "2018-01-10",
      courses: ["MATH101", "MATH201", "MATH301"],
      office: "Math Building, Room 205"
    },
    {
      id: "3",
      name: "Prof. Michael Williams",
      email: "m.williams@university.edu",
      phone: "+1 (555) 345-6789",
      department: "English",
      position: "Professor",
      status: "On Leave",
      hireDate: "2012-09-01",
      courses: ["ENG101", "ENG102"],
      office: "Humanities Building, Room 150"
    },
    {
      id: "4",
      name: "Dr. Emily Brown",
      email: "e.brown@university.edu",
      phone: "+1 (555) 456-7890",
      department: "Physics",
      position: "Assistant Professor",
      status: "Active",
      hireDate: "2020-08-20",
      courses: ["PHYS101", "PHYS201"],
      office: "Science Building, Room 402"
    },
    {
      id: "5",
      name: "Dr. David Davis",
      email: "d.davis@university.edu",
      phone: "+1 (555) 567-8901",
      department: "Computer Science",
      position: "Lecturer",
      status: "Active",
      hireDate: "2021-01-15",
      courses: ["CS102", "CS202"],
      office: "CS Building, Room 105"
    }
  ])

  const departments = ["Computer Science", "Mathematics", "English", "Physics", "Chemistry", "Biology"]
  const positions = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Adjunct"]

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || member.department === selectedDepartment
    const matchesPosition = selectedPosition === "all" || member.position === selectedPosition

    return matchesSearch && matchesDepartment && matchesPosition
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
      case "On Leave":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">On Leave</Badge>
      case "Inactive":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Inactive</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getPositionBadge = (position: string) => {
    const colors = {
      "Professor": "bg-purple-100 text-purple-700 border-purple-200",
      "Associate Professor": "bg-blue-100 text-blue-700 border-blue-200",
      "Assistant Professor": "bg-cyan-100 text-cyan-700 border-cyan-200",
      "Lecturer": "bg-orange-100 text-orange-700 border-orange-200",
      "Adjunct": "bg-gray-100 text-gray-700 border-gray-200"
    }
    return <Badge className={colors[position as keyof typeof colors] || colors.Adjunct}>{position}</Badge>
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="text-black text-lg font-bold">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Faculty Management
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Faculty
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Faculty Member</DialogTitle>
                <DialogDescription>
                  Add a new faculty member to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Phone Number" />
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
                    <SelectValue placeholder="Select Position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map(pos => (
                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Office Location" />
                <Input placeholder="Hire Date" type="date" />
                <Button className="w-full bg-[#026892] hover:bg-[#024f70] text-white">
                  Add Faculty Member
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
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              {positions.map(pos => (
                <SelectItem key={pos} value={pos}>{pos}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Faculty Table */}
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-black">Faculty</TableHead>
                <TableHead className="font-semibold text-black">Department</TableHead>
                <TableHead className="font-semibold text-black">Position</TableHead>
                <TableHead className="font-semibold text-black">Contact</TableHead>
                <TableHead className="font-semibold text-black">Courses</TableHead>
                <TableHead className="font-semibold text-black">Status</TableHead>
                <TableHead className="text-right font-semibold text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((member) => (
                <TableRow key={member.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          {member.office}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{member.department}</div>
                    <div className="text-sm text-gray-500">
                      Hired: {new Date(member.hireDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPositionBadge(member.position)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <a href={`mailto:${member.email}`} className="text-[#026892] hover:underline">
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.courses.slice(0, 2).map(course => (
                        <Badge key={course} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                      {member.courses.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.courses.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(member.status)}
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

        {/* Faculty Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#026892]">{faculty.length}</div>
            <div className="text-sm text-gray-600">Total Faculty</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {faculty.filter(f => f.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {faculty.filter(f => f.position === "Professor").length}
            </div>
            <div className="text-sm text-gray-600">Professors</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {faculty.filter(f => f.position.includes("Associate")).length}
            </div>
            <div className="text-sm text-gray-600">Associates</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {faculty.filter(f => f.status === "On Leave").length}
            </div>
            <div className="text-sm text-gray-600">On Leave</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Assign Courses
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Manage Schedules
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Performance Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
