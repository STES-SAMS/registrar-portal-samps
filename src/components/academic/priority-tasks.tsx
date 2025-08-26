import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PriorityTasks() {
  const tasks = [
    {
      title: "Resolve Timetable Conflicts",
      description: "12 conflicts need immediate attention",
      priority: "Urgent",
      bgClass: "bg-red-50",
      borderClass: "border-red-500",
      badgeClass: "bg-red-500 text-white"
    },
    {
      title: "Process Transcripts",
      description: "156 requests awaiting processing",
      priority: "High Priority",
      bgClass: "bg-orange-50",
      borderClass: "border-orange-500",
      badgeClass: "bg-orange-500 text-white"
    },
    {
      title: "Graduation Review",
      description: "856 candidates for final review",
      priority: "Medium",
      bgClass: "bg-blue-50",
      borderClass: "border-blue-500",
      badgeClass: "bg-blue-500 text-white"
    }
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Priority Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className={`flex items-center justify-between p-3 ${task.bgClass} rounded-lg border-l-4 ${task.borderClass}`}>
            <div>
              <div className="font-medium text-sm">{task.title}</div>
              <div className="text-xs text-gray-600">{task.description}</div>
            </div>
            <Badge className={task.badgeClass}>{task.priority}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
