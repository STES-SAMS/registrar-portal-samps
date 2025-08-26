"use client"

import React, { useState } from "react"
import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Users, 
  Calendar,
  Building,
  CalendarDays,
  Clock,
  CheckCircle,
  GraduationCap,
  ClipboardList,
  UserCheck,
  BarChart3,
  ArrowLeft
} from "lucide-react"
import { 
  ManageCourses, 
  ViewFullCalendar, 
  CourseCatalog, 
  ManageFaculty, 
  ManageSchedules
} from "@/components/registrar/academic-admin"

export default function AcademicAdmin() {
  const [activeComponent, setActiveComponent] = useState<string>("dashboard")

  const stats = [
    { 
      title: "Active Courses", 
      value: "245", 
      color: "#10b981", 
      icon: BookOpen,
      bgColor: "#10b981"
    },
    { 
      title: "Faculty Members", 
      value: "89", 
      color: "#3b82f6", 
      icon: Users,
      bgColor: "#3b82f6"
    },
    { 
      title: "Academic Programs", 
      value: "15", 
      color: "#8b5cf6", 
      icon: Calendar,
      bgColor: "#8b5cf6"
    },
    { 
      title: "Departments", 
      value: "34", 
      color: "#f59e0b", 
      icon: Building,
      bgColor: "#f59e0b"
    },
  ]

  const componentOptions = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "manage-courses", label: "Manage Courses", icon: BookOpen },
    { id: "view-calendar", label: "View Full Calendar", icon: Calendar },
    { id: "course-catalog", label: "Course Catalog", icon: GraduationCap },
    { id: "manage-faculty", label: "Manage Faculty", icon: Users },
    { id: "manage-schedules", label: "Manage Schedules", icon: Clock },
  ]

  const courseManagement = [
    { title: "Course Registration", progress: 85, color: "#026892" },
    { title: "Faculty Assignment", progress: 92, color: "#026892" },
    { title: "Room Allocation", progress: 78, color: "#026892" },
  ]

  const academicCalendar = [
    {
      title: "Semester Start",
      date: "February 1, 2025",
      icon: CalendarDays,
      color: "#3b82f6"
    },
    {
      title: "Mid-term Exams",
      date: "March 15-22, 2025",
      icon: Clock,
      color: "#f59e0b"
    },
    {
      title: "Final Exams",
      date: "May 8-15, 2025",
      icon: CheckCircle,
      color: "#10b981"
    },
    {
      title: "Graduation",
      date: "May 25, 2025",
      icon: GraduationCap,
      color: "#8b5cf6"
    }
  ]

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "manage-courses":
        return <ManageCourses />
      case "view-calendar":
        return <ViewFullCalendar />
      case "course-catalog":
        return <CourseCatalog />
      case "manage-faculty":
        return <ManageFaculty />
      case "manage-schedules":
        return <ManageSchedules />
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  </div>
                  <div 
                    className="p-3 rounded-full" 
                    style={{ backgroundColor: `${stat.bgColor}20` }}
                  >
                    <IconComponent className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Course Management Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="text-black text-lg font-bold">
            <CardTitle>Course Management Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {courseManagement.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.title}</span>
                    <span className="text-sm text-gray-500">{item.progress}%</span>
                  </div>
                  <Progress 
                    value={item.progress} 
                    className="h-2"
                    style={{ 
                      backgroundColor: '#e5e7eb',
                    }}
                  />
                </div>
              ))}
              
              <div className="pt-4">
                <Button 
                  className="w-fit bg-[#026892] hover:bg-[#024f70] text-white font-medium"
                  onClick={() => setActiveComponent("manage-courses")}
                >
                  Manage Courses
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Calendar */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="text-black text-lg font-bold">
            <CardTitle>Academic Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {academicCalendar.map((event, index) => {
                const IconComponent = event.icon
                return (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div 
                      className="p-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: `${event.color}20` }}
                    >
                      <IconComponent className="h-4 w-4" style={{ color: event.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                )
              })}
              
              <div className="pt-4 flex flex-end ">
                <Button 
                  className="w-fit bg-[#026892] hover:bg-[#024f70] text-white font-medium"
                  onClick={() => setActiveComponent("view-calendar")}
                >
                  View Full Calendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#026892]"
          onClick={() => setActiveComponent("course-catalog")}
        >
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-[#026892] bg-opacity-10 w-fit mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-[#026892]" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Course Catalog</h3>
            <p className="text-gray-600 text-sm mb-4">Manage course offerings and prerequisites</p>
            <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
              Manage Catalog
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#026892]"
          onClick={() => setActiveComponent("manage-faculty")}
        >
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full  bg-opacity-10 w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-black" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Faculty Management</h3>
            <p className="text-gray-600 text-sm mb-4">Assign faculty to courses and departments</p>
            <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
              Manage Faculty
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#026892]"
          onClick={() => setActiveComponent("manage-schedules")}
        >
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-[#026892] bg-opacity-10 w-fit mx-auto mb-4">
              <Clock className="h-8 w-8 text-[#026892]" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Schedule Management</h3>
            <p className="text-gray-600 text-sm mb-4">Create and manage class schedules</p>
            <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
              Manage Schedules
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="text-black text-lg font-bold">
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="space-y-2">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-green-100">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Course CS301 assigned to Dr. Smith</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-blue-100">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Room A101 allocated for Mathematics course</p>
                <p className="text-sm text-gray-600">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-purple-100">
                <BookOpen className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">New academic program "Data Science" created</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <RegistrarLayout role="registrar">
      <div className="space-y-6">
        {/* Header with Component Navigation */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            {activeComponent !== "dashboard" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveComponent("dashboard")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Academic Administration
              </h1>
              <p className="text-gray-600">
                {activeComponent === "dashboard" 
                  ? "Manage courses, faculty, and academic programs" 
                  : componentOptions.find(opt => opt.id === activeComponent)?.label}
              </p>
            </div>
          </div>
          
          {activeComponent === "dashboard" && (
            <div className="flex flex-wrap gap-2">
              {componentOptions.slice(1).map((option) => {
                const IconComponent = option.icon
                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveComponent(option.id)}
                    className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
                  >
                    <IconComponent className="h-4 w-4" />
                    {option.label}
                  </Button>
                )
              })}
            </div>
          )}
        </div>

        {/* Render Active Component */}
        {renderActiveComponent()}
      </div>
    </RegistrarLayout>
  )
}
