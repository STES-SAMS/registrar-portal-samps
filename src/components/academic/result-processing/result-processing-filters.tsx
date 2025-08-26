import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { ResultProcessingFilters } from './types'

interface ResultProcessingFiltersProps {
  filters: ResultProcessingFilters
  onFiltersChange: (filters: ResultProcessingFilters) => void
}

export function ResultProcessingFiltersComponent({ filters, onFiltersChange }: ResultProcessingFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, statusFilter: value })
  }

  const handleCourseChange = (value: string) => {
    onFiltersChange({ ...filters, courseFilter: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filter Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by student name, ID, or module..."
                value={filters.searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <Select value={filters.statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.courseFilter} onValueChange={handleCourseChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Information Systems">Information Systems</SelectItem>
              <SelectItem value="Software Engineering">Software Engineering</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
