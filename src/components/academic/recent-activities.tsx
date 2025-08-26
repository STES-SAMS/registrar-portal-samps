import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileText, Award, AlertTriangle } from "lucide-react"

export function RecentActivities() {
  const activities = [
    {
      icon: CheckCircle,
      iconColor: "text-green-500",
      title: "45 exam schedules finalized",
      time: "15 minutes ago"
    },
    {
      icon: FileText,
      iconColor: "text-blue-500",
      title: "23 transcripts processed",
      time: "1 hour ago"
    },
    {
      icon: Award,
      iconColor: "text-purple-500",
      title: "Results moderation completed",
      time: "2 hours ago"
    },
    {
      icon: AlertTriangle,
      iconColor: "text-orange-500",
      title: "Student progression reviewed",
      time: "3 hours ago"
    }
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon
          return (
            <div key={index} className="flex items-start gap-3 p-2">
              <IconComponent className={`h-4 w-4 ${activity.iconColor} mt-0.5`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{activity.title}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
