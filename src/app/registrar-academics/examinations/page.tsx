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
  FileText,
  MapPin,
  Users,
  Search,
  Filter,
  Plus,
  Download
} from "lucide-react"
import {
  ExaminationSchedule,
  ExamRoomUtilization,
  ExaminerWorkload
} from "@/components/academic"

// Filter options
const departments = [
  "All Departments",
  "SABE",
  "Computer Science",
  "Information Technology",
  "Business Administration",
  "Engineering",
  "Medicine"
]

const dateRanges = [
  "All Dates",
  "This Week",
  "Next Week",
  "This Month",
  "Next Month",
  "Custom Range"
]

export default function ExaminationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedDateRange, setSelectedDateRange] = useState("All Dates")

  return (
    <RegistrarLayout role="registrar-academics" title="Examination Management">
      <div className="space-y-6">
        {/* Header Description */}
        <div>
          <p className="text-gray-600">Schedule and manage examinations across all departments</p>
          <div className="flex items-center gap-3 mt-4">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Schedule
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Exam
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Exams</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <FileText className="h-8 w-8 text-[#3B82F6]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <Calendar className="h-8 w-8 text-[#10B981]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <Users className="h-8 w-8 text-[#8B5CF6]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Exam Venues</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <MapPin className="h-8 w-8 text-[#F59E0B]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by module, room, or examiner..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Examination Schedule */}
          <ExaminationSchedule />
          
          {/* Room Utilization and Examiner Workload */}
          <div className="grid grid-cols-2 gap-6">
            <ExamRoomUtilization />
            <ExaminerWorkload />
          </div>
        </div>
      </div>
    </RegistrarLayout>
  )
}
