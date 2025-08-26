"use client"

import { RegistrarLayout } from "@/components/registrar/layout"
import { ResultProcessing } from "@/components/academic"

export default function ResultProcessingPage() {
  return (
    <RegistrarLayout role="registrar-academics" title="Result Processing">
      <ResultProcessing />
    </RegistrarLayout>
  )
}