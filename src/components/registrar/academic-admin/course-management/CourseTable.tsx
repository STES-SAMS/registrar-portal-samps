"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Edit, 
  Eye, 
  BookOpen,
  Loader2
} from "lucide-react"
import { Module } from "./types"

interface CourseTableProps {
  modules: Module[]
  loading: boolean
  onViewModule: (module: Module) => void
  onEditModule?: (module: Module) => void
}

export function CourseTable({ modules, loading, onViewModule, onEditModule }: CourseTableProps) {
  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
    }
    return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Inactive</Badge>
  }

  const getTypeBadge = (isCore: boolean, isElective: boolean) => {
    if (isCore) {
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Core</Badge>
    }
    if (isElective) {
      return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Elective</Badge>
    }
    return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Other</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading courses...
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-white">
          <TableHead className="font-semibold text-black">Course Code</TableHead>
          <TableHead className="font-semibold text-black">Course Name</TableHead>
          <TableHead className="font-semibold text-black">Department</TableHead>
          <TableHead className="font-semibold text-black">Credits</TableHead>
          <TableHead className="font-semibold text-black">Level</TableHead>
          <TableHead className="font-semibold text-black">Type</TableHead>
          <TableHead className="font-semibold text-black">Status</TableHead>
          <TableHead className="text-right font-semibold text-black">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modules.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
              No courses found
            </TableCell>
          </TableRow>
        ) : (
          modules.map((module) => (
            <TableRow key={module.id} className="hover:bg-white transition-colors">
              <TableCell className="font-bold text-black">{module.code}</TableCell>
              <TableCell className="font-medium">{module.name}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{module.departmentName}</span>
                  <span className="text-sm text-gray-500">{module.schoolName}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span>{module.credits}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{module.levelDescription}</span>
                  <span className="text-xs text-gray-500">Sem {module.semesterOffered}</span>
                </div>
              </TableCell>
              <TableCell>
                {getTypeBadge(module.isCore, module.isElective)}
              </TableCell>
              <TableCell>
                {getStatusBadge(module.isActive)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white"
                    onClick={() => onViewModule(module)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {onEditModule && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-[#026892] hover:bg-[#026892] hover:text-white"
                      onClick={() => onEditModule(module)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
