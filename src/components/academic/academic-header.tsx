import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function AcademicHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Academic Administration</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Semester 2, 2024-25</span>
        <Button className="bg-[#026892] hover:bg-[#025078] text-white">
          <Calendar className="h-4 w-4 mr-2" />
          Academic Calendar
        </Button>
      </div>
    </div>
  )
}
