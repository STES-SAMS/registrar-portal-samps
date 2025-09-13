export interface Module {
  id: string
  name: string
  code: string
  description: string
  credits: number
  contactHours: number
  lectureHours: number
  tutorialHours: number
  practicalHours: number
  selfStudyHours: number
  level: number
  semesterOffered: number
  isCore: boolean
  isElective: boolean
  isActive: boolean
  prerequisites: string
  learningOutcomes: string
  assessmentMethods: string
  recommendedTextbooks: string
  minimumPassMark: number
  maximumRetakes: number
  departmentId: string
  departmentName: string
  departmentCode: string
  schoolName: string
  collegeName: string
  institutionName: string
  fullName: string
  levelDescription: string
  totalContactHours: number
  totalStudyHours: number
  workloadPerCredit: number
  requiresPracticalWork: boolean
  hasPrerequisites: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  totalProgramModules: number
  totalAssignments: number
  totalMaterials: number
}

export interface Department {
  id: string
  name: string
  code?: string
  schoolId: string
  description?: string
}

export interface Semester {
  id: string
  name: string
  code: string
  description?: string
  startDate: string
  endDate: string
  isActive: boolean
  academicYear: string
  semesterNumber: number
}

export interface CreateModuleData {
  name: string
  code: string
  description: string
  credits: string
  contactHours: string
  lectureHours: string
  tutorialHours: string
  practicalHours: string
  selfStudyHours: string
  level: string
  semesterOffered: string
  isCore: string
  isElective: string
  isActive: string
  prerequisites: string
  learningOutcomes: string
  assessmentMethods: string
  recommendedTextbooks: string
  minimumPassMark: string
  maximumRetakes: string
  departmentId: string
}
