import { LucideIcon } from "lucide-react"

interface ActivityItemProps {
  title: string
  time: string
  icon: LucideIcon
  variant?: "success" | "warning" | "info" | "default"
}

export function ActivityItem({ title, time, icon: Icon, variant = "default" }: ActivityItemProps) {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "success":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600"
        }
      case "warning":
        return {
          iconBg: "bg-orange-100", 
          iconColor: "text-orange-600"
        }
      case "info":
        return {
          iconBg: "bg-[#026892]/10",
          iconColor: "text-[#026892]"
        }
      default:
        return {
          iconBg: "bg-gray-100",
          iconColor: "text-gray-600"
        }
    }
  }

  const styles = getVariantStyles(variant)

  return (
    <div className="flex items-start gap-3">
      <div className={`p-1 rounded-full ${styles.iconBg}`}>
        <Icon className={`h-3 w-3 ${styles.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}
