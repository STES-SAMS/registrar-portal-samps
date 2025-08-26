import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, AlertTriangle } from "lucide-react"

export function TimetableManagement() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Timetable Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm">Conflicts Detected</span>
          </div>
          <span className="text-xl font-bold text-red-500">12</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div className="bg-red-500 h-2 rounded-full w-1/6"></div>
        </div>
        <div className="text-xs text-gray-500">75% resolved</div>
      </CardContent>
    </Card>
  )
}
