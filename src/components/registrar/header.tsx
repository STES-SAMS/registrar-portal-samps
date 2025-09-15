"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import { fetchAcademicYears, fetchAcademicSemesters } from '@/lib/api-semester'

interface HeaderProps {
  title?: string
  role?: "registrar" | "registrar-secretary" | "registrar-admission" | "registrar-academics"
  onAcademicDataUpdate?: (data: {
    academicYears: AcademicYear[];
    selectedYear: string;
    academicSemesters: Semester[];
    selectedSemester: string;
    isLoading: boolean;
    error: string | null;
  }) => void;
  onYearChange?: (yearId: string) => void;
  onSemesterChange?: (semesterId: string) => void;
}

// Define types for our data structures
interface AcademicYear {
  id?: string
  uuid?: string
  name?: string
  title?: string
  year?: string
}

interface Semester {
  id?: string
  uuid?: string
  name?: string
  title?: string
  semester?: string
  isActive?: boolean
  isCurrent?: boolean
}

const roleConfigs = {
  registrar: {
    title: "Registrar",
    color: "#026892",
    path: "/registrar",
  },
  "registrar-secretary": {
    title: " Secretary",
    color: "#026892",
    path: "/registrar-secretary",
  },
  "registrar-admission": {
    title: "Admission",
    color: "#026892",
    path: "/registrar-admission",
  },
  "registrar-academics": {
    title: "Academic",
    color: "#026892",
    path: "/registrar-academics",
  }
}

export function RegistrarHeader({ title, role = "registrar", onAcademicDataUpdate, onYearChange, onSemesterChange }: HeaderProps) {
  const currentRole = roleConfigs[role]
  
  // Academic years/semesters dropdown state
  const [academicYears, setAcademicYears] = React.useState<AcademicYear[]>([])
  const [selectedYear, setSelectedYear] = React.useState<string>('')
  const [academicSemesters, setAcademicSemesters] = React.useState<Semester[]>([])
  const [selectedAcademicSemester, setSelectedAcademicSemester] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Function to update the academic context whenever data changes
  const updateAcademicContext = React.useCallback(() => {
    if (onAcademicDataUpdate) {
      onAcademicDataUpdate({
        academicYears,
        selectedYear,
        academicSemesters,
        selectedSemester: selectedAcademicSemester,
        isLoading,
        error,
      });
    }
  }, [onAcademicDataUpdate, academicYears, selectedYear, academicSemesters, selectedAcademicSemester, isLoading, error]);

  // Update context whenever relevant data changes
  React.useEffect(() => {
    updateAcademicContext();
  }, [updateAcademicContext]);

  const handleRoleSwitch = (newRole: keyof typeof roleConfigs) => {
    window.location.href = roleConfigs[newRole].path
  }

  // Handler for year selection with callback support
  const handleYearChange = async (value: string) => {
    console.log('Selected academic year:', value)
    setSelectedYear(value)
    
    // Call the change callback if provided
    if (onYearChange) {
      onYearChange(value);
    }
  }

  // Handler for semester selection with callback support
  const handleSemesterChange = (value: string) => {
    console.log('Selected semester:', value)
    setSelectedAcademicSemester(value)
    
    // Call the change callback if provided
    if (onSemesterChange) {
      onSemesterChange(value);
    }
  }

  const handleLogout = () => {
    window.location.href = "/"
  }





  // Fetch academic years on mount
  React.useEffect(() => {
    let mounted = true
    const loadYears = async () => {
      setIsLoading(true)
      setError(null)
      try {
        console.log('Fetching academic years...')
        const res = await fetchAcademicYears()
        console.log('Academic years response:', res)
        const years = res?.data?.content || res?.data || []
        console.log('Processed years:', years)
        if (!mounted) return
        setAcademicYears(years)
        if (years.length > 0) {
          const firstYear = years[0]
          setSelectedYear(firstYear.id || firstYear.uuid || '')
        }
      } catch (err) {
        console.error('Error loading academic years:', err)
        if (!mounted) return
        const errorMessage = err instanceof Error ? err.message : 'Failed to load academic years'
        const axiosError = err as any
        if (axiosError?.response) {
          console.error('API Error Response:', axiosError.response)
          setError(`API Error: ${axiosError.response.status} - ${axiosError.response.statusText}`)
        } else if (axiosError?.request) {
          console.error('Network Error:', axiosError.request)
          setError('Network Error: Unable to reach server')
        } else {
          setError(errorMessage)
        }
        setAcademicYears([])
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    void loadYears()
    return () => { mounted = false }
  }, [])

  // Fetch academic semesters when selectedYear changes
  React.useEffect(() => {
    let mounted = true
    const loadAcademicSemesters = async () => {
      if (!selectedYear) {
        setAcademicSemesters([])
        setSelectedAcademicSemester('')
        return
      }
      setIsLoading(true)
      setError(null)
      try {
        console.log('Fetching academic semesters for year:', selectedYear)
        const res = await fetchAcademicSemesters(selectedYear)
        console.log('Academic semesters response:', res)
        const sems = res?.data?.content || res?.data || []
        console.log('Processed semesters:', sems)
        if (!mounted) return
        setAcademicSemesters(sems)
        if (sems.length > 0) {
          const firstSem = sems[0]
          setSelectedAcademicSemester(firstSem.id || firstSem.uuid || '')
        }
      } catch (err) {
        console.error('Error loading academic semesters:', err)
        if (!mounted) return
        const errorMessage = err instanceof Error ? err.message : 'Failed to load semesters'
        const axiosError = err as any
        if (axiosError?.response) {
          console.error('API Error Response:', axiosError.response)
          setError(`API Error: ${axiosError.response.status} - ${axiosError.response.statusText}`)
        } else if (axiosError?.request) {
          console.error('Network Error:', axiosError.request)
          setError('Network Error: Unable to reach server')
        } else {
          setError(errorMessage)
        }
        setAcademicSemesters([])
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    void loadAcademicSemesters()
    return () => { mounted = false }
  }, [selectedYear])

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-[#026892]">SAMPS UR</span>
          </div>
          {title && (
            <>
              <div className="w-px h-6 bg-gray-300"></div>
              <span className="text-lg font-medium text-gray-700">{title}</span>
            </>
          )}
        </div>

        {/* Right Section - Search, Controls, Profile */}
        <div className="flex items-center gap-4">

    

        {/* Academic Year Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center text-black">
                  <span className="hidden md:inline-block">
                    {academicYears.find(y => (y.id === selectedYear || y.uuid === selectedYear))?.name || 
                     academicYears.find(y => (y.id === selectedYear || y.uuid === selectedYear))?.title ||
                     "Select Year"}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 bg-white shadow-lg border border-gray-100">
                {isLoading ? (
                  <DropdownMenuItem disabled className="text-gray-400">Loading...</DropdownMenuItem>
                ) : error ? (
                  <>
                    <DropdownMenuItem disabled className="text-red-500">{error}</DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      Retry
                    </DropdownMenuItem>
                  </>
                ) : academicYears.length === 0 ? (
                  <DropdownMenuItem disabled className="text-gray-400">No years found</DropdownMenuItem>
                ) : (
                  academicYears.map((year) => (
                    <DropdownMenuItem
                      key={year.id || year.uuid}
                      className="text-black hover:bg-white/10 focus:bg-white/10 focus:text-black"
                      onClick={() => handleYearChange(year.id || year.uuid || '')}
                    >
                      {year.name || year.title || year.year}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Academic Semester Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center text-black">
                  <span className="hidden md:inline-block">
                    {academicSemesters.find(s => (s.id === selectedAcademicSemester || s.uuid === selectedAcademicSemester))?.name || 
                     academicSemesters.find(s => (s.id === selectedAcademicSemester || s.uuid === selectedAcademicSemester))?.title ||
                     "Select Semester"}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 bg-white shadow-lg border border-gray-100">
                {isLoading ? (
                  <DropdownMenuItem disabled className="text-gray-400">Loading...</DropdownMenuItem>
                ) : error ? (
                  <>
                    <DropdownMenuItem disabled className="text-red-500">{error}</DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      Retry
                    </DropdownMenuItem>
                  </>
                ) : academicSemesters.length === 0 ? (
                  <DropdownMenuItem disabled className="text-gray-400">No semesters found</DropdownMenuItem>
                ) : (
                  academicSemesters.map((semester) => (
                    <DropdownMenuItem
                      key={semester.id || semester.uuid}
                      className="text-black hover:bg-white/10 focus:bg-white/10 focus:text-black"
                      onClick={() => setSelectedAcademicSemester(semester.id || semester.uuid || '')}
                    >
                      {semester.name || semester.title || semester.semester}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>


          {/* Role Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">

                {currentRole.title}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Switch Role</p>
                <p className="text-xs text-muted-foreground">Select a different registrar portal</p>
              </div>
              <DropdownMenuSeparator />
              {Object.entries(roleConfigs).map(([roleKey, roleConfig]) => (
                <DropdownMenuItem
                  key={roleKey}
                  onClick={() => handleRoleSwitch(roleKey as keyof typeof roleConfigs)}
                  className={`flex items-center gap-3 px-2 py-2 ${role === roleKey ? 'bg-accent' : ''}`}
                >

                  <div className="flex-1">
                    <p className="text-sm font-medium">{roleConfig.title}</p>
                    {role === roleKey && <p className="text-xs text-muted-foreground">Current role</p>}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
              5
            </span>
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Profile Picture" width={32} height={32} className="rounded-full" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                My Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Appearance
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}