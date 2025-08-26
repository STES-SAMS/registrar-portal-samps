"use client"

import React from "react"
import Link from "next/link"
import { RegistrarLayout } from "@/components/registrar/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
} from "lucide-react"

export default function AdmissionsManagement() {
  const stats = [
    { title: "Total Applications", value: "1,234", color: "#6b7280" },
    { title: "Under Review", value: "456", color: "#026892" },
    { title: "Approved", value: "678", color: "#10b981" },
    { title: "Rejected", value: "123", color: "#ef4444" },
  ]

  const applications = [
    {
      id: "APP001",
      name: "John Doe",
      program: "Computer Science",
      status: "Under Review",
      date: "2025-01-15",
      score: "85%",
      statusColor: "#026892"
    },
    {
      id: "APP002",
      name: "Jane Smith", 
      program: "Business Administration",
      status: "Approved",
      date: "2025-01-14",
      score: "92%",
      statusColor: "#10b981"
    },
    {
      id: "APP003",
      name: "Mike Johnson",
      program: "Engineering",
      status: "Pending",
      date: "2025-01-13",
      score: "78%",
      statusColor: "#f59e0b"
    },
    {
      id: "APP004",
      name: "Sarah Wilson",
      program: "Medicine",
      status: "Interview",
      date: "2025-01-12",
      score: "95%",
      statusColor: "#8b5cf6"
    },
    {
      id: "APP005",
      name: "David Brown",
      program: "Law",
      status: "Rejected",
      date: "2025-01-11",
      score: "65%",
      statusColor: "#ef4444"
    },
  ]

  const getStatusBadge = (status: string, color: string) => {
    return (
      <Badge 
        variant="secondary" 
        style={{ 
          backgroundColor: `${color}20`, 
          color: color,
          border: `1px solid ${color}40`
        }}
      >
        {status}
      </Badge>
    )
  }

  return (
    <RegistrarLayout role="registrar" title="Admissions">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admissions Management</h1>
            <p className="text-gray-600 mt-1">Manage student applications and admission processes</p>
          </div>
          <Button className="bg-[#026892] hover:bg-[#026892] text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Application
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search applications..."
              className="pl-10 max-w-md"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Applications Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-black]">
                      {app.id}
                    </TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.program}</TableCell>
                    <TableCell>
                      {getStatusBadge(app.status, app.statusColor)}
                    </TableCell>
                    <TableCell className="text-gray-600">{app.date}</TableCell>
                    <TableCell className="font-semibold">{app.score}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/registrar/admissions/${app.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/registrar/admissions/${app.id}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </RegistrarLayout>
  )
}
