import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ReportTemplate } from "./types"

interface ReportTemplatesProps {
  templates: ReportTemplate[]
  onTemplateClick: (templateId: string) => void
}

export function ReportTemplates({ templates, onTemplateClick }: ReportTemplatesProps) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Quick Report Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => {
            const IconComponent = template.icon
            return (
              <Card key={template.id} className="border border-gray-200 hover:border-[#026892] transition-colors cursor-pointer hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-opacity-10">
                      <IconComponent className="h-5 w-5 text-[#026892]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-fit mt-3 bg-[#026892] hover:bg-[#024f70] text-white"
                    onClick={() => onTemplateClick(template.id)}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
