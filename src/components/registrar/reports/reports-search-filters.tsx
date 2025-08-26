import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download } from "lucide-react"
import { ReportFilters } from "./types"

interface ReportsSearchFiltersProps {
  filters: ReportFilters
  setFilters: (filters: ReportFilters) => void
  filteredCount: number
  totalCount: number
}

export function ReportsSearchFilters({
  filters,
  setFilters,
  filteredCount,
  totalCount
}: ReportsSearchFiltersProps) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reports by name, description, or creator..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Report Type</label>
              <Select value={filters.typeFilter} onValueChange={(value) => setFilters({ ...filters, typeFilter: value })}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Enrollment">Enrollment</SelectItem>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Graduation">Graduation</SelectItem>
                  <SelectItem value="Attendance">Attendance</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select value={filters.statusFilter} onValueChange={(value) => setFilters({ ...filters, statusFilter: value })}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <Select value={filters.departmentFilter} onValueChange={(value) => setFilters({ ...filters, departmentFilter: value })}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Registrar">Registrar</SelectItem>
                  <SelectItem value="Academic Affairs">Academic Affairs</SelectItem>
                  <SelectItem value="Financial Aid">Financial Aid</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Actions</label>
              <Button 
                variant="outline" 
                className="w-full border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredCount} of {totalCount} reports
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
