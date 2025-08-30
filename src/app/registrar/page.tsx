"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  Plus,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"

export default function RegistrarDashboard() {
  const stats = [
    { title: "Total Students", value: "12,347", subtitle: "+5% from last year", icon: Users, color: "#3b82f6" },
    { title: "Faculty Members", value: "789", subtitle: "+3% from last year", icon: GraduationCap, color: "#10b981" },
    { title: "Active Courses", value: "1,247", subtitle: "Current semester", icon: BookOpen, color: "#8b5cf6" },
  ]

  const recentActivities = [
    { title: "New student registration completed", time: "2 minutes ago", icon: CheckCircle, color: "#10b981" },
    { title: "Course enrollment updated", time: "15 minutes ago", icon: BookOpen, color: "#026892" },
    { title: "Academic calendar event added", time: "1 hour ago", icon: Calendar, color: "#f59e0b" },
  ]

  const alerts = [
    { title: "Registration deadline approaching", subtitle: "Due in 3 days", icon: AlertCircle, color: "#ef4444" },
    { title: "Course capacity reached", subtitle: "CS101 - Introduction to Computer Science", icon: Users, color: "#f59e0b" },
    { title: "New applications pending review", subtitle: "5 applications awaiting approval", icon: Clock, color: "#026892" },
  ]

  return (
    <RegistrarLayout role="registrar" title="Dashboard">
      {/* Dashboard Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Registrar Dashboard</h1>
        <p className="text-gray-600">Executive overview and institutional management</p>
      </div>

            {/* Top Actions */}
            <div className="flex justify-end gap-3 mb-6">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                View Full Calendar
              </Button>
              <Button className="bg-[#026892] hover:bg-[#0284c7] text-white flex items-center gap-2">
                New Student
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <Card key={index} className="bg-white border-0 shadow-sm">
                    <CardContent className="">
                      <div className="h-20 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                          <div className="text-3xl font-bold" style={{ color: stat.color }}>
                            {stat.value}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                        </div>
                        <IconComponent className="h-8 w-8" style={{ color: stat.color }} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card className="h-25 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="text-center">
                  <Plus className="h-6 w-6 text-[#026892] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#026892]">Add Student</p>
                </CardContent>
              </Card>
              <Card className="h-25 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="text-center">
                  <BookOpen className="h-6 w-6 text-[#026892] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#026892]">Manage Courses</p>
                </CardContent>
              </Card>
              <Card className="h-25 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="text-center">
                  <Calendar className="h-6 w-6 text-[#026892] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#026892]">View Full Calendar</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Student Statistics */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#026892]" />
                    <CardTitle className="text-lg">Student Statistics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Enrollment Rate</span>
                      <span className="text-sm font-bold">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Retention Rate</span>
                      <span className="text-sm font-bold">91.8%</span>
                    </div>
                    <Progress value={91.8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Graduation Rate</span>
                      <span className="text-sm font-bold">87.5%</span>
                    </div>
                    <Progress value={87.5} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full text-[#026892] border-[#026892] hover:bg-[#0ea5e9] hover:text-white">
                    View All Student Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Academic Performance */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-[#026892]" />
                    <CardTitle className="text-lg">Academic Performance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Course Completion</span>
                      <span className="text-sm font-bold">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Average Pass Rate</span>
                      <span className="text-sm font-bold">89.7%</span>
                    </div>
                    <Progress value={89.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Faculty Satisfaction</span>
                      <span className="text-sm font-bold">87.5%</span>
                    </div>
                    <Progress value={87.5} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full text-[#026892] border-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white">
                    View All Academic Reports
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Section - Recent Activities and Important Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#10b981]" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#10b981] rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Important Alerts */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-[#f59e0b]" />
                    Important Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: `${alert.color}0a` }}>
                        <alert.icon className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: alert.color }} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                          <p className="text-xs text-gray-500">{alert.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
    </RegistrarLayout>
  )
}