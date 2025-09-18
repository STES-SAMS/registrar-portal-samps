import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { fetchAllDepartments } from "@/lib/api-filters"
import axios, { API_URL } from "@/lib/api"
import { Module, Department, CreateModuleData, Semester } from "./types"

// Add a request interceptor specifically for debugging this component
const requestInterceptor = axios.interceptors.request.use(
  config => {
    if (config.url?.includes('academics/modules') && config.method === 'post') {
      console.log('DEBUG - Module Creation Request:', {
        url: config.url,
        headers: config.headers,
        data: config.data
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

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

  // Validate module data
  const validateModuleData = (data: any) => {
    const errors = []
    
    if (!data.name || data.name.trim() === '') {
      errors.push("Module name is required")
    }
    
    if (!data.code || data.code.trim() === '') {
      errors.push("Module code is required")
    }
    
    if (!data.departmentId) {
      errors.push("Department is required")
    }
    
    // Validate numeric fields
    if (isNaN(data.credits) || data.credits < 0) {
      errors.push("Credits must be a valid number greater than or equal to 0")
    }
    
    if (isNaN(data.level) || data.level < 1) {
      errors.push("Level must be a valid number greater than or equal to 1")
    }
    
    if (isNaN(data.semesterOffered) || data.semesterOffered < 1) {
      errors.push("Semester offered must be a valid number greater than or equal to 1")
    }
    
    if (isNaN(data.minimumPassMark) || data.minimumPassMark < 0 || data.minimumPassMark > 100) {
      errors.push("Minimum pass mark must be between 0 and 100")
    }
    
    if (isNaN(data.maximumRetakes) || data.maximumRetakes < 0) {
      errors.push("Maximum retakes must be a valid number greater than or equal to 0")
    }
    
    // Log validation results
    if (errors.length > 0) {
      console.log("Validation errors:", errors)
    }
    
    return errors
  }

  // Create new module
  const createModule = async () => {
    setCreateLoading(true)
    try {
      // Format data for API - convert string values to appropriate types
      const formattedData = {
        ...formData,
        credits: parseFloat(formData.credits) || 0,
        contactHours: parseFloat(formData.contactHours) || 0,
        lectureHours: parseFloat(formData.lectureHours) || 0,
        tutorialHours: parseFloat(formData.tutorialHours) || 0,
        practicalHours: parseFloat(formData.practicalHours) || 0,
        selfStudyHours: parseFloat(formData.selfStudyHours) || 0,
        level: parseInt(formData.level) || 1,
        semesterOffered: parseInt(formData.semesterOffered) || 1,
        isCore: formData.isCore === "true",
        isElective: formData.isElective === "true",
        isActive: formData.isActive === "true",
        minimumPassMark: parseFloat(formData.minimumPassMark) || 50,
        maximumRetakes: parseInt(formData.maximumRetakes) || 2,
        
        // Ensure department ID is properly formatted
        departmentId: formData.departmentId.trim()
      }
      
      // Ensure all required fields have proper values
      // Additional formatting based on API expectations
      if (!formattedData.description) {
        formattedData.description = formattedData.name // Use name as default description if empty
      }
      
      // Format code to match expected pattern (if needed)
      if (formattedData.code) {
        formattedData.code = formattedData.code.toUpperCase().trim()
      }
      
      // Client-side validation before sending to API
      const validationErrors = validateModuleData(formattedData)
      if (validationErrors.length > 0) {
        toast({
          title: "Validation Error",
          description: validationErrors.join(", "),
          variant: "destructive",
        })
        return false
      }
      
      // Debug: Log the exact formatted data being sent
      console.log("Creating module with formatted data:", JSON.stringify(formattedData, null, 2))

      // axios.defaults.baseURL is set to API_URL in src/lib/api.ts, so use a relative path here
      const url = "/academics/modules"
      console.log("POST URL:", `${API_URL}${url}`)
      
      // First attempt to get the API schema/expectations
      console.log("Getting token from localStorage:", localStorage.getItem("token")?.substring(0, 20) + "...")
      
      const response = await axios.post(url, formattedData)
      console.log("Create Response:", response.data)

      if (response.data && response.data.success) {
        toast({
          title: "Success",
          description: "Module created successfully",
        })
        resetForm()
        fetchModules() // Refresh the list
        return true
      } else {
        // Try to surface validation errors returned by the API
        const message = response.data?.message ||
          (response.data?.errors ? JSON.stringify(response.data.errors) : "Failed to create module")
        console.warn("Create module failed:", response.data)
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error("Error creating module:", error)

      // Detailed error logging to help debug
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error Response Data:", error.response.data)
        console.error("Error Response Status:", error.response.status)
        console.error("Error Response Headers:", error.response.headers)
        
        // Specific handling for 400 Bad Request
        if (error.response.status === 400) {
          console.error("BAD REQUEST DETAILS:", {
            requestUrl: error.config.url,
            requestMethod: error.config.method,
            requestData: error.config.data,
            responseData: error.response.data
          })
          
          // Try to extract validation errors if they exist
          if (error.response.data?.validationErrors) {
            console.error("Validation Errors:", error.response.data.validationErrors)
          }
          
          // Check for specific error codes
          if (error.response.data?.errorCode) {
            console.error("Error Code:", error.response.data.errorCode)
          }
        }
        
        // Try parsing response body for more clues
        try {
          if (typeof error.response.data === 'string') {
            const parsedBody = JSON.parse(error.response.data)
            console.error("Parsed Response Body:", parsedBody)
          }
        } catch (parseError) {
          console.log("Response is not JSON parseable")
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message)
      }
      
      // More detailed parsing of axios error response
      let errorMessage = "Unknown error occurred"
      let fieldErrors: Record<string, any> = {}
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors
        if (Array.isArray(errors)) {
          errorMessage = errors.map(err => err.message || err).join(", ")
          
          // Extract field errors if available
          errors.forEach(err => {
            if (err.field && err.message) {
              fieldErrors[err.field] = err.message
            }
          })
        } else if (typeof errors === 'object') {
          errorMessage = Object.entries(errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(", ")
            
          // Store field errors
          fieldErrors = errors
        } else {
          errorMessage = JSON.stringify(errors)
        }
      } else if (error.response?.data) {
        errorMessage = JSON.stringify(error.response.data)
      } else if (error.message) {
        errorMessage = error.message
      }
      
      // If we have field-specific errors, show them in a more structured way
      if (Object.keys(fieldErrors).length > 0) {
        console.log("Field errors found:", fieldErrors)
        const formattedErrors = Object.entries(fieldErrors)
          .map(([field, message]) => `• ${field}: ${message}`)
          .join("\n")
        
        toast({
          title: "Validation Errors",
          description: formattedErrors,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error Creating Module",
          description: errorMessage,
          variant: "destructive",
        })
      }
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
