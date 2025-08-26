import React from "react"
import { Button } from "@/components/ui/button"
import { BarChart3, Plus } from "lucide-react"

interface ReportsHeaderProps {
  onCreateReport: () => void
}

export function ReportsHeader({ onCreateReport }: ReportsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-[#026892]" />
          Reports & Analytics
        </h1>
        <p className="text-gray-600">Generate and manage institutional reports</p>
      </div>
      
      <Button 
        className="bg-[#026892] hover:bg-[#024f70] text-white font-medium flex items-center gap-2"
        onClick={onCreateReport}
      >
        <Plus className="h-4 w-4" />
        Create Report
      </Button>
    </div>
  )
}
