import { Card } from "@/components/ui/card"
import { 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  TrendingUp, 
  GraduationCap 
} from "lucide-react"

export function AcademicStatsRow() {
  const stats = [
    {
      icon: AlertTriangle,
      iconColor: "text-orange-500",
      title: "Timetable Conflicts",
      value: "12",
      description: "Need resolution"
    },
    {
      icon: CheckCircle,
      iconColor: "text-green-500",
      title: "Exams Scheduled",
      value: "234",
      description: "On time"
    },
    {
      icon: FileText,
      iconColor: "text-blue-500",
      title: "Transcripts Requests",
      value: "156",
      description: "Pending processing"
    },
    {
      icon: TrendingUp,
      iconColor: "text-purple-500",
      title: "Results Processing",
      value: "89",
      description: "Modules in progress"
    },
    {
      icon: GraduationCap,
      iconColor: "text-green-600",
      title: "Graduation Processing",
      value: "856",
      description: "Candidates reviewed"
    }
  ]

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
              {stat.title}
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.description}</div>
          </Card>
        )
      })}
    </div>
  )
}
