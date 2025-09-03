"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Save, 
  User, 
  GraduationCap, 
  FileText,
  Upload,
  X
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function EditApplication() {
  // Mock application data - in real app, this would come from params/API
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "City",
    state: "State",
    zipCode: "12345",
    dateOfBirth: "1995-06-15",
    nationality: "American",
    
    // Academic Information
    program: "Computer Science",
    degree: "Bachelor",
    gpa: "3.7",
    satScore: "1450",
    actScore: "32",
    
    // Application Details
    status: "Under Review",
    startDate: "2025-09-01",
    personalStatement: "I am passionate about computer science and technology...",
    
    // Emergency Contact
    emergencyName: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
    emergencyRelation: "Mother"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Save logic here
    console.log("Saving application data:", formData)
    alert("Application updated successfully!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review": return "#3b82f6"
      case "Approved": return "#10b981"
      case "Rejected": return "#ef4444"
      case "Pending": return "#f59e0b"
      case "Interview": return "#8b5cf6"
      default: return "#6b7280"
    }
  }

  return (
    <RegistrarLayout role="registrar" title="Edit Application">
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center">
          <Link href="/registrar/admissions/APP001">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white font-medium shadow-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Details
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Edit Application</h1>
              <p className="text-gray-600 font-medium">Application ID: <span className="text-[#026892] font-semibold">APP001</span></p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/registrar/admissions/APP001">
                <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-white">
                  Cancel
                </Button>
              </Link>
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

        {/* Current Status */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="text-black font-bold text-lg">
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-black uppercase tracking-wide">Current Status</Label>
                <div className="mt-2">
                  <Badge 
                    variant="secondary" 
                    style={{ 
                      backgroundColor: `${getStatusColor(formData.status)}20`, 
                      color: getStatusColor(formData.status),
                      border: `1px solid ${getStatusColor(formData.status)}40`
                    }}
                  >
                    {formData.status}
                  </Badge>
                </div>
              </div>
              <div className="w-64">
                <Label className="text-sm font-semibold text-black uppercase tracking-wide">Change Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="text-lg font-bold text-black">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-semibold text-black uppercase tracking-wide">First Name</Label>
                <Input 
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-semibold text-black uppercase tracking-wide">Last Name</Label>
                <Input 
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-black uppercase tracking-wide">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-black uppercase tracking-wide">Phone Number</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-sm font-semibold text-black uppercase tracking-wide">Address</Label>
              <Input 
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm font-semibold text-black uppercase tracking-wide">City</Label>
                <Input 
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm font-semibold text-black uppercase tracking-wide">State</Label>
                <Input 
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-sm font-semibold text-black uppercase tracking-wide">ZIP Code</Label>
                <Input 
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-black uppercase tracking-wide">Date of Birth</Label>
                <Input 
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
              <div>
                <Label htmlFor="nationality" className="text-sm font-semibold text-black uppercase tracking-wide">Nationality</Label>
                <Input 
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="text-lg font-bold text-black">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="program" className="text-sm font-semibold text-black uppercase tracking-wide">Program</Label>
                <Select 
                  value={formData.program} 
                  onValueChange={(value) => handleInputChange("program", value)}
                >
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
                <Label htmlFor="degree" className="text-sm font-semibold text-black uppercase tracking-wide">Degree Level</Label>
                <Select 
                  value={formData.degree} 
                  onValueChange={(value) => handleInputChange("degree", value)}
                >
                  <SelectTrigger className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bachelor">Bachelor</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="gpa" className="text-sm font-semibold text-black uppercase tracking-wide">GPA</Label>
                <Input 
                  id="gpa"
                  type="number"
                  step="0.1"
                  max="4.0"
                  value={formData.gpa}
                  onChange={(e) => handleInputChange("gpa", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
              <div>
                <Label htmlFor="satScore" className="text-sm font-semibold text-black uppercase tracking-wide">SAT Score</Label>
                <Input 
                  id="satScore"
                  type="number"
                  value={formData.satScore}
                  onChange={(e) => handleInputChange("satScore", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
              <div>
                <Label htmlFor="actScore" className="text-sm font-semibold text-black uppercase tracking-wide">ACT Score</Label>
                <Input 
                  id="actScore"
                  type="number"
                  value={formData.actScore}
                  onChange={(e) => handleInputChange("actScore", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="startDate" className="text-sm font-semibold text-black uppercase tracking-wide">Expected Start Date</Label>
              <Input 
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Personal Statement */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="text-lg font-bold text-black">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Personal Statement
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div>
              <Label htmlFor="personalStatement" className="text-sm font-semibold text-black uppercase tracking-wide">Personal Statement</Label>
              <Textarea 
                id="personalStatement"
                rows={6}
                value={formData.personalStatement}
                onChange={(e) => handleInputChange("personalStatement", e.target.value)}
                placeholder="Enter personal statement..."
                className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="text-lg font-bold text-black">
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyName" className="text-sm font-semibold text-black uppercase tracking-wide">Contact Name</Label>
                <Input 
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone" className="text-sm font-semibold text-black uppercase tracking-wide">Contact Phone</Label>
                <Input 
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="emergencyRelation" className="text-sm font-semibold text-black uppercase tracking-wide">Relationship</Label>
              <Input 
                id="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={(e) => handleInputChange("emergencyRelation", e.target.value)}
                className="mt-1 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents Upload */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="text-lg font-bold text-black">
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-[#026892] border-opacity-30 rounded-lg p-8 text-center bg-opacity-5 hover:bg-opacity-10 transition-colors">
                <Upload className="h-12 w-12 text-[#026892] mx-auto mb-4" />
                <p className="text-gray-700 mb-2 font-medium">Drop files here or click to browse</p>
                <Button variant="outline" className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white">
                  Upload Documents
                </Button>
              </div>
              
              <div className="text-sm text-gray-600 bg-white p-3 rounded-lg">
                <p className="font-medium text-[#026892] mb-1">Supported formats:</p>
                <p>PDF, DOC, DOCX (Max size: 10MB per file)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Actions */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-[#026892] mb-2">Save Changes</h3>
                <p className="text-gray-600">Review all information before saving the application</p>
              </div>
              <div className="flex gap-3">
                <Link href="/registrar/admissions/APP001">
                  <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-white font-medium">
                    Cancel Changes
                  </Button>
                </Link>
                <Button variant="outline" className="text-[#026892] border-[#026892] hover:bg-[#026892] hover:text-white font-medium">
                  Save as Draft
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-[#026892] hover:bg-[#024f70] text-white flex items-center gap-2 font-medium shadow-md"
                >
                  <Save className="h-4 w-4" />
                  Save Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RegistrarLayout>
  )
}
