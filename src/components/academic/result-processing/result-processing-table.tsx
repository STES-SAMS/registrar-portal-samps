import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Edit, MessageSquare, MoreHorizontal } from "lucide-react"
import { ResultRecord } from './types'

interface ResultProcessingTableProps {
  results: ResultRecord[]
  selectedResults: string[]
  onSelectAll: (checked: boolean) => void
  onSelectResult: (resultId: string, checked: boolean) => void
}

export function ResultProcessingTable({ 
  results, 
  selectedResults, 
  onSelectAll, 
  onSelectResult 
}: ResultProcessingTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Under Review</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Results Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedResults.length === results.length && results.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Course/Module</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Marks/Grade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedResults.includes(result.id)}
                    onCheckedChange={(checked) => onSelectResult(result.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{result.studentName}</p>
                    <p className="text-sm text-gray-500">{result.studentId}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{result.module}</p>
                    <p className="text-sm text-gray-500">{result.course}</p>
                  </div>
                </TableCell>
                <TableCell>{result.semester}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{result.marks}/100</p>
                    <Badge variant="outline" className="text-xs">{result.grade}</Badge>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(result.status)}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{result.submittedBy}</p>
                    <p className="text-xs text-gray-500">{result.submittedDate}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {result.moderatedBy ? (
                    <div>
                      <p className="text-sm">{result.moderatedBy}</p>
                      <p className="text-xs text-gray-500">{result.moderatedDate}</p>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
