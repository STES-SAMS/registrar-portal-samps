"use client"

import React from "react"
import { RegistrarLayout } from "@/components/registrar/layout"
import { ReportsManagement } from "@/components/registrar/reports"

export default function ReportsPage() {
  return (
    <RegistrarLayout role="registrar">
      <ReportsManagement />
    </RegistrarLayout>
  )
}
