import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ResultsProcessing() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Results Processing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-blue-600">89</div>
          <div className="text-sm text-gray-600">Modules in Processing</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">234</div>
            <div className="text-xs text-gray-500">Results Approved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-xs text-gray-500">Pending Moderation</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
