"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import {
  AcademicHeader,
  AcademicStatsRow,
  TimetableManagement,
  ExaminationManagement,
  AcademicCompliance,
  PriorityTasks,
  ResultsProcessing,
  QuickActions,
  RecentActivities
} from "@/components/academic"

export default function RegistrarAcademicsDashboard() {
  return (
    <RegistrarLayout role="registrar-academics" title="Academic Administration">
      {/* Header */}
      <AcademicHeader />

      {/* Main Stats Row */}
      <AcademicStatsRow />

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <TimetableManagement />
          <ExaminationManagement />
          <AcademicCompliance />
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          <PriorityTasks />
          <ResultsProcessing />
          <QuickActions />
          <RecentActivities />
        </div>
      </div>
    </RegistrarLayout>
  )
}
