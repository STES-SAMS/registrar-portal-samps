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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  Plus, 
  Edit, 
  Eye,
  Clock,
  MapPin,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react"

interface Schedule {
  id: string
  courseCode: string
  courseName: string
  instructor: string
  dayTime: string
  room: string
  capacity: number
  enrolled: number
  semester: string
  duration: string
  status: "Scheduled" | "Pending" | "Cancelled" | "Conflict"
}

interface TimeSlot {
  time: string
  monday?: Schedule
  tuesday?: Schedule
  wednesday?: Schedule
  thursday?: Schedule
  friday?: Schedule
}

export function ManageSchedules() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("Fall 2024")
  const [selectedRoom, setSelectedRoom] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")
  
  const [schedules] = useState<Schedule[]>([
    {
      id: "1",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      instructor: "Dr. Smith",
      dayTime: "MWF 9:00-10:00",
      room: "A101",
      capacity: 50,
      enrolled: 45,
      semester: "Fall 2024",
      duration: "60 min",
      status: "Scheduled"
    },
    {
      id: "2",
      courseCode: "MATH201",
      courseName: "Calculus II",
      instructor: "Dr. Johnson",
      dayTime: "TTh 11:00-12:30",
      room: "B205",
      capacity: 40,
      enrolled: 38,
      semester: "Fall 2024",
      duration: "90 min",
      status: "Scheduled"
    },
    {
      id: "3",
      courseCode: "ENG102",
      courseName: "English Composition",
      instructor: "Prof. Williams",
      dayTime: "MWF 2:00-3:00",
      room: "C110",
      capacity: 30,
      enrolled: 30,
      semester: "Fall 2024",
      duration: "60 min",
      status: "Scheduled"
    },
    {
      id: "4",
      courseCode: "PHYS301",
      courseName: "Advanced Physics",
      instructor: "Dr. Brown",
      dayTime: "TTh 1:00-2:30",
      room: "D302",
      capacity: 25,
      enrolled: 15,
      semester: "Fall 2024",
      duration: "90 min",
      status: "Scheduled"
    },
    {
      id: "5",
      courseCode: "CS202",
      courseName: "Data Structures",
      instructor: "Dr. Davis",
      dayTime: "MWF 10:00-11:00",
      room: "A101",
      capacity: 35,
      enrolled: 0,
      semester: "Fall 2024",
      duration: "60 min",
      status: "Conflict"
    }
  ])

  const rooms = ["A101", "A102", "B205", "B206", "C110", "C111", "D302", "D303"]
  const semesters = ["Fall 2024", "Spring 2024", "Summer 2024"]
  const timeSlots = [
    "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00",
    "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00",
    "16:00-17:00", "17:00-18:00"
  ]

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = 
      schedule.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSemester = schedule.semester === selectedSemester
    const matchesRoom = selectedRoom === "all" || schedule.room === selectedRoom

    return matchesSearch && matchesSemester && matchesRoom
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Scheduled</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>
      case "Conflict":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Conflict</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const parseScheduleToGrid = (): TimeSlot[] => {
    const gridData: TimeSlot[] = timeSlots.map(time => ({ time }))
    
    schedules.forEach(schedule => {
      const [days, timeRange] = schedule.dayTime.split(' ')
      const [startTime] = timeRange.split('-')
      
      const timeSlot = gridData.find(slot => slot.time.startsWith(startTime))
      if (timeSlot) {
        if (days.includes('M')) timeSlot.monday = schedule
        if (days.includes('T') && !days.includes('Th')) timeSlot.tuesday = schedule
        if (days.includes('W')) timeSlot.wednesday = schedule
        if (days.includes('Th')) timeSlot.thursday = schedule
        if (days.includes('F')) timeSlot.friday = schedule
      }
    })
    
    return gridData
  }

  const gridSchedule = parseScheduleToGrid()

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="text-black text-lg font-bold">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule Management
          </div>
          <div className="flex gap-2">
            <Select value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "table")}>
              <SelectTrigger className="w-32 bg-white text-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="table">Table View</SelectItem>
                <SelectItem value="grid">Grid View</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Schedule Class
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule New Class</DialogTitle>
                  <DialogDescription>
                    Add a new class to the schedule.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Course Code" />
                    <Input placeholder="Course Name" />
                  </div>
                  <Input placeholder="Instructor" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map(room => (
                          <SelectItem key={room} value={room}>{room}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map(sem => (
                          <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input placeholder="Day/Time (e.g., MWF 9:00-10:00)" />
                  <Input placeholder="Capacity" type="number" />
                  <Button className="w-full bg-[#026892] hover:bg-[#024f70] text-white">
                    Schedule Class
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search schedules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
            />
          </div>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map(sem => (
                <SelectItem key={sem} value={sem}>{sem}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRoom} onValueChange={setSelectedRoom}>
            <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
              <SelectValue placeholder="Room" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms</SelectItem>
              {rooms.map(room => (
                <SelectItem key={room} value={room}>{room}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {viewMode === "table" ? (
          /* Table View */
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-black">Course</TableHead>
                  <TableHead className="font-semibold text-black">Instructor</TableHead>
                  <TableHead className="font-semibold text-black">Schedule</TableHead>
                  <TableHead className="font-semibold text-black">Room</TableHead>
                  <TableHead className="font-semibold text-black">Enrollment</TableHead>
                  <TableHead className="font-semibold text-black">Status</TableHead>
                  <TableHead className="text-right font-semibold text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.map((schedule) => (
                  <TableRow key={schedule.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium text-[#026892]">{schedule.courseCode}</div>
                        <div className="text-sm text-gray-600">{schedule.courseName}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{schedule.instructor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{schedule.dayTime}</span>
                      </div>
                      <div className="text-sm text-gray-500">Duration: {schedule.duration}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{schedule.room}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{schedule.enrolled}/{schedule.capacity}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#026892] h-2 rounded-full" 
                            style={{ width: `${(schedule.enrolled / schedule.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(schedule.status)}
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
        ) : (
          /* Grid View */
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-6 gap-1 mb-2">
                <div className="p-2 font-semibold text-black bg-gray-50 rounded text-center">Time</div>
                <div className="p-2 font-semibold text-black bg-gray-50 rounded text-center">Monday</div>
                <div className="p-2 font-semibold text-black bg-gray-50 rounded text-center">Tuesday</div>
                <div className="p-2 font-semibold text-black bg-gray-50 rounded text-center">Wednesday</div>
                <div className="p-2 font-semibold text-black bg-gray-50 rounded text-center">Thursday</div>
                <div className="p-2 font-semibold text-black bg-gray-50 rounded text-center">Friday</div>
              </div>
              {gridSchedule.map((slot, index) => (
                <div key={index} className="grid grid-cols-6 gap-1 mb-1">
                  <div className="p-2 bg-gray-100 rounded font-medium text-sm">{slot.time}</div>
                  {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const).map(day => {
                    const schedule = slot[day]
                    return (
                      <div key={day} className={`p-2 min-h-[60px] border rounded ${schedule ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                        {schedule && (
                          <div className="text-xs">
                            <div className="font-medium text-[#026892]">{schedule.courseCode}</div>
                            <div className="text-gray-600">{schedule.instructor}</div>
                            <div className="text-gray-500">{schedule.room}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#026892]">{schedules.length}</div>
            <div className="text-sm text-gray-600">Total Classes</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {schedules.filter(s => s.status === "Scheduled").length}
            </div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">
              {schedules.filter(s => s.status === "Conflict").length}
            </div>
            <div className="text-sm text-gray-600">Conflicts</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {schedules.filter(s => s.status === "Pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resolve Conflicts
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Room Utilization
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Faculty Workload
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
