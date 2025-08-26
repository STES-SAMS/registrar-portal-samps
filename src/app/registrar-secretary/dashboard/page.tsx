"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard, BatchCard } from "@/components/secretary"
import { 
  BarChart3,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Download,
  Filter
} from "lucide-react"

export default function SecretaryDashboard() {
  // Analytics data
  const monthlyStats = [
    { month: "Jan", produced: 245, issued: 230, replacements: 15 },
    { month: "Feb", produced: 289, issued: 275, replacements: 18 },
    { month: "Mar", produced: 312, issued: 298, replacements: 22 },
    { month: "Apr", produced: 267, issued: 255, replacements: 19 },
    { month: "May", produced: 334, issued: 320, replacements: 28 },
    { month: "Jun", produced: 298, issued: 285, replacements: 24 },
  ]

  const performanceMetrics = [
    {
      title: "Production Efficiency",
      value: "94.2%",
      change: "+2.1%",
      trend: "up" as const,
      description: "Cards produced vs. requested"
    },
    {
      title: "Average Processing Time",
      value: "2.3 days",
      change: "-0.5 days",
      trend: "up" as const,
      description: "From request to completion"
    },
    {
      title: "Quality Score",
      value: "98.7%",
      change: "+0.3%",
      trend: "up" as const,
      description: "Cards passed quality check"
    },
    {
      title: "Replacement Rate",
      value: "2.1%",
      change: "-0.2%",
      trend: "up" as const,
      description: "Replacement requests rate"
    }
  ]

  const currentProduction = [
    {
      batchId: "B2024-015",
      name: "New Students",
      total: 156,
      completed: 123,
      progress: 79,
      status: "In Progress" as const,
      estimatedCompletion: "2 days"
    },
    {
      batchId: "B2024-016",
      name: "Staff Cards",
      total: 45,
      completed: 38,
      progress: 84,
      status: "In Progress" as const,
      estimatedCompletion: "1 day"
    },
    {
      batchId: "R2024-008",
      name: "Replacements",
      total: 23,
      completed: 15,
      progress: 65,
      status: "Urgent" as const,
      estimatedCompletion: "Today"
    }
  ]

  return (
    <RegistrarLayout role="registrar-secretary" title="Dashboard Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#026892]">Dashboard Analytics</h1>
            <p className="text-sm text-gray-600 mt-1">Comprehensive view of card production and management</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="bg-[#026892] hover:bg-[#025078] flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="production" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="production">Current Production</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="production" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#026892]">Current Production Batches</CardTitle>
                <CardDescription>Real-time status of ongoing card production</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentProduction.map((batch, index) => (
                    <BatchCard key={index} {...batch} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#026892]">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Production Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyStats.slice(-3).map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#026892]/5 rounded-lg border border-[#026892]/10">
                        <div>
                          <p className="font-medium text-[#026892]">{stat.month}</p>
                          <p className="text-sm text-gray-600">Produced: {stat.produced}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{stat.issued} issued</p>
                          <p className="text-sm text-orange-600">{stat.replacements} replacements</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#026892]">Production Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#026892]/10 rounded-lg border border-[#026892]/20">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-[#026892]" />
                        <span className="font-medium">Total Cards Produced</span>
                      </div>
                      <span className="text-xl font-bold text-[#026892]">1,845</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Successfully Issued</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">1,763</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">Replacements</span>
                      </div>
                      <span className="text-xl font-bold text-orange-600">126</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#026892]/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-[#026892]">Monthly Production Report</CardTitle>
                  <CardDescription>Detailed monthly production statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#026892]/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-[#026892]">Quality Assurance Report</CardTitle>
                  <CardDescription>Quality metrics and defect analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#026892]/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-[#026892]">Replacement Analysis</CardTitle>
                  <CardDescription>Replacement trends and causes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-[#026892]/20 text-[#026892] hover:bg-[#026892]/10">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RegistrarLayout>
  )
}
