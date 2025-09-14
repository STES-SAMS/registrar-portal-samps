"use client"

import { ReactNode } from "react"
import { RegistrarSidebar } from "@/components/registrar-sidebar"
import { RegistrarHeader } from "@/components/registrar/header"

interface RegistrarLayoutProps {
  children: ReactNode
  role: "registrar" | "registrar-secretary" | "registrar-admission" | "registrar-academics"
  title?: string
  className?: string
}

export function RegistrarLayout({ children, role, title, className }: RegistrarLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 z-50">
        <RegistrarSidebar role={role} />
      </div>

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Fixed Header */}
        <RegistrarHeader title={title} role={role} />

        {/* Scrollable Main Content */}
        <main className="pt-16">
          <div className={className || "p-6"}>
            {/* <RegistrarLayout role={role}> */}
              {children}
            {/* </RegistrarLayout> */}
          </div>
        </main>
      </div>
    </div>
  )
}
