import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  GraduationCap, 
  Clock, 
  FileText,
  BarChart3,
  MoreHorizontal,
  Eye,
  Download,
  Calendar,
  Plus
} from "lucide-react"
import { Report } from "./types"

interface ReportsTableProps {
  reports: Report[]
  onCreateReport: () => void
}

export function ReportsTable({ reports, onCreateReport }: ReportsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Scheduled</Badge>
      case "Completed":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Completed</Badge>
      case "Failed":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Failed</Badge>
      case "Draft":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Draft</Badge>
      default:
        return <Badge className="bg-white text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Enrollment":
        return <Users className="h-4 w-4 text-[#026892]" />
      case "Academic":
        return <BookOpen className="h-4 w-4 text-[#026892]" />
      case "Financial":
        return <DollarSign className="h-4 w-4 text-[#026892]" />
      case "Graduation":
        return <GraduationCap className="h-4 w-4 text-[#026892]" />
      case "Attendance":
        return <Clock className="h-4 w-4 text-[#026892]" />
      default:
        return <FileText className="h-4 w-4 text-[#026892]" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Generated Reports</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead className="font-semibold text-black">Report Name</TableHead>
                <TableHead className="font-semibold text-black">Type</TableHead>
                <TableHead className="font-semibold text-black">Department</TableHead>
                <TableHead className="font-semibold text-black">Last Generated</TableHead>
                <TableHead className="font-semibold text-black">Frequency</TableHead>
                <TableHead className="font-semibold text-black">Status</TableHead>
                <TableHead className="font-semibold text-black">Format</TableHead>
                <TableHead className="text-right font-semibold text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-white transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium text-gray-900">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[#026892] border-[#026892]">
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{report.department}</TableCell>
                  <TableCell className="text-gray-600">{formatDate(report.lastGenerated)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-gray-700 border-gray-200">
                      {report.frequency}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-gray-600 border-gray-300">
                      {report.format}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Report
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Schedule
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <Button
                variant="outline"
                className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
                onClick={onCreateReport}
              >
                Create New Report
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
