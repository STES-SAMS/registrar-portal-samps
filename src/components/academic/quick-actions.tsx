import React, { useState } from "react";
import { Marks } from "./marks/marks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, FileText, GraduationCap } from "lucide-react"

export function QuickActions() {
  const [showMarks, setShowMarks] = React.useState(false);
  const actions = [
    {
      icon: AlertTriangle,
      label: "Resolve Conflicts",
      primary: true
    },
    {
      icon: Calendar,
      label: "Schedule Exams",
      primary: false
    },
    {
      icon: FileText,
      label: "Process Transcripts",
      primary: false
    },
    {
      icon: GraduationCap,
      label: "Review Graduation",
      primary: false
    },
    {
      icon: FileText,
      label: "View All Student Marks",
      primary: false,
      onClick: () => setShowMarks(true)
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {!showMarks ? (
          actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button 
                key={index}
                className={action.primary 
                  ? "w-full justify-start bg-[#026892] hover:bg-[#025078] text-white"
                  : "w-full justify-start"
                }
                variant={action.primary ? "default" : "outline"}
                onClick={action.onClick}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            );
          })
        ) : (
          <div>
            <Button variant="outline" className="mb-4" onClick={() => setShowMarks(false)}>
              Back to Quick Actions
            </Button>
            {/* Render Marks component */}
            <Marks />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
