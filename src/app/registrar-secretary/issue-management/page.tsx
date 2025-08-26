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
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  MessageSquare,
  Flag,
  FileText,
  CreditCard,
  Printer,
  Users,
  Download,
  Settings
} from "lucide-react"

export default function IssueManagementPage() {
  const issues = [
    {
      issueId: "ISS-2024-001",
      title: "Card Printer Malfunction",
      description: "Printer is producing cards with faded text on the right side",
      category: "Equipment",
      priority: "High",
      status: "Open",
      reportedBy: "Secretary A",
      assignedTo: "IT Support",
      reportedDate: "2024-08-25",
      lastUpdate: "2024-08-25",
      affectedBatches: ["B2024-003", "B2024-004"],
      tags: ["printer", "hardware", "quality-issue"],
      comments: [
        {
          author: "Secretary A",
          timestamp: "2024-08-25 09:30",
          message: "Noticed the issue during batch B2024-003 production"
        },
        {
          author: "IT Support",
          timestamp: "2024-08-25 10:15",
          message: "Investigating the printer settings and cartridge levels"
        }
      ]
    },
    {
      issueId: "ISS-2024-002", 
      title: "Student Photo Quality Issue",
      description: "Multiple student photos appear blurry or pixelated in recent batches",
      category: "Quality Control",
      priority: "Medium",
      status: "In Progress",
      reportedBy: "Secretary B",
      assignedTo: "Quality Team",
      reportedDate: "2024-08-24",
      lastUpdate: "2024-08-25",
      affectedBatches: ["B2024-002"],
      tags: ["photo-quality", "students", "verification"],
      comments: [
        {
          author: "Secretary B",
          timestamp: "2024-08-24 14:20",
          message: "Found 5 cards with poor photo quality during verification"
        },
        {
          author: "Quality Team",
          timestamp: "2024-08-25 08:00",
          message: "Reviewing photo submission standards and processing pipeline"
        }
      ]
    },
    {
      issueId: "ISS-2024-003",
      title: "Batch Processing Delay",
      description: "Batch B2024-001 has been delayed due to missing student data",
      category: "Data",
      priority: "Urgent",
      status: "Open",
      reportedBy: "Secretary A",
      assignedTo: "Data Team",
      reportedDate: "2024-08-23",
      lastUpdate: "2024-08-24",
      affectedBatches: ["B2024-001"],
      tags: ["data-missing", "delay", "urgent"],
      comments: [
        {
          author: "Secretary A",
          timestamp: "2024-08-23 16:45",
          message: "15 students missing enrollment verification data"
        },
        {
          author: "Data Team",
          timestamp: "2024-08-24 09:00",
          message: "Coordinating with admissions office to get missing data"
        }
      ]
    },
    {
      issueId: "ISS-2024-004",
      title: "Card Template Alignment Issue",
      description: "Student names are printing slightly off-center on cards",
      category: "Design",
      priority: "Low",
      status: "Resolved",
      reportedBy: "Secretary C",
      assignedTo: "Design Team", 
      reportedDate: "2024-08-22",
      lastUpdate: "2024-08-24",
      resolvedDate: "2024-08-24",
      affectedBatches: ["B2024-001"],
      tags: ["template", "alignment", "design"],
      comments: [
        {
          author: "Secretary C",
          timestamp: "2024-08-22 11:30",
          message: "Names appearing 2mm to the left of center position"
        },
        {
          author: "Design Team",
          timestamp: "2024-08-23 10:00",
          message: "Template updated and tested"
        },
        {
          author: "Design Team",
          timestamp: "2024-08-24 14:00",
          message: "Issue resolved. New template deployed."
        }
      ]
    },
    {
      issueId: "ISS-2024-005",
      title: "System Performance Slowdown",
      description: "Card management system is responding slowly during peak hours",
      category: "System",
      priority: "Medium",
      status: "In Progress",
      reportedBy: "Secretary B",
      assignedTo: "IT Support",
      reportedDate: "2024-08-21",
      lastUpdate: "2024-08-25",
      affectedBatches: [],
      tags: ["performance", "system", "peak-hours"],
      comments: [
        {
          author: "Secretary B",
          timestamp: "2024-08-21 15:00",
          message: "System takes 30+ seconds to load batch details"
        },
        {
          author: "IT Support",
          timestamp: "2024-08-22 09:00",
          message: "Investigating database performance and server load"
        },
        {
          author: "IT Support",
          timestamp: "2024-08-25 08:30",
          message: "Implementing caching improvements and database optimization"
        }
      ]
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge variant="destructive">Open</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      case "Resolved":
        return <Badge className="bg-green-500 hover:bg-green-600">Resolved</Badge>
      case "Closed":
        return <Badge variant="secondary">Closed</Badge>
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
      case "Medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Equipment":
        return <Printer className="h-4 w-4" />
      case "Quality Control":
        return <CheckCircle className="h-4 w-4" />
      case "Data":
        return <FileText className="h-4 w-4" />
      case "Design":
        return <CreditCard className="h-4 w-4" />
      case "System":
        return <Settings className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const openIssues = issues.filter(issue => issue.status === "Open")
  const inProgressIssues = issues.filter(issue => issue.status === "In Progress")
  const resolvedIssues = issues.filter(issue => issue.status === "Resolved")
  const urgentIssues = issues.filter(issue => issue.priority === "Urgent")

  return (
    <RegistrarLayout role="registrar-secretary" title="Issue Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#026892]">Issue Management</h1>
            <p className="text-sm text-gray-600 mt-1">Track and resolve card production issues and incidents</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button size="sm" className="bg-[#026892] hover:bg-[#025078] flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Report Issue
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Issues</p>
                  <p className="text-2xl font-bold text-red-600">{openIssues.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{inProgressIssues.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedIssues.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Urgent</p>
                  <p className="text-2xl font-bold text-orange-600">{urgentIssues.length}</p>
                </div>
                <Flag className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Issues</p>
                  <p className="text-2xl font-bold text-[#026892]">{issues.length}</p>
                </div>
                <FileText className="h-8 w-8 text-[#026892]" />
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
                placeholder="Search issues by ID, title, or description..." 
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
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="quality">Quality Control</SelectItem>
              <SelectItem value="data">Data</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Issue Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Issues ({issues.length})</TabsTrigger>
            <TabsTrigger value="open">Open ({openIssues.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressIssues.length})</TabsTrigger>
            <TabsTrigger value="urgent">Urgent ({urgentIssues.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedIssues.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {issues.map((issue, index) => (
                <Card key={index} className={
                  issue.priority === "Urgent" ? "border-red-200 bg-red-50/30" :
                  issue.priority === "High" ? "border-orange-200" :
                  issue.status === "Resolved" ? "border-green-200" : ""
                }>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getCategoryIcon(issue.category)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-lg text-[#026892]">{issue.issueId}</CardTitle>
                            {getStatusBadge(issue.status)}
                            {getPriorityBadge(issue.priority)}
                          </div>
                          <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {issue.status !== "Resolved" && (
                          <Button size="sm" className="bg-[#026892] hover:bg-[#025078]">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Add Comment
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Category</p>
                            <p className="font-medium">{issue.category}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Reported By</p>
                            <p className="font-medium">{issue.reportedBy}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Assigned To</p>
                            <p className="font-medium">{issue.assignedTo}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Reported Date</p>
                            <p className="font-medium">{issue.reportedDate}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Last Update</p>
                            <p className="font-medium">{issue.lastUpdate}</p>
                          </div>
                          {issue.resolvedDate && (
                            <div>
                              <p className="text-sm text-gray-600">Resolved Date</p>
                              <p className="font-medium text-green-600">{issue.resolvedDate}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {issue.affectedBatches.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Affected Batches</p>
                            <div className="flex flex-wrap gap-2">
                              {issue.affectedBatches.map((batch, batchIndex) => (
                                <Badge key={batchIndex} variant="outline" className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {batch}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {issue.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Latest Comments ({issue.comments.length})</p>
                          <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                            {issue.comments.slice(-2).map((comment, commentIndex) => (
                              <div key={commentIndex} className="text-sm mb-2 last:mb-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-[#026892]">{comment.author}</span>
                                  <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                                </div>
                                <p className="text-gray-700">{comment.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="open" className="space-y-4">
            <div className="space-y-4">
              {openIssues.map((issue, index) => (
                <Card key={index} className="border-red-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getCategoryIcon(issue.category)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-lg text-[#026892]">{issue.issueId}</CardTitle>
                            {getStatusBadge(issue.status)}
                            {getPriorityBadge(issue.priority)}
                          </div>
                          <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Clock className="h-4 w-4 mr-2" />
                          Start Progress
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
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">{issue.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reported By</p>
                        <p className="font-medium">{issue.reportedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Assigned To</p>
                        <p className="font-medium">{issue.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reported Date</p>
                        <p className="font-medium">{issue.reportedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Days Open</p>
                        <p className="font-medium text-red-600">
                          {Math.ceil((new Date().getTime() - new Date(issue.reportedDate).getTime()) / (1000 * 3600 * 24))} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Comments</p>
                        <p className="font-medium">{issue.comments.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <div className="space-y-4">
              {inProgressIssues.map((issue, index) => (
                <Card key={index} className="border-blue-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getCategoryIcon(issue.category)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-lg text-[#026892]">{issue.issueId}</CardTitle>
                            {getStatusBadge(issue.status)}
                            {getPriorityBadge(issue.priority)}
                          </div>
                          <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Resolved
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Add Update
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">{issue.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Assigned To</p>
                        <p className="font-medium">{issue.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Progress Duration</p>
                        <p className="font-medium text-blue-600">
                          {Math.ceil((new Date().getTime() - new Date(issue.reportedDate).getTime()) / (1000 * 3600 * 24))} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Update</p>
                        <p className="font-medium">{issue.lastUpdate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Comments</p>
                        <p className="font-medium">{issue.comments.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Affected Batches</p>
                        <p className="font-medium">{issue.affectedBatches.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4">
            <div className="space-y-4">
              {urgentIssues.map((issue, index) => (
                <Card key={index} className="border-red-300 bg-red-50/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-600">
                          <Flag className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-lg text-[#026892]">{issue.issueId}</CardTitle>
                            {getStatusBadge(issue.status)}
                            {getPriorityBadge(issue.priority)}
                          </div>
                          <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Escalate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">URGENT ISSUE - Immediate Attention Required</span>
                      </div>
                      <p className="text-sm text-red-700">This issue requires immediate resolution to prevent further impact on operations.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">{issue.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Assigned To</p>
                        <p className="font-medium">{issue.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time Since Reported</p>
                        <p className="font-medium text-red-600">
                          {Math.ceil((new Date().getTime() - new Date(issue.reportedDate).getTime()) / (1000 * 3600 * 24))} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Affected Batches</p>
                        <p className="font-medium text-red-600">{issue.affectedBatches.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Recent Updates</p>
                        <p className="font-medium">{issue.comments.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            <div className="space-y-4">
              {resolvedIssues.map((issue, index) => (
                <Card key={index} className="border-green-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-lg text-[#026892]">{issue.issueId}</CardTitle>
                            {getStatusBadge(issue.status)}
                            {getPriorityBadge(issue.priority)}
                          </div>
                          <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolved
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
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">{issue.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Resolved By</p>
                        <p className="font-medium">{issue.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Resolved Date</p>
                        <p className="font-medium text-green-600">{issue.resolvedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Resolution Time</p>
                        <p className="font-medium">
                          {Math.ceil((new Date(issue.resolvedDate!).getTime() - new Date(issue.reportedDate).getTime()) / (1000 * 3600 * 24))} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Comments</p>
                        <p className="font-medium">{issue.comments.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Impact</p>
                        <p className="font-medium">{issue.affectedBatches.length} batches</p>
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
