// src/lib/api-student.ts
// API utility for student creation
import { getToken } from "./api-auth";

export async function createStudent(student: any) {
  // Try both token storage methods to ensure we get the token
  const token = getToken() || (typeof localStorage !== 'undefined' ? localStorage.getItem("token") : null);

  // Normalize attributes: if DEPARTMENT_ID or GENDER are empty strings, convert to null so backend validation can catch them
  if (student?.attributes) {
    if (student.attributes.DEPARTMENT_ID === "") student.attributes.DEPARTMENT_ID = null
    if (student.attributes.GENDER === "") student.attributes.GENDER = null
  }

  // Ensure phone number is in international format (+250...) if a local number is provided
  if (student?.phoneNumber && !student.phoneNumber.startsWith("+")) {
    // Remove any non-digit characters, then prefix
    const digits = student.phoneNumber.replace(/\D/g, "")
    student.phoneNumber = digits.startsWith("25") ? `+${digits}` : `+25${digits}`
  }

  try {
    console.debug('Creating student, token present:', !!token)
    console.debug('Student payload (masked):', {
      ...student,
      password: student.password ? '***' : undefined,
    })

    const res = await fetch("/api/students/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(student),
    })

    const text = await res.text()
    let json: any = null
    try { json = text ? JSON.parse(text) : null } catch (e) { json = { raw: text } }

    if (!res.ok) {
      console.log('API Error Response:', {
        status: res.status, 
        statusText: res.statusText,
        body: json
      })
      
      // Extract structured validation errors array if present
      const validation = Array.isArray(json?.errors) ? json.errors : []
      
      // Process specific error types based on patterns and add to validation array
      const errorTypeDetection = () => {
        // Check for email already exists error
        if (json?.message && /email.*exist/i.test(json.message)) {
          validation.push({ 
            field: "email", 
            message: json.message || "This email address is already registered"
          })
          return json.message
        }
        
        // Check for username format errors
        if (json?.message && /username.*[format|invalid|characters]/i.test(json.message)) {
          validation.push({ 
            field: "username", 
            message: json.message || "Invalid username format"
          })
          return json.message
        }
        
        // Check for duplicate username
        if (json?.message && /username.*exist/i.test(json.message)) {
          validation.push({ 
            field: "username", 
            message: json.message || "This username is already taken"
          })
          return json.message
        }
        
        // Check for missing required fields
        if (json?.errorCode === "ERR_VALIDATION" || json?.errorCode === "ERR_VALIDATION_FAILED") {
          // If there are no validation entries yet, add a generic one
          if (validation.length === 0) {
            validation.push({
              message: "Missing required fields"
            })
          }
          return "Please check all required fields"
        }
        
        // Extract message from common response patterns
        return json?.message || json?.error || null
      }
      
      // Get primary message
      let message = errorTypeDetection()
      
      // If we have validation items but no message yet, create a combined message
      if (!message && validation.length > 0) {
        message = validation.map((v: any) => (v.field ? `${v.field}: ${v.message}` : v.message)).join("; ")
      }
      
      // Include specific status text for common HTTP error codes if still no message
      if (!message) {
        if (res.status === 400) message = 'Invalid request format - please check all required fields'
        else if (res.status === 401) message = 'Authentication required - please log in again'
        else if (res.status === 403) message = 'You are not authorized to create students'
        else if (res.status === 404) message = 'Student creation endpoint not found'
        else if (res.status === 409) message = json?.message || 'A student with this information already exists'
        else if (res.status === 422) message = 'Student data validation failed - please check your inputs'
        else if (res.status === 500) message = 'Server error processing student creation'
        else message = json?.errors ? JSON.stringify(json.errors) : `Error ${res.status}: ${res.statusText || 'Unknown error'}`
      }

      const err = new Error(message || `Student creation failed (${res.status})`)
      
      // attach raw response and structured validation info for callers that want to inspect
      ;(err as any).status = res.status
      ;(err as any).statusText = res.statusText
      ;(err as any).body = json
      ;(err as any).endpoint = "/api/students/create"
      ;(err as any).validation = validation
      throw err
    }

    return json
  } catch (err: any) {
    console.error('createStudent failed:', err)
    throw err
  }
}
