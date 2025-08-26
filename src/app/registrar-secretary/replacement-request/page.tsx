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
  FileText,
  CreditCard,
  DollarSign,
  Plus  
} from "lucide-react"

export default function ReplacementRequestPage() {
  const replacementRequests = [
    {
      requestId: "REQ-2024-001",
      studentId: "2024001",
      studentName: "John Doe",
      originalCardId: "C2023-001156",
      reason: "Lost",
      status: "Pending",
      submittedDate: "2024-08-24",
      priority: "Normal",
      fee: 50.00,
      feeStatus: "Paid",
      documents: ["Affidavit", "Police Report"],
      approvedBy: null,
      notes: "Student reported card lost on campus"
    },
    {
      requestId: "REQ-2024-002",
      studentId: "2024002",
      studentName: "Jane Smith",
      originalCardId: "C2023-001157",
      reason: "Damaged",
      status: "Approved",
      submittedDate: "2024-08-23",
      priority: "High",
      fee: 25.00,
      feeStatus: "Paid",
      documents: ["Damaged Card Photo"],
      approvedBy: "Secretary A",
      approvedDate: "2024-08-24",
      notes: "Card damaged due to machine malfunction"
    },
    {
      requestId: "REQ-2024-003",
      studentId: "2024003",
      studentName: "Mike Johnson",
      originalCardId: "C2023-001158",
      reason: "Stolen",
      status: "Under Review",
      submittedDate: "2024-08-22",
      priority: "Urgent",
      fee: 75.00,
      feeStatus: "Pending",
      documents: ["Police Report", "Affidavit"],
      approvedBy: null,
      notes: "Card stolen during break-in incident"
    },
    {
      requestId: "REQ-2024-004",
      studentId: "2024004",
      studentName: "Sarah Wilson",
      originalCardId: "C2023-001159",
      reason: "Name Change",
      status: "Rejected",
      submittedDate: "2024-08-21",
      priority: "Normal",
      fee: 30.00,
      feeStatus: "Refunded",
      documents: ["Marriage Certificate"],
      approvedBy: "Secretary B",
      rejectedDate: "2024-08-23",
      notes: "Insufficient documentation provided"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Under Review":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Under Review</Badge>
      case "Approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "In Production":
        return <Badge className="bg-purple-500 hover:bg-purple-600">In Production</Badge>
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

  const getFeeStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>
      case "Pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Refunded":
        return <Badge className="bg-gray-500 hover:bg-gray-600">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const pendingRequests = replacementRequests.filter(req => req.status === "Pending")
  const underReviewRequests = replacementRequests.filter(req => req.status === "Under Review")
  const approvedRequests = replacementRequests.filter(req => req.status === "Approved")
  const rejectedRequests = replacementRequests.filter(req => req.status === "Rejected")

  const handleApprove = (requestId: string) => {
    console.log("Approving request:", requestId)
    // Handle approval logic
  }

  const handleReject = (requestId: string) => {
    console.log("Rejecting request:", requestId)
    // Handle rejection logic
  }

  return (
    <RegistrarLayout role="registrar-secretary" title="Replacement Requests">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#026892]">Card Replacement Requests</h1>
            <p className="text-sm text-gray-600 mt-1">Process and manage student ID card replacement requests</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button size="sm" className="bg-[#026892] hover:bg-[#025078] flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-blue-600">{underReviewRequests.length}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{approvedRequests.length}</p>
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
                  <p className="text-2xl font-bold text-red-600">{rejectedRequests.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#026892]">₱275</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#026892]" />
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
                placeholder="Search by request ID, student ID, or name..." 
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
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reasons</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
              <SelectItem value="stolen">Stolen</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
              <SelectItem value="name-change">Name Change</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Request Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="review">Under Review ({underReviewRequests.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
            <TabsTrigger value="all">All Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg text-[#026892]">{request.requestId}</CardTitle>
                          {getStatusBadge(request.status)}
                          {getPriorityBadge(request.priority)}
                          {getFeeStatusBadge(request.feeStatus)}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-[#026892] hover:bg-[#025b7f]"
                            onClick={() => handleApprove(request.requestId)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleReject(request.requestId)}
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Student</p>
                              <p className="font-medium">{request.studentName}</p>
                              <p className="text-sm text-gray-500">ID: {request.studentId}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Original Card ID</p>
                              <p className="font-medium">{request.originalCardId}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Reason</p>
                              <p className="font-medium">{request.reason}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Replacement Fee</p>
                              <p className="font-medium">₱{request.fee.toFixed(2)}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Submitted Date</p>
                            <p className="font-medium">{request.submittedDate}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Documents Submitted</p>
                            <div className="flex flex-wrap gap-2">
                              {request.documents.map((doc, docIndex) => (
                                <Badge key={docIndex} variant="outline" className="flex items-center gap-1">
                                  <FileText className="h-3 w-3" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Notes</p>
                            <p className="text-sm bg-gray-50 p-2 rounded">{request.notes}</p>
                          </div>
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
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Pending Requests</h3>
                  <p className="text-gray-500">All replacement requests have been processed</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <div className="space-y-4">
              {underReviewRequests.map((request, index) => (
                <Card key={index} className="border-blue-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-[#026892]">{request.requestId}</CardTitle>
                        {getStatusBadge(request.status)}
                        {getPriorityBadge(request.priority)}
                        {getFeeStatusBadge(request.feeStatus)}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(request.requestId)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleReject(request.requestId)}
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
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Student</p>
                        <p className="font-medium">{request.studentName}</p>
                        <p className="text-sm text-gray-500">ID: {request.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reason</p>
                        <p className="font-medium">{request.reason}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fee</p>
                        <p className="font-medium">₱{request.fee.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Documents</p>
                        <p className="text-sm">{request.documents.length} files</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Submitted</p>
                        <p className="font-medium">{request.submittedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Days in Review</p>
                        <p className="font-medium text-blue-600">
                          {Math.ceil((new Date().getTime() - new Date(request.submittedDate).getTime()) / (1000 * 3600 * 24))} days
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <div className="space-y-4">
              {approvedRequests.map((request, index) => (
                <Card key={index} className="border-green-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-[#026892]">{request.requestId}</CardTitle>
                        {getStatusBadge(request.status)}
                        {getPriorityBadge(request.priority)}
                        {getFeeStatusBadge(request.feeStatus)}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-[#026892] hover:bg-[#025078]"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Add to Batch
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Student</p>
                        <p className="font-medium">{request.studentName}</p>
                        <p className="text-sm text-gray-500">ID: {request.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reason</p>
                        <p className="font-medium">{request.reason}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fee</p>
                        <p className="font-medium">₱{request.fee.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Approved By</p>
                        <p className="font-medium">{request.approvedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Approved Date</p>
                        <p className="font-medium">{request.approvedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium text-green-600">Ready for Production</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <div className="space-y-4">
              {rejectedRequests.map((request, index) => (
                <Card key={index} className="border-red-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-[#026892]">{request.requestId}</CardTitle>
                        {getStatusBadge(request.status)}
                        {getPriorityBadge(request.priority)}
                        {getFeeStatusBadge(request.feeStatus)}
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
                        <p className="font-medium">{request.studentName}</p>
                        <p className="text-sm text-gray-500">ID: {request.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reason</p>
                        <p className="font-medium">{request.reason}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fee</p>
                        <p className="font-medium">₱{request.fee.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rejected By</p>
                        <p className="font-medium">{request.approvedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rejected Date</p>
                        <p className="font-medium">{request.rejectedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium text-red-600">Request Denied</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Rejection Reason:</span>
                      </div>
                      <p className="text-sm text-red-700">{request.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-4">
              {replacementRequests.map((request, index) => (
                <Card key={index} className={
                  request.status === "Rejected" ? "border-red-200" : 
                  request.status === "Approved" ? "border-green-200" :
                  request.status === "Under Review" ? "border-blue-200" : ""
                }>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-[#026892]">{request.requestId}</CardTitle>
                        {getStatusBadge(request.status)}
                        {getPriorityBadge(request.priority)}
                        {getFeeStatusBadge(request.feeStatus)}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Student</p>
                        <p className="font-medium">{request.studentName}</p>
                        <p className="text-sm text-gray-500">ID: {request.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reason</p>
                        <p className="font-medium">{request.reason}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fee</p>
                        <p className="font-medium">₱{request.fee.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Documents</p>
                        <p className="text-sm">{request.documents.length} files</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Submitted</p>
                        <p className="font-medium">{request.submittedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Processed By</p>
                        <p className="font-medium">{request.approvedBy || "—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Processed Date</p>
                        <p className="font-medium">{request.approvedDate || request.rejectedDate || "—"}</p>
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
