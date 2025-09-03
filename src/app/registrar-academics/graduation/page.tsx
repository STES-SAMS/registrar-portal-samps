"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Calendar,
  FileText,
  Search,
  Download,
  Plus,
  Edit,
  CheckCircle,
  AlertTriangle,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react"
import { RegistrarLayout } from "@/components/registrar"

export default function GraduationPage() {
  const [selectedView, setSelectedView] = useState("candidates")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for graduation statistics
  const graduationStats = {
    totalCandidates: 856,
    eligibleCandidates: 742,
    pendingClearance: 89,
    certificatesReady: 653,
    ceremonyAttendees: 680,
    completionRate: 87,
  }

  // Mock data for graduation candidates
  const graduationCandidates = [
    {
      id: 1,
      studentId: "ST2020001",
      name: "John Doe",
      program: "Bachelor of Computer Science",
      gpa: 3.85,
      creditsCompleted: 120,
      creditsRequired: 120,
      financialClearance: "Cleared",
      libraryStatus: "Cleared",
      academicStatus: "Eligible",
      overallStatus: "Ready for Graduation",
      expectedGraduation: "2024-05-15",
    },
    {
      id: 2,
      studentId: "ST2020002",
      name: "Jane Smith",
      program: "Bachelor of Mathematics",
      gpa: 3.92,
      creditsCompleted: 118,
      creditsRequired: 120,
      financialClearance: "Cleared",
      libraryStatus: "Pending",
      academicStatus: "Pending Credits",
      overallStatus: "Under Review",
      expectedGraduation: "2024-05-15",
    },
    {
      id: 3,
      studentId: "ST2020003",
      name: "Mike Johnson",
      program: "Bachelor of Physics",
      gpa: 3.67,
      creditsCompleted: 120,
      creditsRequired: 120,
      financialClearance: "Outstanding",
      libraryStatus: "Cleared",
      academicStatus: "Eligible",
      overallStatus: "Pending Clearance",
      expectedGraduation: "2024-05-15",
    },
    {
      id: 4,
      studentId: "ST2020004",
      name: "Sarah Wilson",
      program: "Bachelor of English Literature",
      gpa: 3.78,
      creditsCompleted: 120,
      creditsRequired: 120,
      financialClearance: "Cleared",
      libraryStatus: "Cleared",
      academicStatus: "Eligible",
      overallStatus: "Ready for Graduation",
      expectedGraduation: "2024-05-15",
    },
  ]

  // Mock data for ceremonies
  const ceremonies = [
    {
      id: 1,
      name: "Spring 2024 Graduation Ceremony",
      date: "2024-05-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      capacity: 1000,
      registeredAttendees: 680,
      programs: ["Computer Science", "Mathematics", "Physics"],
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Fall 2024 Graduation Ceremony",
      date: "2024-12-15",
      time: "2:00 PM",
      venue: "Sports Complex",
      capacity: 1500,
      registeredAttendees: 0,
      programs: ["Engineering", "Business", "Arts"],
      status: "Planning",
    },
  ]

  // Mock data for certificates
  const certificateProduction = [
    {
      program: "Bachelor of Computer Science",
      totalStudents: 145,
      certificatesProduced: 142,
      pendingProduction: 3,
      qualityChecked: 138,
      readyForDistribution: 135,
    },
    {
      program: "Bachelor of Mathematics",
      totalStudents: 89,
      certificatesProduced: 85,
      pendingProduction: 4,
      qualityChecked: 82,
      readyForDistribution: 80,
    },
    {
      program: "Bachelor of Physics",
      totalStudents: 67,
      certificatesProduced: 65,
      pendingProduction: 2,
      qualityChecked: 63,
      readyForDistribution: 61,
    },
  ]

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Ready for Graduation":
      case "Cleared":
      case "Eligible":
        return "bg-green-100 text-green-800"
      case "Under Review":
      case "Pending":
      case "Pending Credits":
      case "Pending Clearance":
        return "bg-yellow-100 text-yellow-800"
      case "Outstanding":
      case "Not Eligible":
        return "bg-red-100 text-red-800"
      case "Confirmed":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-white text-gray-800"
      default:
        return "bg-white text-gray-800"
    }
  }

  const getClearanceIcon = (status: string) => {
    switch (status) {
      case "Cleared":
      case "Eligible":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Pending":
      case "Outstanding":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <RegistrarLayout role="registrar-academics" title="Graduation Processing">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Graduation Processing</h1>
          <p className="text-gray-600">Manage graduation eligibility, ceremonies, and certificate production</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Graduation List
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Ceremony
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{graduationStats.totalCandidates}</div>
            <p className="text-xs text-gray-600">Reviewed for graduation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eligible</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{graduationStats.eligibleCandidates}</div>
            <p className="text-xs text-gray-600">Ready for graduation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Clearance</CardTitle>
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{graduationStats.pendingClearance}</div>
            <p className="text-xs text-gray-600">Awaiting clearance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Ready</CardTitle>
            <Award className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{graduationStats.certificatesReady}</div>
            <p className="text-xs text-gray-600">For distribution</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Graduation Processing Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Eligibility Review</span>
                <span>{graduationStats.completionRate}%</span>
              </div>
              <Progress value={graduationStats.completionRate} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Certificate Production</span>
                <span>76%</span>
              </div>
              <Progress value={76} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ceremony Registration</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="ceremonies">Ceremonies</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Graduation Candidates</CardTitle>
                  <CardDescription>Review and manage student graduation eligibility</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search candidates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Programs</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="english">English Literature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Academic Status</TableHead>
                    <TableHead>Clearances</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Overall Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {graduationCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{candidate.name}</div>
                          <div className="text-xs text-gray-600">{candidate.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{candidate.program}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getStatusBadgeColor(candidate.academicStatus)}>
                            {candidate.academicStatus}
                          </Badge>
                          <div className="text-xs text-gray-600">
                            {candidate.creditsCompleted}/{candidate.creditsRequired} credits
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs">
                            {getClearanceIcon(candidate.financialClearance)}
                            <span>Financial: {candidate.financialClearance}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            {getClearanceIcon(candidate.libraryStatus)}
                            <span>Library: {candidate.libraryStatus}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">{candidate.gpa}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(candidate.overallStatus)}>
                          {candidate.overallStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ceremonies Tab */}
        <TabsContent value="ceremonies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Graduation Ceremonies</span>
              </CardTitle>
              <CardDescription>Plan and manage graduation ceremonies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ceremonies.map((ceremony) => (
                  <Card key={ceremony.id} className="border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{ceremony.name}</CardTitle>
                          <CardDescription>
                            {ceremony.date} at {ceremony.time} • {ceremony.venue}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusBadgeColor(ceremony.status)}>{ceremony.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Attendance</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Registered:</span>
                              <span className="font-medium">{ceremony.registeredAttendees}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Capacity:</span>
                              <span className="font-medium">{ceremony.capacity}</span>
                            </div>
                            <Progress
                              value={(ceremony.registeredAttendees / ceremony.capacity) * 100}
                              className="h-2"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Programs</h4>
                          <div className="flex flex-wrap gap-1">
                            {ceremony.programs.map((program, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {program}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Actions</h4>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Users className="w-4 h-4 mr-1" />
                              Attendees
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4 mr-1" />
                              Program
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Certificate Production</span>
              </CardTitle>
              <CardDescription>Monitor certificate production and quality control</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Production Status</TableHead>
                    <TableHead>Quality Check</TableHead>
                    <TableHead>Ready for Distribution</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificateProduction.map((program, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{program.program}</TableCell>
                      <TableCell>{program.totalStudents}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Produced:</span>
                            <span>
                              {program.certificatesProduced}/{program.totalStudents}
                            </span>
                          </div>
                          <Progress
                            value={(program.certificatesProduced / program.totalStudents) * 100}
                            className="h-2"
                          />
                          {program.pendingProduction > 0 && (
                            <div className="text-xs text-yellow-600">{program.pendingProduction} pending</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{program.qualityChecked}</div>
                          <div className="text-xs text-gray-600">quality checked</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-green-600">{program.readyForDistribution}</div>
                          <div className="text-xs text-gray-600">ready</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Graduation Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-Time Graduation Rate</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Clearance Completion</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Certificate Production</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Program Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">145</div>
                    <div className="text-sm text-gray-600">Computer Science</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">89</div>
                    <div className="text-sm text-gray-600">Mathematics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">67</div>
                    <div className="text-sm text-gray-600">Physics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">52</div>
                    <div className="text-sm text-gray-600">English Literature</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clearance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Financial Clearance</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">742</div>
                      <div className="text-xs text-gray-600">cleared</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">Library Clearance</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">89</div>
                      <div className="text-xs text-gray-600">pending</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Academic Requirements</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">798</div>
                      <div className="text-xs text-gray-600">completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ceremony Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Venue Booking</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Registration</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Program Preparation</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </RegistrarLayout>
  )
}
