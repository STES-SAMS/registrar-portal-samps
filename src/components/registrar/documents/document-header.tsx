import React from "react"
import { Button } from "@/components/ui/button"
import { FileText, Upload } from "lucide-react"

export function DocumentHeader() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-8 w-8 text-[#026892]" />
          Document Management
        </h1>
        <p className="text-gray-600">Manage institutional documents and resources</p>
      </div>
      
      <Button className="bg-[#026892] hover:bg-[#024f70] text-white font-medium flex items-center gap-2">
        <Upload className="h-4 w-4" />
        Upload Document
      </Button>
    </div>
  )
}
