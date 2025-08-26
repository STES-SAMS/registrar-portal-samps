"use client"

import { useState } from "react"
import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  Plus,
} from "lucide-react"
import {
  WeeklyTimetable,
  RoomUtilization,
  InstructorTeachingLoad,
  SchedulingConflicts
} from "@/components/academic"

// Filter options
const departments = [
  "All Departments",
  "Computer Science",
  "Information Technology", 
  "Business Administration",
  "Engineering",
  "Medicine",
  "Law"
]

const schools = [
  "All Schools",
  "School of Computing",
  "School of Business", 
  "School of Engineering",
  "School of Medicine",
  "School of Law"
]

const levels = [
  "All Levels",
  "Level 100",
  "Level 200",
  "Level 300", 
  "Level 400",
  "Postgraduate"
]

export default function TimetablePage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedSchool, setSelectedSchool] = useState("All Schools")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentView, setCurrentView] = useState("weekly")

  return (
    <RegistrarLayout role="registrar-academics" title="Timetable Management">
      <div className="space-y-6">
        {/* Header Description */}
        <div>
          <p className="text-gray-600">Manage course schedules, room assignments, and instructor allocations</p>
          <div className="flex items-center gap-3 mt-4">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold">234</p>
                </div>
                <Calendar className="h-8 w-8 text-[#3B82F6]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Rooms</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <MapPin className="h-8 w-8 text-[#10B981]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Instructors</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Users className="h-8 w-8 text-[#8B5CF6]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Room Availability</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <Clock className="h-8 w-8 text-[#F59E0B]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search courses, instructors, or rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select School" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>{school}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b pb-2">
          <Button
            variant={currentView === "weekly" ? "default" : "ghost"}
            onClick={() => setCurrentView("weekly")}
            size="sm"
          >
            Weekly Timetable
          </Button>
          <Button
            variant={currentView === "room" ? "default" : "ghost"}
            onClick={() => setCurrentView("room")}
            size="sm"
          >
            Room Availability
          </Button>
          <Button
            variant={currentView === "instructor" ? "default" : "ghost"}
            onClick={() => setCurrentView("instructor")}
            size="sm"
          >
            Instructor Load
          </Button>
        </div>

        {/* Main Layout */}
        <div className="space-y-6">
          {/* Weekly Timetable */}
          <WeeklyTimetable />
          
          {/* Room Utilization and Instructor Load */}
          <div className="grid grid-cols-2 gap-6">
            <RoomUtilization />
            <InstructorTeachingLoad />
          </div>

          {/* Scheduling Conflicts */}
          <SchedulingConflicts />
        </div>
      </div>
    </RegistrarLayout>
  )
}
