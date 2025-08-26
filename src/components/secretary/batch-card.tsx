import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface BatchCardProps {
  batchId: string
  name: string
  progress: number
  total: number
  completed: number
  status: "In Progress" | "Queued" | "Urgent" | "Completed"
  estimatedCompletion?: string
}

export function BatchCard({ 
  batchId, 
  name, 
  progress, 
  total, 
  completed, 
  status,
  estimatedCompletion 
}: BatchCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Badge className="bg-[#026892] hover:bg-[#025078] text-white">{status}</Badge>
      case "Queued":
        return <Badge variant="secondary">{status}</Badge>
      case "Urgent":
        return <Badge variant="destructive">{status}</Badge>
      case "Completed":
        return <Badge className="bg-green-600 hover:bg-green-700 text-white">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm text-[#026892]">{batchId}</span>
          <span className="text-sm text-gray-600">({name})</span>
        </div>
        {getStatusBadge(status)}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>
            {completed} of {total} completed • {total - completed} remaining
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        {estimatedCompletion && (
          <p className="text-xs text-gray-500">Est. completion: {estimatedCompletion}</p>
        )}
      </div>
    </div>
  )
}
