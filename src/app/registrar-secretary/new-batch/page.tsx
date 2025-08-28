"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { 
  ArrowLeft,
  Upload,
  Users,
  Calendar,
  Printer,
  FileText,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
  Eye
} from "lucide-react"

export default function NewBatchPage() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [batchType, setBatchType] = useState("")
  const [priority, setPriority] = useState("")
  const [department, setDepartment] = useState("")

  // Sample student data
  const students = [
    { id: "2024001", name: "John Doe", program: "Computer Science", year: "1st Year", status: "New" },
    { id: "2024002", name: "Jane Smith", program: "Business Administration", year: "2nd Year", status: "New" },
    { id: "2024003", name: "Mike Johnson", program: "Engineering", year: "3rd Year", status: "Replacement" },
    { id: "2024004", name: "Sarah Wilson", program: "Nursing", year: "1st Year", status: "New" },
    { id: "2024005", name: "David Brown", program: "Computer Science", year: "4th Year", status: "New" },
  ]

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleSubmit = () => {
    // Handle batch creation
    console.log({
      batchType,
      priority,
      department,
      students: selectedStudents,
      totalCards: selectedStudents.length
    })
    // Redirect to production page
    window.location.href = '/registrar-secretary/card-production'
  }

  return (
    <RegistrarLayout role="registrar-secretary" title="New Batch">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.history.back()}
            className="border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#026892]">Create New Card Production Batch</h1>
            <p className="text-sm text-gray-600 mt-1">Setup a new batch for student ID card production</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Batch Details</TabsTrigger>
                <TabsTrigger value="students">Select Students</TabsTrigger>
                <TabsTrigger value="review">Review & Submit</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#026892]">Batch Information</CardTitle>
                    <CardDescription>Configure the basic details for this production batch</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="batchType">Batch Type</Label>
                        <Select value={batchType} onValueChange={setBatchType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select batch type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new-students">New Students</SelectItem>
                            <SelectItem value="continuing-students">Continuing Students</SelectItem>
                            <SelectItem value="staff-cards">Staff Cards</SelectItem>
                            <SelectItem value="replacements">Replacements</SelectItem>
                            <SelectItem value="visitor-cards">Visitor Cards</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority Level</Label>
                        <Select value={priority} onValueChange={setPriority}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent (Same Day)</SelectItem>
                            <SelectItem value="high">High (1-2 Days)</SelectItem>
                            <SelectItem value="normal">Normal (3-5 Days)</SelectItem>
                            <SelectItem value="low">Low (1 Week)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department/College</Label>
                      <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">College of Engineering</SelectItem>
                          <SelectItem value="business">College of Business</SelectItem>
                          <SelectItem value="nursing">College of Nursing</SelectItem>
                          <SelectItem value="computer-science">Computer Science Department</SelectItem>
                          <SelectItem value="administration">Administration</SelectItem>
                          <SelectItem value="multiple">Multiple Departments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedCompletion">Estimated Completion Date</Label>
                      <Input 
                        type="date" 
                        id="estimatedCompletion"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea 
                        id="notes"
                        placeholder="Any special instructions or notes for this batch..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="students" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-[#026892]">Select Students</CardTitle>
                        <CardDescription>Choose students for this production batch</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
                          <Upload className="h-4 w-4 mr-2" />
                          Import CSV
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Manual
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Search and Filter */}
                      <div className="flex gap-4">
                        <Input 
                          placeholder="Search by student ID or name..." 
                          className="flex-1"
                        />
                        <Select>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Filter by program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Programs</SelectItem>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="business">Business Admin</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="nursing">Nursing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Student List */}
                      <div className="border rounded-lg">
                        <div className="p-3 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Students ({students.length})</span>
                            <span className="text-sm text-gray-600">
                              Selected: {selectedStudents.length}
                            </span>
                          </div>
                        </div>
                        <div className="divide-y">
                          {students.map((student, index) => (
                            <div key={index} className="p-3 hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={selectedStudents.includes(student.id)}
                                  onChange={() => handleStudentToggle(student.id)}
                                  className="w-4 h-4 text-[#026892] border-gray-300 rounded focus:ring-[#026892]"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{student.name}</span>
                                    <Badge variant={student.status === "New" ? "default" : "secondary"}>
                                      {student.status}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    ID: {student.id} • {student.program} • {student.year}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="review" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#026892]">Review Batch Details</CardTitle>
                    <CardDescription>Review all information before creating the batch</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Batch Type</Label>
                          <p className="text-sm font-medium">{batchType || "Not selected"}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Priority Level</Label>
                          <p className="text-sm font-medium">{priority || "Not selected"}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Department</Label>
                          <p className="text-sm font-medium">{department || "Not selected"}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Total Students</Label>
                          <p className="text-sm font-medium">{selectedStudents.length} students</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Estimated Production Time</Label>
                          <p className="text-sm font-medium">
                            {priority === "urgent" ? "Same Day" : 
                             priority === "high" ? "1-2 Days" :
                             priority === "normal" ? "3-5 Days" : "1 Week"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Selected Students</Label>
                      <div className="max-h-40 overflow-y-auto border rounded-lg">
                        {selectedStudents.length > 0 ? (
                          <div className="divide-y">
                            {students
                              .filter(student => selectedStudents.includes(student.id))
                              .map((student, index) => (
                                <div key={index} className="p-2 text-sm">
                                  <span className="font-medium">{student.name}</span>
                                  <span className="text-gray-600 ml-2">({student.id})</span>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500 text-sm">
                            No students selected
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => window.history.back()}>
                        Cancel
                      </Button>
                      <Button 
                        className="bg-[#026892] hover:bg-[#025078]"
                        onClick={handleSubmit}
                        disabled={!batchType || !priority || selectedStudents.length === 0}
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Create Batch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Batch Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#026892]">Batch Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Cards</span>
                  <span className="font-semibold text-[#026892]">{selectedStudents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Batch Type</span>
                  <span className="text-sm font-medium">{batchType || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Priority</span>
                  <span className="text-sm font-medium">{priority || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Department</span>
                  <span className="text-sm font-medium">{department || "—"}</span>
                </div>
              </CardContent>
            </Card>

            {/* Production Guidelines */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#026892]">Production Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Student photos must be uploaded</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">All student information verified</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Urgent batches processed first</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Quality check required before delivery</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#026892]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10"
                  onClick={() => window.location.href = '/registrar-secretary/card-production'}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Current Batches
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10"
                  onClick={() => window.location.href = '/registrar-secretary/reports'}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Production Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RegistrarLayout>
  )
}
