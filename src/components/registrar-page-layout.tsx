"use client"

import { RegistrarSidebar } from "@/components/registrar-sidebar"

interface RegistrarPageLayoutProps {
  children: React.ReactNode
  role: "registrar" | "registrar-secretary" | "registrar-admission" | "registrar-academics"
}

export function RegistrarPageLayout({ children, role }: RegistrarPageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <RegistrarSidebar role={role} />
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-8 bg-white shadow border-b">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="UR Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold text-blue-600">SAMPS UR</span>
          </div>
          <div className="flex items-center gap-6">
            <select className="text-sm border rounded px-3 py-1">
              <option>2024 Semester 1</option>
            </select>
            <select className="text-sm border rounded px-3 py-1">
              <option>
                {role === "registrar" ? "Registrar" : 
                 role === "registrar-secretary" ? "Secretary" :
                 role === "registrar-admission" ? "Admission" : "Academics"}
              </option>
            </select>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</div>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
