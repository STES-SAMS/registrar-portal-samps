"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2, RefreshCw } from "lucide-react"
import { CreateCourseDialog } from "./CreateCourseDialog"
import { CreateModuleData, Department, Semester } from "./types"

interface SearchAndActionsProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onRefresh: () => void
  loading: boolean
  // Create dialog props
  createDialogOpen: boolean
  onCreateDialogOpenChange: (open: boolean) => void
  formData: CreateModuleData
  onFormDataChange: (field: keyof CreateModuleData, value: string) => void
  departments: Department[]
  semesters: Semester[]
  onCreateSubmit: () => void
  createLoading: boolean
}

export function SearchAndActions({
  searchTerm,
  onSearchChange,
  onRefresh,
  loading,
  createDialogOpen,
  onCreateDialogOpenChange,
  formData,
  onFormDataChange,
  departments,
  semesters,
  onCreateSubmit,
  createLoading
}: SearchAndActionsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
        />
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh
        </Button>
        
        <CreateCourseDialog
          open={createDialogOpen}
          onOpenChange={onCreateDialogOpenChange}
          formData={formData}
          onFormDataChange={onFormDataChange}
          departments={departments}
          semesters={semesters}
          onSubmit={onCreateSubmit}
          loading={createLoading}
        />
      </div>
    </div>
  )
}
