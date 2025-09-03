import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Eye, Edit, Clock } from "lucide-react"
import { DocumentStats } from "./types"

interface DocumentStatsCardsProps {
  stats: DocumentStats
}

export function DocumentStatsCards({ stats }: DocumentStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-white">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">{stats.published}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Edit className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-3xl font-bold text-blue-600">{stats.underReview}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
