import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Calendar } from "lucide-react"
import { mockResults } from './mock-data'

export function ResultProcessingSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Processing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Total Results</span>
              <span className="font-medium">{mockResults.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Processed Today</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Average Processing Time</span>
              <span className="font-medium">2.3 days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Module Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Data Structures</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Database Design</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Web Development</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Algorithms</span>
              <span className="font-medium">1</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">Result Approved</p>
              <p className="text-gray-500">Jane Wilson - Database Design</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Result Rejected</p>
              <p className="text-gray-500">Sarah Ahmed - Algorithms</p>
              <p className="text-xs text-gray-400">4 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Under Review</p>
              <p className="text-gray-500">Mike Chen - Web Development</p>
              <p className="text-xs text-gray-400">6 hours ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
