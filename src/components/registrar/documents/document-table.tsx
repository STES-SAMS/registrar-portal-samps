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
import { FileText, Download, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Document } from "./types"

interface DocumentTableProps {
  documents: Document[]
  onClearFilters: () => void
}

export function DocumentTable({ documents, onClearFilters }: DocumentTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Published</Badge>
      case "Draft":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Draft</Badge>
      case "Review":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Under Review</Badge>
      case "Archived":
        return <Badge className="bg-white text-gray-700 border-gray-200">Archived</Badge>
      default:
        return <Badge className="bg-white text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4 text-[#026892]" />
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
        <CardTitle className="text-xl text-gray-900">Document Library</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead className="font-semibold text-black">Document ID</TableHead>
                <TableHead className="font-semibold text-black">Name</TableHead>
                <TableHead className="font-semibold text-black">Type</TableHead>
                <TableHead className="font-semibold text-black">Size</TableHead>
                <TableHead className="font-semibold text-black">Date</TableHead>
                <TableHead className="font-semibold text-black">Department</TableHead>
                <TableHead className="font-semibold text-black">School</TableHead>
                <TableHead className="font-semibold text-black">Status</TableHead>
                <TableHead className="text-right font-semibold text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id} className="hover:bg-white transition-colors text-black">
                  <TableCell className="text-black">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(document.type)}
                      <span className="font-medium text-black">{document.documentId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{document.name}</div>
                      <div className="text-sm text-gray-500">{document.author}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-gray-700 border-gray-200">
                      {document.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{document.size}</TableCell>
                  <TableCell className="text-gray-600">{formatDate(document.date)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{document.department}</div>
                      <div className="text-gray-500">{document.category}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{document.school}</TableCell>
                  <TableCell>{getStatusBadge(document.status)}</TableCell>
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
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {documents.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
