import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { fetchAllDepartments } from "@/lib/api-filters"
import axios from "@/lib/api"
import { Module, Department, CreateModuleData, Semester } from "./types"

export function useCourseManagement() {
  const { toast } = useToast()
  
  // State
  const [modules, setModules] = useState<Module[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [loading, setLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState<CreateModuleData>({
    name: "",
    code: "",
    description: "",
    credits: "",
    contactHours: "",
    lectureHours: "",
    tutorialHours: "",
    practicalHours: "",
    selfStudyHours: "",
    level: "",
    semesterOffered: "",
    isCore: "true",
    isElective: "false",
    isActive: "true",
    prerequisites: "",
    learningOutcomes: "",
    assessmentMethods: "",
    recommendedTextbooks: "",
    minimumPassMark: "50.0",
    maximumRetakes: "2",
    departmentId: ""
  })

  // Fetch modules from API
  const fetchModules = async () => {
    setLoading(true)
    try {
      console.log("Fetching modules from /api/academics/modules")
      const response = await axios.get("/academics/modules")
      console.log("API Response:", response.data)
      
      if (response.data.success && response.data.data?.content) {
        setModules(response.data.data.content)
        toast({
          title: "Success",
          description: `Loaded ${response.data.data.content.length} courses`,
        })
      } else {
        console.warn("Unexpected response format:", response.data)
        toast({
          title: "Warning",
          description: "No courses found or unexpected response format",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Error fetching modules:", error)
      toast({
        title: "Error",
        description: `Failed to fetch courses: ${error.response?.data?.message || error.message || 'Unknown error'}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const departmentData = await fetchAllDepartments()
      setDepartments(departmentData)
    } catch (error) {
      console.error("Error fetching departments:", error)
      toast({
        title: "Error", 
        description: "Failed to fetch departments",
        variant: "destructive",
      })
    }
  }

  // Fetch semesters
  const fetchSemesters = async () => {
    try {
      console.log("Fetching semesters from /api/academics/semesters")
      const response = await axios.get("/academics/semesters")
      console.log("Semesters API Response:", response.data)
      
      if (response.data.success && response.data.data?.content) {
        setSemesters(response.data.data.content)
      } else {
        console.warn("Unexpected semesters response format:", response.data)
      }
    } catch (error: any) {
      console.error("Error fetching semesters:", error)
      toast({
        title: "Error", 
        description: `Failed to fetch semesters: ${error.response?.data?.message || error.message || 'Unknown error'}`,
        variant: "destructive",
      })
    }
  }

  // Create new module
  const createModule = async () => {
    setCreateLoading(true)
    try {
      console.log("Creating module with data:", formData)
      const response = await axios.post("/academics/modules", formData)
      console.log("Create Response:", response.data)
      
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Module created successfully",
        })
        resetForm()
        fetchModules() // Refresh the list
        return true
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to create module",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error("Error creating module:", error)
      toast({
        title: "Error",
        description: `Failed to create module: ${error.response?.data?.message || error.message || 'Unknown error'}`,
        variant: "destructive",
      })
      return false
    } finally {
      setCreateLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      credits: "",
      contactHours: "",
      lectureHours: "",
      tutorialHours: "",
      practicalHours: "",
      selfStudyHours: "",
      level: "",
      semesterOffered: "",
      isCore: "true",
      isElective: "false",
      isActive: "true",
      prerequisites: "",
      learningOutcomes: "",
      assessmentMethods: "",
      recommendedTextbooks: "",
      minimumPassMark: "50.0",
      maximumRetakes: "2",
      departmentId: ""
    })
  }

  const handleInputChange = (field: keyof CreateModuleData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Load data on mount
  useEffect(() => {
    fetchModules()
    fetchDepartments()
    fetchSemesters()
  }, [])

  return {
    // State
    modules,
    departments,
    semesters,
    loading,
    createLoading,
    formData,
    
    // Actions
    fetchModules,
    createModule,
    resetForm,
    handleInputChange,
  }
}
