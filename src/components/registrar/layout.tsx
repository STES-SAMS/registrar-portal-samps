"use client"

import { ReactNode, useState, useCallback } from "react"
import { RegistrarSidebar } from "@/components/registrar-sidebar"
import { RegistrarHeader } from "@/components/registrar/header"
import { AcademicContextProvider } from "@/appContext/academicContext"

interface RegistrarLayoutProps {
  children: ReactNode
  role: "registrar" | "registrar-secretary" | "registrar-admission" | "registrar-academics"
  title?: string
  className?: string
}

export function RegistrarLayout({ children, role, title, className }: RegistrarLayoutProps) {
  // State to store academic context data from header
  const [academicContextData, setAcademicContextData] = useState({
    academicYears: [],
    selectedYear: '',
    academicSemesters: [],
    selectedSemester: '',
    isLoading: false,
    error: null as string | null,
  });

  // Callbacks to handle changes from header
  const handleYearChange = useCallback((yearId: string) => {
    setAcademicContextData(prev => ({ ...prev, selectedYear: yearId }));
  }, []);

  const handleSemesterChange = useCallback((semesterId: string) => {
    setAcademicContextData(prev => ({ ...prev, selectedSemester: semesterId }));
  }, []);

  // Callback to update academic context data from header
  const handleAcademicDataUpdate = useCallback((data: any) => {
    setAcademicContextData(data);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 z-50">
        <RegistrarSidebar role={role} />
      </div>

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Fixed Header */}
        <RegistrarHeader 
          title={title} 
          role={role}
          onAcademicDataUpdate={handleAcademicDataUpdate}
          onYearChange={handleYearChange}
          onSemesterChange={handleSemesterChange}
        />

        {/* Scrollable Main Content with Academic Context */}
        <main className="pt-16">
          <div className={className || "p-6"}>
            <AcademicContextProvider
              academicYears={academicContextData.academicYears}
              selectedYear={academicContextData.selectedYear}
              academicSemesters={academicContextData.academicSemesters}
              selectedSemester={academicContextData.selectedSemester}
              isLoading={academicContextData.isLoading}
              error={academicContextData.error}
              onYearChange={handleYearChange}
              onSemesterChange={handleSemesterChange}
            >
              {children}
            </AcademicContextProvider>
          </div>
        </main>
      </div>
    </div>
  )
}
