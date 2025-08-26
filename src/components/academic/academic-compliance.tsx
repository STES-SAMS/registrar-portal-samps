import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Target } from "lucide-react"

export function AcademicCompliance() {
  const complianceItems = [
    {
      icon: CheckCircle,
      iconColor: "text-green-500",
      title: "Academic Policies",
      status: "Complete",
      badgeClass: "bg-green-100 text-green-700"
    },
    {
      icon: AlertTriangle,
      iconColor: "text-yellow-500",
      title: "Student Progression",
      status: "Review Required",
      badgeClass: "bg-yellow-100 text-yellow-700"
    },
    {
      icon: Target,
      iconColor: "text-blue-500",
      title: "Quality Assurance",
      status: "Active",
      badgeClass: "bg-blue-100 text-blue-700"
    }
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Academic Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {complianceItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <div key={index} className="flex items-center justify-between p-2 rounded border">
              <div className="flex items-center gap-2">
                <IconComponent className={`h-4 w-4 ${item.iconColor}`} />
                <span className="text-sm">{item.title}</span>
              </div>
              <Badge variant="secondary" className={item.badgeClass}>
                {item.status}
              </Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
