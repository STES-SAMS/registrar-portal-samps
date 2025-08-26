"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard, BatchCard, PriorityTask, ActivityItem } from "@/components/secretary"
import { 
  Printer, 
  UserCheck, 
  AlertTriangle, 
  RefreshCw,
  Eye,
  Play,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react"

export default function RegistrarSecretaryDashboard() {
  // Main statistics
  const stats = [
    { 
      title: "Cards in Production", 
      value: "156", 
      subtitle: "37 new yesterday",
      icon: Printer, 
      variant: "primary" as const
    },
    { 
      title: "Cards Issued Today", 
      value: "89", 
      subtitle: "17 new yesterday",
      icon: CheckCircle, 
      variant: "success" as const
    },
    { 
      title: "Replacement Requests", 
      value: "23", 
      subtitle: "8 urgent",
      icon: AlertTriangle, 
      variant: "warning" as const
    },
    { 
      title: "Verification Queue", 
      value: "45", 
      subtitle: "Pending verification",
      icon: UserCheck, 
      variant: "primary" as const
    },
  ]

  // Batch processing data
  const batches = [
    {
      batchId: "B2024-001",
      name: "New Students",
      progress: 85,
      total: 120,
      completed: 102,
      status: "In Progress" as const,
      estimatedCompletion: "2 days"
    },
    {
      batchId: "B2024-002",
      name: "Continuing Students",
      progress: 100,
      total: 89,
      completed: 0,
      status: "Queued" as const,
      estimatedCompletion: "3 days"
    },
    {
      batchId: "R2024-001",
      name: "Replacement #001",
      progress: 75,
      total: 23,
      completed: 17,
      status: "Urgent" as const,
      estimatedCompletion: "Today"
    }
  ]

  // Priority tasks
  const priorityTasks = [
    {
      title: "Urgent Replacements",
      count: "8 cards need immediate processing",
      priority: "Urgent" as const,
      icon: AlertTriangle
    },
    {
      title: "Quality Check Batch #001",
      count: "72 cards ready for review",
      priority: "High Priority" as const,
      icon: CheckCircle
    },
    {
      title: "Verification Queue",
      count: "45 cards awaiting verification",
      priority: "Medium" as const,
      icon: UserCheck
    }
  ]

  // Recent activities
  const recentActivities = [
    {
      title: "Batch B2024-001 75% complete",
      time: "2 hours ago",
      icon: CheckCircle,
      variant: "success" as const
    },
    {
      title: "6 replacement requests approved",
      time: "1 hour ago",
      icon: AlertCircle,
      variant: "warning" as const
    },
    {
      title: "New batch started for 64 students",
      time: "3 hours ago",
      icon: Play,
      variant: "info" as const
    },
    {
      title: "72 cards verified and issued",
      time: "7 hours ago",
      icon: CheckCircle,
      variant: "success" as const
    }
  ]

  return (
    <RegistrarLayout role="registrar-secretary" title="Secretary Dashboard">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#026892]">Student Cards Management</h1>
          <p className="text-sm text-gray-600 mt-1">Registrar Secretary Dashboard - Student ID Card Production & Management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
            <RefreshCw className="h-4 w-4" />
            Production Metrics
          </Button>
          <Button 
            size="sm" 
            className="bg-[#026892] hover:bg-[#025078] flex items-center gap-2"
            onClick={() => window.location.href = '/registrar-secretary/new-batch'}
          >
            <Plus className="h-4 w-4" />
            Start New Batch
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Batch Processing */}
        <div className="lg:col-span-2 space-y-6">
          {/* Batch Processing Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-[#026892]">Batch Processing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {batches.map((batch, index) => (
                  <BatchCard key={index} {...batch} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Priority Tasks & Quick Actions */}
        <div className="space-y-6">
          {/* Priority Tasks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-[#026892]">Priority Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priorityTasks.map((task, index) => (
                  <PriorityTask key={index} {...task} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-[#026892]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start text-sm h-9 bg-[#026892] text-white hover:bg-[#025078]"
                  onClick={() => window.location.href = '/registrar-secretary/new-batch'}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Batch
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-9 text-orange-600 border-orange-200 hover:bg-orange-50"
                  onClick={() => window.location.href = '/registrar-secretary/replacement-request'}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Process Replacements
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-9 text-[#026892] border-[#026892]/20 hover:bg-[#026892]/10"
                  onClick={() => window.location.href = '/registrar-secretary/verification'}
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Verify Cards
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-[#026892]">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RegistrarLayout>
  )
}
