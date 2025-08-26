"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  MapPin,
  Users,
  BookOpen
} from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "exam" | "registration" | "holiday" | "meeting" | "deadline"
  location?: string
  description?: string
}

export function ViewFullCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Fall Semester Registration Opens",
      date: "2024-01-15",
      time: "09:00",
      type: "registration",
      description: "Registration period begins for all students"
    },
    {
      id: "2",
      title: "CS101 Midterm Exam",
      date: "2024-01-18",
      time: "14:00",
      type: "exam",
      location: "Hall A",
      description: "Computer Science midterm examination"
    },
    {
      id: "3",
      title: "Faculty Meeting",
      date: "2024-01-20",
      time: "10:00",
      type: "meeting",
      location: "Conference Room B",
      description: "Monthly faculty coordination meeting"
    },
    {
      id: "4",
      title: "MLK Day - University Holiday",
      date: "2024-01-21",
      time: "All Day",
      type: "holiday",
      description: "Martin Luther King Jr. Day - No classes"
    },
    {
      id: "5",
      title: "Course Drop Deadline",
      date: "2024-01-25",
      time: "23:59",
      type: "deadline",
      description: "Last day to drop courses without penalty"
    },
    {
      id: "6",
      title: "MATH201 Final Exam",
      date: "2024-01-28",
      time: "09:00",
      type: "exam",
      location: "Hall C",
      description: "Calculus II final examination"
    }
  ])

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const getEventsForDate = (day: number) => {
    if (!day) return []
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date === dateStr)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-700 border-red-200"
      case "registration":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "holiday":
        return "bg-green-100 text-green-700 border-green-200"
      case "meeting":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "deadline":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <BookOpen className="h-3 w-3" />
      case "registration":
        return <Users className="h-3 w-3" />
      case "meeting":
        return <Users className="h-3 w-3" />
      default:
        return <Calendar className="h-3 w-3" />
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="text-black text-lg font-bold">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Academic Calendar
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Calendar Event</DialogTitle>
                <DialogDescription>
                  Create a new academic calendar event.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Event Title" />
                <Input type="date" />
                <Input type="time" />
                <Input placeholder="Location (optional)" />
                <Textarea placeholder="Description (optional)" />
                <Button className="w-full bg-[#026892] hover:bg-[#024f70] text-white">
                  Add Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Calendar Navigation */}
        <div className="flex items-center text-[#026892] justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("prev")}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <h2 className="text-xl font-semibold text-[#026892]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("next")}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {daysOfWeek.map(day => (
            <div key={day} className="p-2 text-center font-semibold text-black bg-gray-50 rounded">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : []
            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-gray-200 rounded ${
                  day ? "bg-white hover:bg-gray-50" : "bg-gray-100"
                }`}
              >
                {day && (
                  <>
                    <div className="font-medium text-sm mb-1">{day}</div>
                    <div className="space-y-1">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border ${getEventTypeColor(event.type)}`}
                        >
                          <div className="flex items-center gap-1">
                            {getEventIcon(event.type)}
                            <span className="truncate">{event.title}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-2 w-2" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Upcoming Events */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#026892] mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded ${getEventTypeColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Event Types</h4>
          <div className="flex flex-wrap gap-3">
            {[
              { type: "exam", label: "Exams" },
              { type: "registration", label: "Registration" },
              { type: "holiday", label: "Holidays" },
              { type: "meeting", label: "Meetings" },
              { type: "deadline", label: "Deadlines" }
            ].map(({ type, label }) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded border ${getEventTypeColor(type)}`}></div>
                <span className="text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
