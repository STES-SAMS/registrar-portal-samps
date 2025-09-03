"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play,
  Pause,
  Settings,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Printer
} from "lucide-react"

export default function CardProduction() {
  const productionQueue = [
    {
      batchId: "B2024-017",
      requestType: "New Students",
      department: "Engineering",
      totalCards: 156,
      completed: 0,
      status: "Queued",
      priority: "Normal",
      requestedBy: "John Doe",
      requestDate: "2024-08-24",
      estimatedCompletion: "2024-08-27"
    },
    {
      batchId: "B2024-016",
      requestType: "Staff Cards",
      department: "Administration",
      totalCards: 45,
      completed: 38,
      status: "In Progress",
      priority: "High",
      requestedBy: "Jane Smith",
      requestDate: "2024-08-23",
      estimatedCompletion: "2024-08-26"
    },
    {
      batchId: "R2024-009",
      requestType: "Replacements",
      department: "Multiple",
      totalCards: 23,
      completed: 15,
      status: "In Progress",
      priority: "Urgent",
      requestedBy: "Mike Johnson",
      requestDate: "2024-08-22",
      estimatedCompletion: "2024-08-25"
    },
    {
      batchId: "B2024-015",
      requestType: "New Students",
      department: "Business",
      totalCards: 89,
      completed: 89,
      status: "Completed",
      priority: "Normal",
      requestedBy: "Sarah Wilson",
      requestDate: "2024-08-20",
      estimatedCompletion: "2024-08-23"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Queued":
        return <Badge variant="secondary">Queued</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "Completed":
        return <Badge className="bg-[#026892]">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "High":
        return <Badge className="bg-orange-500">High</Badge>
      case "Normal":
        return <Badge variant="outline">Normal</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
  }

  const activeProduction = productionQueue.filter(batch => batch.status === "In Progress")
  const queuedProduction = productionQueue.filter(batch => batch.status === "Queued")
  const completedProduction = productionQueue.filter(batch => batch.status === "Completed")

  return (
    <RegistrarLayout role="registrar-secretary" title="Card Production">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Card Production Management</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor and manage ID card production batches</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Production Settings
            </Button>
            <Button size="sm" className="bg-[#026892] hover:bg-[#025078] flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start New Batch
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Batches</p>
                  <p className="text-2xl font-bold text-blue-600">{activeProduction.length}</p>
                </div>
                <Play className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Queue</p>
                  <p className="text-2xl font-bold text-orange-600">{queuedProduction.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cards Today</p>
                  <p className="text-2xl font-bold text-green-600">127</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Printer Status</p>
                  <p className="text-sm font-semibold text-green-600">Online</p>
                </div>
                <Printer className="h-8 w-8 text-green-600" />
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
                placeholder="Search by batch ID, department, or requester..." 
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
              <SelectItem value="queued">Queued</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
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

        {/* Production Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Production ({activeProduction.length})</TabsTrigger>
            <TabsTrigger value="queue">Queue ({queuedProduction.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Batches</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeProduction.length > 0 ? (
              <div className="space-y-4">
                {activeProduction.map((batch, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg">{batch.batchId}</CardTitle>
                          {getStatusBadge(batch.status)}
                          {getPriorityBadge(batch.priority)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Request Type</p>
                              <p className="font-medium">{batch.requestType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Department</p>
                              <p className="font-medium">{batch.department}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Requested By</p>
                              <p className="font-medium">{batch.requestedBy}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Est. Completion</p>
                              <p className="font-medium">{batch.estimatedCompletion}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Production Progress</span>
                              <span>{batch.completed} of {batch.totalCards} cards ({getProgress(batch.completed, batch.totalCards)}%)</span>
                            </div>
                            <Progress value={getProgress(batch.completed, batch.totalCards)} className="h-3" />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Button className="w-full bg-[#026892] hover:bg-[#025078]">
                            View Details
                          </Button>
                          <Button variant="outline" className="w-full">
                            Print Labels
                          </Button>
                          <Button variant="outline" className="w-full text-orange-600">
                            Quality Check
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Production</h3>
                  <p className="text-gray-500">Start a new batch to begin card production</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="queue" className="space-y-4">
            {queuedProduction.length > 0 ? (
              <div className="space-y-4">
                {queuedProduction.map((batch, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg">{batch.batchId}</CardTitle>
                          {getStatusBadge(batch.status)}
                          {getPriorityBadge(batch.priority)}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-[#026892] hover:bg-[#025078]">
                            <Play className="h-4 w-4 mr-2" />
                            Start Production
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Type</p>
                          <p className="font-medium">{batch.requestType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Department</p>
                          <p className="font-medium">{batch.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Cards</p>
                          <p className="font-medium">{batch.totalCards}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Requested</p>
                          <p className="font-medium">{batch.requestDate}</p>
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
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Queued Batches</h3>
                  <p className="text-gray-500">All batches are either in progress or completed</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedProduction.map((batch, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">{batch.batchId}</CardTitle>
                        {getStatusBadge(batch.status)}
                        {getPriorityBadge(batch.priority)}
                      </div>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{batch.requestType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{batch.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cards Produced</p>
                        <p className="font-medium text-green-600">{batch.completed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Requested By</p>
                        <p className="font-medium">{batch.requestedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="font-medium">{batch.estimatedCompletion}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-4">
              {productionQueue.map((batch, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">{batch.batchId}</CardTitle>
                        {getStatusBadge(batch.status)}
                        {getPriorityBadge(batch.priority)}
                      </div>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{batch.requestType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{batch.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Progress</p>
                        <p className="font-medium">{batch.completed}/{batch.totalCards}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Requested By</p>
                        <p className="font-medium">{batch.requestedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Request Date</p>
                        <p className="font-medium">{batch.requestDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Est. Completion</p>
                        <p className="font-medium">{batch.estimatedCompletion}</p>
                      </div>
                    </div>
                    {batch.status === "In Progress" && (
                      <div className="mt-4">
                        <Progress value={getProgress(batch.completed, batch.totalCards)} className="h-2" />
                      </div>
                    )}
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
