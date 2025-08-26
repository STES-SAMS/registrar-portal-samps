"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  AlertTriangle,
  User,
} from "lucide-react"

export default function VerificationPage() {
  const verificationQueue = [
    {
      cardId: "C2024-001156",
      studentId: "2024001",
      studentName: "John Doe",
      program: "Computer Science",
      batchId: "B2024-001",
      status: "Pending",
      submittedDate: "2024-08-24",
      priority: "Normal",
      verifiedBy: null,
      issues: []
    },
    {
      cardId: "C2024-001157",
      studentId: "2024002",
      studentName: "Jane Smith",
      program: "Business Administration",
      batchId: "B2024-001",
      status: "Verified",
      submittedDate: "2024-08-24",
      priority: "Normal",
      verifiedBy: "Secretary A",
      verifiedDate: "2024-08-25",
      issues: []
    },
    {
      cardId: "C2024-001158",
      studentId: "2024003",
      studentName: "Mike Johnson",
      program: "Engineering",
      batchId: "R2024-001",
      status: "Rejected",
      submittedDate: "2024-08-23",
      priority: "Urgent",
      verifiedBy: "Secretary B",
      verifiedDate: "2024-08-24",
      issues: ["Photo quality", "Missing signature"]
    },
    {
      cardId: "C2024-001159",
      studentId: "2024004",
      studentName: "Sarah Wilson",
      program: "Nursing",
      batchId: "B2024-002",
      status: "Pending",
      submittedDate: "2024-08-25",
      priority: "High",
      verifiedBy: null,
      issues: []
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Verified":
        return <Badge className="bg-green-500 hover:bg-green-600">Verified</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "High":
        return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>
      case "Normal":
        return <Badge variant="outline">Normal</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const pendingCards = verificationQueue.filter(card => card.status === "Pending")
  const verifiedCards = verificationQueue.filter(card => card.status === "Verified")
  const rejectedCards = verificationQueue.filter(card => card.status === "Rejected")

  const handleVerify = (cardId: string) => {
    console.log("Verifying card:", cardId)
    // Handle verification logic
  }

  const handleReject = (cardId: string) => {
    console.log("Rejecting card:", cardId)
    // Handle rejection logic
  }

  return (
    <RegistrarLayout role="registrar-secretary" title="Card Verification">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#026892]">Card Verification</h1>
            <p className="text-sm text-gray-600 mt-1">Review and verify student ID cards before issuance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Verification</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCards.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified Today</p>
                  <p className="text-2xl font-bold text-green-600">{verifiedCards.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedCards.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verification Rate</p>
                  <p className="text-2xl font-bold text-[#026892]">94%</p>
                </div>
                <User className="h-8 w-8 text-[#026892]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search by card ID, student ID, or name..." 
                className="pl-10"
              />
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Verification Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending ({pendingCards.length})</TabsTrigger>
            <TabsTrigger value="verified">Verified ({verifiedCards.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedCards.length})</TabsTrigger>
            <TabsTrigger value="all">All Cards</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingCards.length > 0 ? (
              <div className="space-y-4">
                {pendingCards.map((card, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg text-[#026892]">{card.cardId}</CardTitle>
                          {getStatusBadge(card.status)}
                          {getPriorityBadge(card.priority)}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-[#026892] hover:bg-green-700"
                            onClick={() => handleVerify(card.cardId)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Verify
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleReject(card.cardId)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Student</p>
                          <p className="font-medium">{card.studentName}</p>
                          <p className="text-sm text-gray-500">ID: {card.studentId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Program</p>
                          <p className="font-medium">{card.program}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Batch ID</p>
                          <p className="font-medium">{card.batchId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Submitted</p>
                          <p className="font-medium">{card.submittedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Days Pending</p>
                          <p className="font-medium text-orange-600">
                            {Math.ceil((new Date().getTime() - new Date(card.submittedDate).getTime()) / (1000 * 3600 * 24))} days
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Pending Verifications</h3>
                  <p className="text-gray-500">All cards have been processed</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="verified" className="space-y-4">
            <div className="space-y-4">
              {verifiedCards.map((card, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-[#026892]">{card.cardId}</CardTitle>
                        {getStatusBadge(card.status)}
                        {getPriorityBadge(card.priority)}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Student</p>
                        <p className="font-medium">{card.studentName}</p>
                        <p className="text-sm text-gray-500">ID: {card.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Program</p>
                        <p className="font-medium">{card.program}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Batch ID</p>
                        <p className="font-medium">{card.batchId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Verified By</p>
                        <p className="font-medium">{card.verifiedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Verified Date</p>
                        <p className="font-medium">{card.verifiedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium text-green-600">Ready for Issuance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <div className="space-y-4">
              {rejectedCards.map((card, index) => (
                <Card key={index} className="border-red-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-[#026892]">{card.cardId}</CardTitle>
                        {getStatusBadge(card.status)}
                        {getPriorityBadge(card.priority)}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-[#026892] hover:bg-[#025078]"
                        >
                          Request Revision
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Student</p>
                        <p className="font-medium">{card.studentName}</p>
                        <p className="text-sm text-gray-500">ID: {card.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Program</p>
                        <p className="font-medium">{card.program}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Batch ID</p>
                        <p className="font-medium">{card.batchId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rejected By</p>
                        <p className="font-medium">{card.verifiedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rejected Date</p>
                        <p className="font-medium">{card.verifiedDate}</p>
                      </div>
                    </div>
                    
                    {card.issues && card.issues.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">Issues Found:</span>
                        </div>
                        <ul className="text-sm text-red-700 space-y-1">
                          {card.issues.map((issue, issueIndex) => (
                            <li key={issueIndex} className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-4">
              {verificationQueue.map((card, index) => (
                <Card key={index} className={card.status === "Rejected" ? "border-red-200" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-[#026892]">{card.cardId}</CardTitle>
                        {getStatusBadge(card.status)}
                        {getPriorityBadge(card.priority)}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Student</p>
                        <p className="font-medium">{card.studentName}</p>
                        <p className="text-sm text-gray-500">ID: {card.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Program</p>
                        <p className="font-medium">{card.program}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Batch ID</p>
                        <p className="font-medium">{card.batchId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Submitted</p>
                        <p className="font-medium">{card.submittedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Processed By</p>
                        <p className="font-medium">{card.verifiedBy || "—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Processed Date</p>
                        <p className="font-medium">{card.verifiedDate || "—"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RegistrarLayout>
  )
}
