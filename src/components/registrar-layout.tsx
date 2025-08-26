"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RegistrarLayoutProps {
  children: ReactNode
  role: "registrar" | "registrar-secretary" | "registrar-admission" | "registrar-academics"
  className?: string
}

export function RegistrarLayout({ children, role, className }: RegistrarLayoutProps) {
  // Apply registrar secretary specific styling
  const isRegistrarSecretary = role === "registrar-secretary"
  const roles = [
    { label: "Registrar", value: "registrar" },
    { label: "Secretary", value: "registrar-secretary" },
    { label: "Admission", value: "registrar-admission" },
    { label: "Academics", value: "registrar-academics" },
  ]
  const semesters = [
    "2024 Semester 1",
    "2024 Semester 2",
    "2025 Semester 1",
    "2025 Semester 2",
  ]
  // Dummy notification count
  const notificationCount = 5

  // Handler for role switch
  const handleRoleSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value
    // You may want to route to a different page or update context here
    window.location.href =
      newRole === "registrar"
        ? "/registrar"
        : newRole === "registrar-secretary"
        ? "/registrar-secretary"
        : newRole === "registrar-admission"
        ? "/registrar-admission"
        : newRole === "registrar-academics"
        ? "/registrar-academics"
        : "/" // fallback for lecturer
  }

  return (
    <div
      className={cn(
        "min-h-screen",
        isRegistrarSecretary ? "bg-white text-black" : "bg-background text-foreground",
        className,
      )}
      style={
        isRegistrarSecretary
          ? {
              backgroundColor: "white",
              color: "black",
            }
          : undefined
      }
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b px-6 py-3 bg-white" style={{ minHeight: 56 }}>
        <div className="font-bold text-xl text-[#026892] tracking-tight">SAMPS UR</div>
        <div className="flex items-center gap-4">
          {/* Semester Dropdown */}
          <select className="border rounded px-3 py-1 text-sm" defaultValue={semesters[0]}>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
          
          {/* Notification Bell */}
          <div className="relative">
            <button className="border rounded-full p-2 bg-white hover:bg-gray-100">
              {/* Bell icon (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{notificationCount}</span>
              )}
            </button>
          </div>
          {/* Profile Avatar */}
          <div className="ml-2">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-8 h-8 rounded-full border" />
          </div>
        </div>
      </header>
      {/* Page Content */}
      {children}
    </div>
  )
}
