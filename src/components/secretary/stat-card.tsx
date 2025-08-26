import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  variant?: "primary" | "success" | "warning" | "danger"
}

export function StatCard({ title, value, subtitle, icon: Icon, variant = "primary" }: StatCardProps) {
  const variantStyles = {
    primary: {
      text: "text-[#026892]",
      bg: "bg-[#026892]/10",
      icon: "text-[#026892]"
    },
    success: {
      text: "text-green-600", 
      bg: "bg-green-50",
      icon: "text-green-600"
    },
    warning: {
      text: "text-orange-600",
      bg: "bg-orange-50", 
      icon: "text-orange-600"
    },
    danger: {
      text: "text-red-600",
      bg: "bg-red-50",
      icon: "text-red-600"
    }
  }

  const styles = variantStyles[variant]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className={`text-2xl font-bold ${styles.text}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          </div>
          <div className={`p-2 rounded-lg ${styles.bg}`}>
            <Icon className={`h-5 w-5 ${styles.icon}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
