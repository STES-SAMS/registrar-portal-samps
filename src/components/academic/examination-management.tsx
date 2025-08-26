import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText } from "lucide-react"

export function ExaminationManagement() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Examination Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-500">234</div>
            <div className="text-xs text-gray-500">Exams Scheduled</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">89</div>
            <div className="text-xs text-gray-500">Invigilators Assigned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">156</div>
            <div className="text-xs text-gray-500">Venues Booked</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Exam Scheduling Progress</span>
            <span className="font-medium">89%</span>
          </div>
          <Progress value={89} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
