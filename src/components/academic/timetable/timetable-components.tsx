import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  Eye,
  MoreHorizontal
} from "lucide-react"

// Enhanced Timetable Component with Weekly View
export function WeeklyTimetable() {
  const timeSlots = [
    "08:00-09:00",
    "09:00-10:00", 
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00"
  ]

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const timetableData = [
    {
      time: "08:00-09:00",
      monday: { course: "Computer Science & Mathematics", instructor: "Dr. Smith", room: "LH - 101", level: "L2", color: "bg-blue-100 border-blue-300 text-blue-800" },
      tuesday: { course: "Data Structures Tech", instructor: "Prof. Johnson", room: "LH - 102", level: "L2", color: "bg-green-100 border-green-300 text-green-800" },
      wednesday: { course: "Database Systems", instructor: "Dr. Brown", room: "LH - 103", level: "L3", color: "bg-purple-100 border-purple-300 text-purple-800" },
      thursday: { course: "Software Engineering & Information", instructor: "Dr. Davis", room: "LH - 104", level: "L3", color: "bg-orange-100 border-orange-300 text-orange-800" },
      friday: { course: "Computer Science Tech & Information", instructor: "Prof. Wilson", room: "LAB - 201", level: "L2", color: "bg-indigo-100 border-indigo-300 text-indigo-800" }
    },
    {
      time: "09:00-10:00",
      monday: { course: "Calculus", instructor: "Dr. Taylor", room: "LH - 105", level: "L1", color: "bg-cyan-100 border-cyan-300 text-cyan-800" },
      tuesday: { course: "Organic Chemistry", instructor: "Prof. Anderson", room: "LAB - 301", level: "L2", color: "bg-pink-100 border-pink-300 text-pink-800" },
      wednesday: { course: "Quantum Physics", instructor: "Dr. Thomas", room: "LH - 203", level: "L3", color: "bg-teal-100 border-teal-300 text-teal-800" },
      thursday: { course: "Biochemistry", instructor: "Dr. Jackson", room: "LAB - 302", level: "L2", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
      friday: { course: "Genetics", instructor: "Prof. White", room: "LAB - 303", level: "L3", color: "bg-red-100 border-red-300 text-red-800" }
    },
    {
      time: "10:00-11:00",
      monday: { course: "Physics", instructor: "Dr. Miller", room: "LH - 106", level: "L1", color: "bg-emerald-100 border-emerald-300 text-emerald-800" },
      tuesday: { course: "Statistics", instructor: "Prof. Garcia", room: "LH - 107", level: "L2", color: "bg-violet-100 border-violet-300 text-violet-800" },
      wednesday: { course: "Algebra", instructor: "Dr. Martinez", room: "LH - 108", level: "L1", color: "bg-amber-100 border-amber-300 text-amber-800" },
      thursday: { course: "History", instructor: "Dr. Rodriguez", room: "LH - 109", level: "L3", color: "bg-lime-100 border-lime-300 text-lime-800" },
      friday: { course: "Ethics", instructor: "Prof. Lee", room: "LH - 110", level: "L2", color: "bg-rose-100 border-rose-300 text-rose-800" }
    },
    {
      time: "11:00-12:00",
      monday: null,
      tuesday: { course: "PHYSICS", instructor: "Dr. Chen", room: "LAB - 304", level: "L2", color: "bg-sky-100 border-sky-300 text-sky-800" },
      wednesday: { course: "SYSTEMS", instructor: "Prof. Kim", room: "LH - 111", level: "L3", color: "bg-stone-100 border-stone-300 text-stone-800" },
      thursday: { course: "SYSTEMS", instructor: "Dr. Park", room: "LH - 112", level: "L3", color: "bg-neutral-100 border-neutral-300 text-neutral-800" },
      friday: null
    },
    {
      time: "12:00-13:00",
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null
    },
    {
      time: "13:00-14:00",
      monday: { course: "SPEECH", instructor: "Dr. Johnson", room: "LH - 113", level: "L1", color: "bg-blue-100 border-blue-300 text-blue-800" },
      tuesday: { course: "PHYSICS", instructor: "Prof. Williams", room: "LAB - 305", level: "L2", color: "bg-green-100 border-green-300 text-green-800" },
      wednesday: { course: "HISTORY", instructor: "Dr. Brown", room: "LH - 114", level: "L3", color: "bg-purple-100 border-purple-300 text-purple-800" },
      thursday: { course: "SYSTEMS", instructor: "Prof. Davis", room: "LH - 115", level: "L3", color: "bg-orange-100 border-orange-300 text-orange-800" },
      friday: null
    },
    {
      time: "14:00-15:00",
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null
    },
    {
      time: "15:00-16:00",
      monday: { course: "HISTORY", instructor: "Dr. Miller", room: "LH - 116", level: "L2", color: "bg-cyan-100 border-cyan-300 text-cyan-800" },
      tuesday: null,
      wednesday: { course: "HISTORY", instructor: "Prof. Garcia", room: "LH - 117", level: "L3", color: "bg-pink-100 border-pink-300 text-pink-800" },
      thursday: { course: "Reading Software's", instructor: "Dr. Martinez", room: "LAB - 306", level: "L1", color: "bg-teal-100 border-teal-300 text-teal-800" },
      friday: { course: "HISTORY", instructor: "Prof. Rodriguez", room: "LH - 118", level: "L2", color: "bg-yellow-100 border-yellow-300 text-yellow-800" }
    },
    {
      time: "16:00-18:00",
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null
    }
  ]

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Weekly Timetable - Current Semester</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium text-sm w-24">Time</th>
                {weekDays.map((day) => (
                  <th key={day} className="text-left p-3 font-medium text-sm min-w-48">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetableData.map((slot, index) => (
                <tr key={index} className="border-b hover:bg-gray-50/50">
                  <td className="p-3 font-medium text-xs text-gray-600 align-top">{slot.time}</td>
                  {weekDays.map((day) => {
                    const dayKey = day.toLowerCase() as keyof typeof slot
                    const courseData = slot[dayKey] as any
                    
                    if (!courseData) {
                      return <td key={day} className="p-3 align-top"></td>
                    }

                    return (
                      <td key={day} className="p-3 align-top">
                        <div className={`border rounded-md p-2 text-xs ${courseData.color}`}>
                          <div className="font-medium mb-1 leading-tight">{courseData.course}</div>
                          <div className="text-xs opacity-90 mb-1">@ {courseData.instructor}</div>
                          <div className="text-xs opacity-80 mb-2">{courseData.room}</div>
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-auto">
                            {courseData.level}
                          </Badge>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Room Utilization Component
export function RoomUtilization() {
  const rooms = [
    { name: "LH Building Hall 1", utilization: 85, status: "occupied", hours: "Mon-Fri: 8:00AM - 5:00PM" },
    { name: "LH Building Hall 2", utilization: 92, status: "occupied", hours: "Mon-Fri: 8:00AM - 5:00PM" },
    { name: "ENGENIUS LAB", utilization: 68, status: "available", hours: "Mon-Fri: 8:00AM - 5:00PM" },
    { name: "LIT Building LT1", utilization: 75, status: "occupied", hours: "Mon-Fri: 8:00AM - 5:00PM" },
    { name: "LIT Building LT2", utilization: 60, status: "available", hours: "Mon-Fri: 8:00AM - 5:00PM" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Room Utilization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rooms.map((room, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-sm">{room.name}</div>
                <div className="text-xs text-gray-500">{room.hours}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{room.utilization}%</span>
                <Button size="sm" variant="outline" className="h-7 px-2">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress 
                value={room.utilization} 
                className="flex-1 h-2" 
              />
              <Badge 
                variant={room.utilization > 80 ? "destructive" : room.utilization > 60 ? "default" : "secondary"}
                className="text-xs"
              >
                {room.utilization > 80 ? "High" : room.utilization > 60 ? "Medium" : "Low"}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Instructor Teaching Load Component
export function InstructorTeachingLoad() {
  const instructors = [
    { name: "Dr. Smith Johnson", courses: 4, load: "Normal", department: "Computer Science" },
    { name: "Dr. John Francis Collins", courses: 6, load: "High", department: "Mathematics" },
    { name: "Dr. Samara DAVIS BROOKS", courses: 3, load: "Low", department: "Physics" },
    { name: "Dr. Michael WILLIAMS", courses: 5, load: "Normal", department: "Chemistry" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Instructor Teaching Load</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {instructors.map((instructor, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-sm">{instructor.name}</div>
              <div className="text-xs text-gray-500">{instructor.courses} courses • {instructor.department}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={instructor.load === "High" ? "destructive" : instructor.load === "Low" ? "secondary" : "default"}
                className="text-xs"
              >
                {instructor.load}
              </Badge>
              <Button size="sm" variant="outline" className="h-7 px-2">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Scheduling Conflicts Component
export function SchedulingConflicts() {
  const conflicts = [
    {
      type: "Room Conflict",
      priority: "High",
      description: "LIT/PHYS Area 5-8 Double-booked on Monday 10:00-12:00",
      affected: "Affected Courses: PHYSICS-QUIMICA",
      status: "unresolved"
    },
    {
      type: "Instructor Conflict", 
      priority: "High",
      description: "Mr. Brown MOTOYUALA scheduled in two courses simultaneously",
      affected: "",
      status: "unresolved"
    },
    {
      type: "Capacity Issue",
      priority: "Medium", 
      description: "ENGENIUS Clinic overcrowded (16 capacity, 25 students)",
      affected: "Affected Courses: QUIMICA",
      status: "unresolved"
    },
    {
      type: "Time Preference",
      priority: "Low",
      description: "Late lesson scheduled during lunch break",
      affected: "",
      status: "unresolved"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Scheduling Conflicts & Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {conflicts.map((conflict, index) => (
            <div key={index} className="border border-red-200 bg-red-50 rounded-md p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant={conflict.priority === "High" ? "destructive" : conflict.priority === "Medium" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {conflict.priority} Priority
                    </Badge>
                    <span className="text-sm font-medium">{conflict.type}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">{conflict.description}</div>
                  {conflict.affected && (
                    <div className="text-xs text-gray-600">{conflict.affected}</div>
                  )}
                </div>
                <Button size="sm" variant="outline" className="ml-3">
                  Resolve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
