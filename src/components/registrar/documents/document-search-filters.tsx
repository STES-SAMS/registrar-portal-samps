import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Building, GraduationCap, X } from "lucide-react"
import { DocumentFilters, PaginationState } from "./types"

interface DocumentSearchFiltersProps {
  filters: DocumentFilters
  setFilters: (filters: DocumentFilters) => void
  pagination: PaginationState
  setPagination: (pagination: PaginationState) => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  departments: string[]
  schools: string[]
  categories: string[]
  filteredCount: number
  totalCount: number
  startIndex: number
  endIndex: number
}

export function DocumentSearchFilters({
  filters,
  setFilters,
  pagination,
  setPagination,
  showFilters,
  setShowFilters,
  departments,
  schools,
  categories,
  filteredCount,
  totalCount,
  startIndex,
  endIndex
}: DocumentSearchFiltersProps) {
  const activeFiltersCount = [
    filters.departmentFilter,
    filters.schoolFilter,
    filters.statusFilter,
    filters.categoryFilter
  ].filter(f => f !== "all").length

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      departmentFilter: "all",
      schoolFilter: "all",
      statusFilter: "all",
      categoryFilter: "all"
    })
    setPagination({ ...pagination, currentPage: 1 })
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents by name, ID, or author..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 ${activeFiltersCount > 0 ? 'border-[#026892] text-[#026892]' : ''}`}
            >
              <Filter className="h-4 w-4" />
              Filter
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 bg-[#026892] text-white text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border">
              {/* Department Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  Department
                </label>
                <Select 
                  value={filters.departmentFilter} 
                  onValueChange={(value) => setFilters({ ...filters, departmentFilter: value })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* School Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  School
                </label>
                <Select 
                  value={filters.schoolFilter} 
                  onValueChange={(value) => setFilters({ ...filters, schoolFilter: value })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    {schools.map((school) => (
                      <SelectItem key={school} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select 
                  value={filters.statusFilter} 
                  onValueChange={(value) => setFilters({ ...filters, statusFilter: value })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Under Review</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select 
                  value={filters.categoryFilter} 
                  onValueChange={(value) => setFilters({ ...filters, categoryFilter: value })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <div className="md:col-span-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Results Count and Items per Page */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredCount)} of {filteredCount} documents
              {filteredCount !== totalCount && ` (filtered from ${totalCount} total)`}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Items per page:</span>
              <Select 
                value={pagination.itemsPerPage.toString()} 
                onValueChange={(value) => setPagination({
                  currentPage: 1,
                  itemsPerPage: Number(value)
                })}
              >
                <SelectTrigger className="w-20 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
