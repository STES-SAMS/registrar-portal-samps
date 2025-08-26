import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReportTemplate } from "./types"

interface CreateReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates: ReportTemplate[]
}

export function CreateReportDialog({ open, onOpenChange, templates }: CreateReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
          <DialogDescription>
            Choose a report template or create a custom report from scratch.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {templates.map((template) => {
            const IconComponent = template.icon
            return (
              <Card key={template.id} className="border border-gray-200 hover:border-[#026892] transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-[#026892] bg-opacity-10">
                      <IconComponent className="h-5 w-5 text-[#026892]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-[#026892] hover:bg-[#024f70] text-white"
                    onClick={() => onOpenChange(false)}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
