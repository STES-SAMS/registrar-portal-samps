"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  DollarSign, 
  Download, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Users,
  CheckCircle,
  PieChart,
  Search,
  Calculator
} from "lucide-react"

interface FinancialData {
  category: string
  department: string
  budgetAllocated: number
  actualSpent: number
  revenue: number
  studentAid: number
  tuitionCollected: number
  variance: number
  variancePercentage: number
  status: "Under Budget" | "Over Budget" | "On Track"
  trend: "up" | "down" | "stable"
}

export function FinancialReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("2025-q3")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const financialData: FinancialData[] = [
    {
      category: "Academic Operations",
      department: "Academic Affairs",
      budgetAllocated: 2500000,
      actualSpent: 2350000,
      revenue: 3200000,
      studentAid: 450000,
      tuitionCollected: 2800000,
      variance: 150000,
      variancePercentage: 6.0,
      status: "Under Budget",
      trend: "up"
    },
    {
      category: "Student Services",
      department: "Student Affairs",
      budgetAllocated: 1200000,
      actualSpent: 1180000,
      revenue: 150000,
      studentAid: 800000,
      tuitionCollected: 0,
      variance: 20000,
      variancePercentage: 1.7,
      status: "Under Budget",
      trend: "stable"
    },
    {
      category: "Facilities & Maintenance",
      department: "Operations",
      budgetAllocated: 800000,
      actualSpent: 850000,
      revenue: 50000,
      studentAid: 0,
      tuitionCollected: 0,
      variance: -50000,
      variancePercentage: -6.3,
      status: "Over Budget",
      trend: "down"
    },
    {
      category: "Technology Infrastructure",
      department: "IT Services",
      budgetAllocated: 600000,
      actualSpent: 580000,
      revenue: 0,
      studentAid: 0,
      tuitionCollected: 0,
      variance: 20000,
      variancePercentage: 3.3,
      status: "Under Budget",
      trend: "up"
    },
    {
      category: "Library Services",
      department: "Library",
      budgetAllocated: 400000,
      actualSpent: 395000,
      revenue: 25000,
      studentAid: 0,
      tuitionCollected: 0,
      variance: 5000,
      variancePercentage: 1.3,
      status: "On Track",
      trend: "stable"
    },
    {
      category: "Research & Development",
      department: "Research Office",
      budgetAllocated: 750000,
      actualSpent: 720000,
      revenue: 1200000,
      studentAid: 100000,
      tuitionCollected: 0,
      variance: 30000,
      variancePercentage: 4.0,
      status: "Under Budget",
      trend: "up"
    },
    {
      category: "Athletics",
      department: "Athletics",
      budgetAllocated: 300000,
      actualSpent: 315000,
      revenue: 180000,
      studentAid: 50000,
      tuitionCollected: 0,
      variance: -15000,
      variancePercentage: -5.0,
      status: "Over Budget",
      trend: "down"
    }
  ]

  const filteredData = financialData.filter(item => {
    const matchesSearch = item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || item.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const totalBudget = filteredData.reduce((sum, item) => sum + item.budgetAllocated, 0)
  const totalSpent = filteredData.reduce((sum, item) => sum + item.actualSpent, 0)
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0)
  const totalStudentAid = filteredData.reduce((sum, item) => sum + item.studentAid, 0)
  const totalTuition = filteredData.reduce((sum, item) => sum + item.tuitionCollected, 0)
  const totalVariance = totalBudget - totalSpent
  const overallVariancePercentage = ((totalVariance / totalBudget) * 100).toFixed(1)

  const budgetUtilization = ((totalSpent / totalBudget) * 100).toFixed(1)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Under Budget":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Under Budget</Badge>
      case "Over Budget":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Over Budget</Badge>
      case "On Track":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">On Track</Badge>
      default:
        return <Badge className="bg-white text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-green-600"
    if (variance < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />
    return <div className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Financial Report
          </h1>
          <p className="text-gray-600">Budget allocation, revenue analysis, and financial aid distribution</p>
        </div>
        
        <Button className="bg-[#026892] hover:bg-[#024f70] text-white font-medium flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-q3">Q3 2025</SelectItem>
                  <SelectItem value="2025-q2">Q2 2025</SelectItem>
                  <SelectItem value="2025-q1">Q1 2025</SelectItem>
                  <SelectItem value="2024-q4">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Academic Affairs">Academic Affairs</SelectItem>
                  <SelectItem value="Student Affairs">Student Affairs</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Library">Library</SelectItem>
                  <SelectItem value="Research Office">Research Office</SelectItem>
                  <SelectItem value="Athletics">Athletics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Categories</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories or departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Financial Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-white">
                  <TableHead className="font-semibold text-black">Category</TableHead>
                  <TableHead className="font-semibold text-black">Department</TableHead>
                  <TableHead className="font-semibold text-black">Budget Allocated</TableHead>
                  <TableHead className="font-semibold text-black">Actual Spent</TableHead>
                  <TableHead className="font-semibold text-black">Revenue</TableHead>
                  <TableHead className="font-semibold text-black">Variance</TableHead>
                  <TableHead className="font-semibold text-black">Status</TableHead>
                  <TableHead className="font-semibold text-black">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-white transition-colors">
                    <TableCell>
                      <div className="font-medium text-gray-900">{item.category}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[#026892] border-[#026892]">
                        {item.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {formatCurrency(item.budgetAllocated)}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {formatCurrency(item.actualSpent)}
                    </TableCell>
                    <TableCell className="text-green-600 font-medium">
                      {formatCurrency(item.revenue)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className={`font-medium ${getVarianceColor(item.variance)}`}>
                          {item.variance > 0 ? '+' : ''}{formatCurrency(item.variance)}
                        </span>
                        <span className={`text-sm ${getVarianceColor(item.variance)}`}>
                          ({item.variancePercentage > 0 ? '+' : ''}{item.variancePercentage.toFixed(1)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className="text-sm text-gray-600 capitalize">{item.trend}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Budget Utilization Overview */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-back" />
            Budget vs Actual Spending Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((item, index) => {
              const utilization = (item.actualSpent / item.budgetAllocated) * 100
              return (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(item.actualSpent)} / {formatCurrency(item.budgetAllocated)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          utilization > 100 ? 'bg-blue-500' :
                          utilization > 90 ? 'bg-[#026892]' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(utilization, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{utilization.toFixed(1)}% utilized</span>
                      <span className={`text-xs font-medium ${getVarianceColor(item.variance)}`}>
                        {item.variance > 0 ? 'Under' : item.variance < 0 ? 'Over' : 'On'} budget
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
