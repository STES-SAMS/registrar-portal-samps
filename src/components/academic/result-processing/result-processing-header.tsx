import { Button } from "@/components/ui/button"
import { Upload, Download, FileText } from "lucide-react"

export function ResultProcessingHeader() {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Result Processing</h1>
        <p className="text-gray-600 mt-1">Manage and moderate academic results</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import Results
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  )
}
