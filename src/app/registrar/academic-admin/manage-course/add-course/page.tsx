"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Loader2 } from "lucide-react"
import { CreateModuleData, Department, Semester } from "@/components/registrar/academic-admin/course-management"

interface CreateCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: CreateModuleData
  onFormDataChange: (field: keyof CreateModuleData, value: string) => void
  departments: Department[]
  semesters: Semester[]
  onSubmit: () => void
  loading: boolean
}

export function CreateCourseDialog({ 
  open, 
  onOpenChange, 
  formData, 
  onFormDataChange, 
  departments,
  semesters, 
  onSubmit, 
  loading 
}: CreateCourseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#026892] hover:bg-[#024f70] text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Course/Module</DialogTitle>
          <DialogDescription>
            Create a new academic module for the current semester.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Course Code *</Label>
              <Input
                id="code"
                placeholder="e.g., COE001"
                value={formData.code}
                onChange={(e) => onFormDataChange('code', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Course Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Web Development"
                value={formData.name}
                onChange={(e) => onFormDataChange('name', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Course description"
              value={formData.description}
              onChange={(e) => onFormDataChange('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="credits">Credits *</Label>
              <Input
                id="credits"
                type="number"
                placeholder="10"
                value={formData.credits}
                onChange={(e) => onFormDataChange('credits', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level *</Label>
              <Select value={formData.level} onValueChange={(value) => onFormDataChange('level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">(100)</SelectItem>
                  <SelectItem value="200">(200)</SelectItem>
                  <SelectItem value="300">(300)</SelectItem>
                  <SelectItem value="400">(400)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="semesterOffered">Semester *</Label>
              <Select value={formData.semesterOffered} onValueChange={(value) => onFormDataChange('semesterOffered', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.length > 0 ? (
                    semesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>
                        {semester.name} ({semester.code})
                        {semester.isActive && <span className="ml-2 text-green-600">• Active</span>}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>No semesters available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactHours">Contact Hours</Label>
              <Input
                id="contactHours"
                type="number"
                placeholder="20"
                value={formData.contactHours}
                onChange={(e) => onFormDataChange('contactHours', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lectureHours">Lecture Hours</Label>
              <Input
                id="lectureHours"
                type="number"
                placeholder="30"
                value={formData.lectureHours}
                onChange={(e) => onFormDataChange('lectureHours', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tutorialHours">Tutorial Hours</Label>
              <Input
                id="tutorialHours"
                type="number"
                placeholder="10"
                value={formData.tutorialHours}
                onChange={(e) => onFormDataChange('tutorialHours', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="practicalHours">Practical Hours</Label>
              <Input
                id="practicalHours"
                type="number"
                placeholder="10"
                value={formData.practicalHours}
                onChange={(e) => onFormDataChange('practicalHours', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="selfStudyHours">Self Study Hours</Label>
              <Input
                id="selfStudyHours"
                type="number"
                placeholder="10"
                value={formData.selfStudyHours}
                onChange={(e) => onFormDataChange('selfStudyHours', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumPassMark">Min Pass Mark</Label>
              <Input
                id="minimumPassMark"
                type="number"
                placeholder="50.0"
                value={formData.minimumPassMark}
                onChange={(e) => onFormDataChange('minimumPassMark', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maximumRetakes">Max Retakes</Label>
              <Input
                id="maximumRetakes"
                type="number"
                placeholder="2"
                value={formData.maximumRetakes}
                onChange={(e) => onFormDataChange('maximumRetakes', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departmentId">Department *</Label>
            <Select value={formData.departmentId} onValueChange={(value) => onFormDataChange('departmentId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name} ({dept.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isCore">Course Type</Label>
              <Select value={formData.isCore} onValueChange={(value) => {
                onFormDataChange('isCore', value)
                onFormDataChange('isElective', value === 'true' ? 'false' : 'true')
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Core Course</SelectItem>
                  <SelectItem value="false">Elective Course</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="isActive">Status</Label>
              <Select value={formData.isActive} onValueChange={(value) => onFormDataChange('isActive', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prerequisites">Prerequisites</Label>
            <Textarea
              id="prerequisites"
              placeholder="Course prerequisites"
              value={formData.prerequisites}
              onChange={(e) => onFormDataChange('prerequisites', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="learningOutcomes">Learning Outcomes</Label>
            <Textarea
              id="learningOutcomes"
              placeholder="Expected learning outcomes"
              value={formData.learningOutcomes}
              onChange={(e) => onFormDataChange('learningOutcomes', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessmentMethods">Assessment Methods</Label>
            <Textarea
              id="assessmentMethods"
              placeholder="Assessment and evaluation methods"
              value={formData.assessmentMethods}
              onChange={(e) => onFormDataChange('assessmentMethods', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendedTextbooks">Recommended Textbooks</Label>
            <Textarea
              id="recommendedTextbooks"
              placeholder="Recommended reading materials"
              value={formData.recommendedTextbooks}
              onChange={(e) => onFormDataChange('recommendedTextbooks', e.target.value)}
            />
          </div>

          <Button 
            onClick={onSubmit}
            disabled={loading || !formData.name || !formData.code || !formData.departmentId}
            className="w-full bg-[#026892] hover:bg-[#024f70] text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Course'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCourseDialog;