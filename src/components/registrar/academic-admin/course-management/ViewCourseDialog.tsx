"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BookOpen } from "lucide-react"
import { Module } from "./types"

interface ViewCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  module: Module | null
}

export function ViewCourseDialog({ open, onOpenChange, module }: ViewCourseDialogProps) {
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

  if (!module) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Details: {module.fullName}
          </DialogTitle>
          <DialogDescription>
            Detailed information about the selected course/module.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Course Code:</span>
                    <span className="font-bold text-[#026892]">{module.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Course Name:</span>
                    <span className="text-right">{module.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Credits:</span>
                    <span className="font-semibold">{module.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Level:</span>
                    <span>{module.levelDescription}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Semester:</span>
                    <span>Semester {module.semesterOffered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Type:</span>
                    <div>{getTypeBadge(module.isCore, module.isElective)}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <div>{getStatusBadge(module.isActive)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Department Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Department:</span>
                    <span>{module.departmentName} ({module.departmentCode})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">School:</span>
                    <span>{module.schoolName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">College:</span>
                    <span>{module.collegeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Institution:</span>
                    <span>{module.institutionName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hours and Workload */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Hours & Workload</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-700">{module.contactHours}</div>
                <div className="text-sm text-blue-600">Contact Hours</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-green-700">{module.lectureHours}</div>
                <div className="text-sm text-green-600">Lecture Hours</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-purple-700">{module.tutorialHours}</div>
                <div className="text-sm text-purple-600">Tutorial Hours</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-orange-700">{module.practicalHours}</div>
                <div className="text-sm text-orange-600">Practical Hours</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-700">{module.selfStudyHours}</div>
                <div className="text-sm text-gray-600">Self Study Hours</div>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-indigo-700">{module.totalContactHours}</div>
                <div className="text-sm text-indigo-600">Total Contact</div>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-teal-700">{module.totalStudyHours}</div>
                <div className="text-sm text-teal-600">Total Study</div>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-pink-700">{module.workloadPerCredit.toFixed(1)}</div>
                <div className="text-sm text-pink-600">Hours/Credit</div>
              </div>
            </div>
          </div>

          {/* Assessment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Assessment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-yellow-700">{module.minimumPassMark}%</div>
                <div className="text-sm text-yellow-600">Minimum Pass Mark</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-red-700">{module.maximumRetakes}</div>
                <div className="text-sm text-red-600">Maximum Retakes</div>
              </div>
            </div>
          </div>

          {/* Description and Details */}
          {module.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{module.description}</p>
            </div>
          )}

          {module.prerequisites && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{module.prerequisites}</p>
            </div>
          )}

          {module.learningOutcomes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Outcomes</h3>
              <p className="text-gray-700 bg-green-50 p-3 rounded-lg">{module.learningOutcomes}</p>
            </div>
          )}

          {module.assessmentMethods && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Assessment Methods</h3>
              <p className="text-gray-700 bg-purple-50 p-3 rounded-lg">{module.assessmentMethods}</p>
            </div>
          )}

          {module.recommendedTextbooks && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Textbooks</h3>
              <p className="text-gray-700 bg-orange-50 p-3 rounded-lg">{module.recommendedTextbooks}</p>
            </div>
          )}

          {/* Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-700">{module.totalProgramModules}</div>
                <div className="text-sm text-blue-600">Program Modules</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-green-700">{module.totalAssignments}</div>
                <div className="text-sm text-green-600">Assignments</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-purple-700">{module.totalMaterials}</div>
                <div className="text-sm text-purple-600">Materials</div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Created:</span>
                  <span className="text-sm">{module.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Updated:</span>
                  <span className="text-sm">{module.updatedAt}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Requires Practical:</span>
                  <span className={module.requiresPracticalWork ? "text-green-600 font-semibold" : "text-gray-500"}>
                    {module.requiresPracticalWork ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Has Prerequisites:</span>
                  <span className={module.hasPrerequisites ? "text-orange-600 font-semibold" : "text-gray-500"}>
                    {module.hasPrerequisites ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
