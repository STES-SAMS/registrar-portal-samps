"use client"

import React from "react"
import { RegistrarLayout } from "@/components/registrar/layout"
import { DocumentManagement } from "@/components/registrar/documents"

export default function DocumentsPage() {
  return (
    <RegistrarLayout role="registrar">
      <DocumentManagement />
    </RegistrarLayout>
  )
}
