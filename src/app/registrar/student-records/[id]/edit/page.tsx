"use client"

import React, { useState } from "react"
import Link from "next/link"
import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  Save, 
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Upload
} from "lucide-react"

export default function EditStudent() {
  // Mock student data - in real app, this would come from params/API
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Campus Drive, University City, State 12345",
    dateOfBirth: "2002-03-15",
    emergencyContact: "+1 (555) 987-6543",
    emergencyContactName: "Mary Johnson",
    
    // Academic Information
    studentId: "STU001",
    program: "Computer Science",
    degree: "Bachelor of Science",
    year: "3rd Year",
    semester: "Fall 2025",
    advisor: "Dr. Sarah Wilson",
    expectedGraduation: "2026-05-15",
    enrollmentStatus: "Full-time",
    academicStatus: "Active",
    
    // Additional Information
    gpa: "3.8",
    credits: "98",
    notes: "High-performing student with excellent academic record."
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to an API
    console.log("Saving student data:", formData)
    // Show success message or redirect
  }

  return (
    <RegistrarLayout role="registrar" title="Edit Student Record">
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center">
          <Link href="/registrar/student-records/STU001">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white font-medium shadow-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Student Details
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#026892] mb-2">Edit Student Record</h1>
              <p className="text-gray-600 font-medium">Student ID: <span className="text-[#026892] font-semibold">{formData.studentId}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-600 hover:bg-white">
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-[#026892] hover:bg-[#024f70] text-white flex items-center gap-2 shadow-md"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-semibold text-black uppercase tracking-wide">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-semibold text-black uppercase tracking-wide">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-black uppercase tracking-wide flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-black uppercase tracking-wide flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-semibold text-black uppercase tracking-wide flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-black uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContactName" className="text-sm font-semibold text-black uppercase tracking-wide">
                    Emergency Contact Name
                  </Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact" className="text-sm font-semibold text-black uppercase tracking-wide">
                    Emergency Contact Phone
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <Label htmlFor="program" className="text-sm font-semibold text-black uppercase tracking-wide">
                  Program
                </Label>
                <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                  <SelectTrigger className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Business Administration">Business Administration</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="degree" className="text-sm font-semibold text-black uppercase tracking-wide">
                  Degree Type
                </Label>
                <Select value={formData.degree} onValueChange={(value) => handleInputChange('degree', value)}>
                  <SelectTrigger className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bachelor of Science">Bachelor of Science</SelectItem>
                    <SelectItem value="Bachelor of Arts">Bachelor of Arts</SelectItem>
                    <SelectItem value="Master of Science">Master of Science</SelectItem>
                    <SelectItem value="Master of Arts">Master of Arts</SelectItem>
                    <SelectItem value="Doctor of Philosophy">Doctor of Philosophy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year" className="text-sm font-semibold text-black uppercase tracking-wide">
                    Academic Year
                  </Label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                      <SelectItem value="5th Year">5th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="semester" className="text-sm font-semibold text-black uppercase tracking-wide">
                    Current Semester
                  </Label>
                  <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                      <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                      <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="advisor" className="text-sm font-semibold text-black uppercase tracking-wide">
                  Academic Advisor
                </Label>
                <Input
                  id="advisor"
                  value={formData.advisor}
                  onChange={(e) => handleInputChange('advisor', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>

              <div>
                <Label htmlFor="expectedGraduation" className="text-sm font-semibold text-black uppercase tracking-wide">
                  Expected Graduation
                </Label>
                <Input
                  id="expectedGraduation"
                  type="date"
                  value={formData.expectedGraduation}
                  onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="enrollmentStatus" className="text-sm font-semibold text-black uppercase tracking-wide">
                    Enrollment Status
                  </Label>
                  <Select value={formData.enrollmentStatus} onValueChange={(value) => handleInputChange('enrollmentStatus', value)}>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Leave of Absence">Leave of Absence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="academicStatus" className="text-sm font-semibold text-black uppercase tracking-wide">
                    Academic Status
                  </Label>
                  <Select value={formData.academicStatus} onValueChange={(value) => handleInputChange('academicStatus', value)}>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Probation">Academic Probation</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                      <SelectItem value="Graduated">Graduated</SelectItem>
                      <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Academic Performance and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Academic Performance */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="text-black font-bold text-lg">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Academic Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gpa" className="text-sm font-semibold text-black uppercase tracking-wide">
                    Current GPA
                  </Label>
                  <Input
                    id="gpa"
                    value={formData.gpa}
                    onChange={(e) => handleInputChange('gpa', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                    placeholder="3.8"
                  />
                </div>
                <div>
                  <Label htmlFor="credits" className="text-sm  text-black uppercase tracking-wide">
                    Credits Earned
                  </Label>
                  <Input
                    id="credits"
                    value={formData.credits}
                    onChange={(e) => handleInputChange('credits', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                    placeholder="98"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="font-bold text-lg-black">
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <Label htmlFor="notes" className="text-sm  text-black uppercase tracking-wide">
                  Student Notes
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                  rows={6}
                  placeholder="Add any additional notes about the student..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Upload Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="text-black font-bold text-lg">
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Document Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center gap-2 p-4 h-auto border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                <Upload className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Upload Transcript</div>
                  <div className="text-sm opacity-70">Official academic record</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 p-4 h-auto border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                <Upload className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Upload Photo</div>
                  <div className="text-sm opacity-70">Student ID photo</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 p-4 h-auto border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                <Upload className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Upload Documents</div>
                  <div className="text-sm opacity-70">Additional files</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Actions */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-[#026892] mb-2">Save Changes</h3>
                <p className="text-gray-600">Review all information before saving</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-white font-medium">
                  Cancel Changes
                </Button>
                <Button variant="outline" className="text-[#026892] border-[#026892] hover:bg-[#026892] hover:text-white font-medium">
                  Save as Draft
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-[#026892] hover:bg-[#024f70] text-white font-medium shadow-md"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RegistrarLayout>
  )
}
