import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface PriorityTaskProps {
  title: string
  count: string
  priority: "Urgent" | "High Priority" | "Medium" | "Low"
  icon?: LucideIcon
}

export function PriorityTask({ title, count, priority, icon: Icon }: PriorityTaskProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return {
          dotColor: "bg-red-500",
          badgeClass: "border-red-200 text-red-700 bg-red-50"
        }
      case "High Priority":
        return {
          dotColor: "bg-orange-500", 
          badgeClass: "border-orange-200 text-orange-700 bg-orange-50"
        }
      case "Medium":
        return {
          dotColor: "bg-[#026892]",
          badgeClass: "border-[#026892]/20 text-[#026892] bg-[#026892]/10"
        }
      case "Low":
        return {
          dotColor: "bg-gray-500",
          badgeClass: "border-gray-200 text-gray-700 bg-gray-50"
        }
      default:
        return {
          dotColor: "bg-gray-500",
          badgeClass: "border-gray-200 text-gray-700 bg-gray-50"
        }
    }
  }

  const config = getPriorityConfig(priority)

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border hover:shadow-sm transition-shadow">
      <div className={`w-2 h-2 rounded-full ${config.dotColor} mt-2 flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900 flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4 text-[#026892]" />}
              {title}
            </p>
            <p className="text-xs text-gray-600 mt-1">{count}</p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={`text-xs mt-2 ${config.badgeClass}`}
        >
          {priority}
        </Badge>
      </div>
    </div>
  )
}
