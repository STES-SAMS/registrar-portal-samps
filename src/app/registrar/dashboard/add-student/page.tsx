"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStudent } from "@/lib/api-student";
import { RegistrarLayout } from "@/components/registrar";

interface AddStudentFormProps {
    isOpen: boolean;
    onClose: () => void;
}

function AddStudentForm({ isOpen, onClose }: AddStudentFormProps) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        phoneNumber: "",
        userType: "STUDENT",
        password: "",
        roleIds: ["d4d5c4c1-d9d7-4642-8d41-972f6159ac0b"],
        attributes: {
            STUDENT_NUMBER: "",
            DEPARTMENT_ID: "",
            GENDER: ""
        },
        sendWelcomeEmail: false,
        requirePasswordChange: false,
    });
    const [departments, setDepartments] = useState<Array<{ id: string, name: string }>>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState<Array<{ field?: string, message: string }>>([])
    const [success, setSuccess] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    
    // Helper to add a field error and also show it in the validation errors list
    const addFieldError = (field: string, message: string) => {
        setFieldErrors(prev => ({...prev, [field]: message}))
        setValidationErrors(prev => [...prev, {field, message}])
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Clear per-field error when editing
        setFieldErrors(errs => {
            const copy = { ...errs }
            // STUDENT_NUMBER is stored under attributes
            if (name === 'STUDENT_NUMBER') {
                delete copy['STUDENT_NUMBER']
            } else {
                delete copy[name]
            }
            return copy
        })
        if (name === "STUDENT_NUMBER") {
            setForm(f => ({ ...f, attributes: { ...f.attributes, STUDENT_NUMBER: value } }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    // Handle attribute changes (department, gender)
    const handleAttributeChange = (name: string, value: string) => {
        // clear field error for attribute
        setFieldErrors(errs => {
            const copy = { ...errs }
            delete copy[name]
            return copy
        })
        setForm(f => ({ ...f, attributes: { ...f.attributes, [name]: value } }));
    }

    const clearAllErrors = () => {
        setError("")
        setValidationErrors([])
        setFieldErrors({})
    }

    // Function to scroll to an element with error
    const scrollToError = (fieldName: string) => {
        setTimeout(() => {
            const element = document.querySelector(`[name="${fieldName}"]`)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                // Try to focus the element if it's an input
                try {
                    const inputElement = element as HTMLInputElement
                    if (typeof inputElement.focus === 'function') {
                        inputElement.focus()
                    }
                } catch (e) {
                    console.error('Could not focus element:', e)
                }
            }
        }, 100)
    }
    
    const validateForm = (f: typeof form) => {
        // Clear existing errors first
        setFieldErrors({})
        setValidationErrors([])
        const errs: Record<string, string> = {}

        // Username: required and allowed characters
        if (!f.username || !f.username.trim()) {
            const msg = 'Username is required'
            errs.username = msg
            addFieldError('username', msg)
        }
        else if (!/^[A-Za-z0-9._-]+$/.test(f.username)) {
            const msg = 'Username can only contain letters, numbers, dots, hyphens, and underscores'
            errs.username = msg
            addFieldError('username', msg)
        }

        // Password: complexity
        if (!f.password) {
            const msg = 'Password is required'
            errs.password = msg
            addFieldError('password', msg)
        }
        else {
            if (f.password.length < 8 || f.password.length > 128) {
                const msg = 'Password must be between 8 and 128 characters'
                errs.password = msg
                addFieldError('password', msg)
            }
            else {
                const hasUpper = /[A-Z]/.test(f.password)
                const hasLower = /[a-z]/.test(f.password)
                const hasNumber = /[0-9]/.test(f.password)
                const hasSpecial = /[^A-Za-z0-9]/.test(f.password)
                if (!(hasUpper && hasLower && hasNumber && hasSpecial)) {
                    const msg = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                    errs.password = msg
                    addFieldError('password', msg)
                }
            }
        }

        // Email
        if (!f.email) {
            const msg = 'Email is required'
            errs.email = msg
            addFieldError('email', msg)
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
            const msg = 'Email must be a valid email address'
            errs.email = msg
            addFieldError('email', msg)
        }

        // Names
        if (!f.firstName || !f.firstName.trim()) {
            const msg = 'First name is required'
            errs.firstName = msg
            addFieldError('firstName', msg)
        }
        if (!f.lastName || !f.lastName.trim()) {
            const msg = 'Last name is required'
            errs.lastName = msg
            addFieldError('lastName', msg)
        }

        // Student number
        if (!f.attributes?.STUDENT_NUMBER) {
            const msg = 'Student number is required'
            errs.STUDENT_NUMBER = msg
            addFieldError('STUDENT_NUMBER', msg)
        }

        // Phone: digits and reasonable length
        if (!f.phoneNumber) {
            const msg = 'Phone number is required'
            errs.phoneNumber = msg
            addFieldError('phoneNumber', msg)
        }
        else {
            const digits = f.phoneNumber.replace(/\D/g, '')
            if (digits.length < 9) {
                const msg = 'Phone number appears too short'
                errs.phoneNumber = msg
                addFieldError('phoneNumber', msg)
            }
        }

        // Department & Gender
        if (!f.attributes?.DEPARTMENT_ID) {
            const msg = 'Please select a department'
            errs.DEPARTMENT_ID = msg
            addFieldError('DEPARTMENT_ID', msg)
        }
        if (!f.attributes?.GENDER) {
            const msg = 'Please select gender'
            errs.GENDER = msg
            addFieldError('GENDER', msg)
        }

        return Object.keys(errs).length === 0
    }

    // Fetch departments for select
    useEffect(() => {
        let mounted = true
        import('@/lib/api-filters').then(mod => mod.fetchAllDepartments()).then(data => {
            if (!mounted) return
            setDepartments(data.map((d: any) => ({ id: d.id, name: d.name })))
        }).catch(err => console.error('Failed to load departments', err))
        return () => { mounted = false }
    }, [])

// Debug version of handleSubmit with detailed logging
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setValidationErrors([])
    setSuccess("");
    setFieldErrors({})
    
    try {
        // Client-side validation for all fields
        const ok = validateForm(form)
        if (!ok) {
            setError('Please fix the highlighted errors')
            setLoading(false)
            
            // Find the first field with an error and scroll to it
            const firstErrorField = Object.keys(fieldErrors)[0]
            if (firstErrorField) {
                scrollToError(firstErrorField)
            }
            return
        }

        // Normalize phone: ensure digits only and prefix +250 if missing
        const normalized = { ...form }
        if (normalized.phoneNumber && !normalized.phoneNumber.startsWith('+')) {
            const digits = normalized.phoneNumber.replace(/\D/g, '')
            normalized.phoneNumber = digits.startsWith('250') ? `+${digits}` : `+250${digits}`
        }

        await createStudent(normalized);
        setSuccess("Student created successfully!");
        setForm({
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            middleName: "",
            phoneNumber: "",
            userType: "STUDENT",
            password: "",
            roleIds: ["d4d5c4c1-d9d7-4642-8d41-972f6159ac0b"],
            attributes: {
                STUDENT_NUMBER: "",
                DEPARTMENT_ID: "",
                GENDER: ""
            },
            sendWelcomeEmail: false,
            requirePasswordChange: false,
        });
        clearAllErrors()
    } catch (err: any) {
        console.error('=== ERROR DEBUGGING START ===')
        console.error('Full error object:', err)
        console.error('Error body:', err?.body)
        console.error('Error message:', err?.message)
        console.error('Error validation:', err?.validation)
        
        // Extract response body and validation errors
        const body = err?.body || (err?.response && err.response.data) || null
        const validation = err?.validation || (Array.isArray(body?.errors) ? body.errors : null)
        
        console.error('Extracted body:', body)
        console.error('Extracted validation:', validation)
        
        // Start with field errors mapping
        const newFieldErrors: Record<string, string> = {}
        
        // Process structured validation errors first
        if (validation && Array.isArray(validation)) {
            console.log('Processing structured validation errors:', validation)
            setValidationErrors(validation.map((v: any) => ({ field: v.field, message: v.message })))
            validation.forEach((v: any) => {
                if (v.field && v.message) {
                    newFieldErrors[v.field] = v.message
                    console.log('Added field error from validation:', v.field, '=', v.message)
                }
            })
        }
        
        // Build a more detailed error message with specific information
        let errorDetail: string | null = null
        let errorMessage = ""
        
        // Check for specific response details
        if (body) {
            // Check for specific fields in the response body
            if (body.message) errorDetail = body.message
            else if (body.error) errorDetail = body.error
            else if (body.errorMessage) errorDetail = body.errorMessage
            
            // Include error code if available
            const errorCode = body.errorCode || body.code || (err?.status ? `HTTP ${err.status}` : null)
            
            // Add path if available
            const path = body.path || null
            
            // Format message with details
            if (errorDetail) {
                errorMessage = errorDetail
            } else if (errorCode) {
                errorMessage = `Error ${errorCode}`
            }
        } 
        
        // If nothing specific found, get from error object
        if (!errorMessage) {
            errorMessage = err?.message || ""
        }
        
        // Include server response status if available and not already in message
        if (err?.status && !errorMessage.includes(String(err.status))) {
            errorMessage = errorMessage || `Server error (${err.status})`
        }
        
        // If nothing useful found, provide a generic message with some debugging info
        if (!errorMessage || errorMessage === "Request failed with status code 400" || errorMessage === "Failed to create student") {
            const status = err?.status || err?.response?.status || "unknown"
            
            // Create a more specific message based on status code
            if (status === 409) {
                errorMessage = "Student already exists with this information. Please check email and username."
            } else if (status === 400) {
                errorMessage = "Invalid student information. Please check all required fields."
            } else if (status === 422) {
                errorMessage = "Student data validation failed. Please correct your input."
            } else {
                errorMessage = `Failed to process student creation (${status}). Please check your inputs and try again.`
            }
        }
        
        console.log('Final error message to display:', errorMessage)
        
        // Enhanced parsing of server errors to map them to field errors
        const parseServerErrors = (message: string) => {
            const lowerMsg = message.toLowerCase()
            console.log('Parsing message (lowercase):', lowerMsg)
            
            // Extract field name and error pattern from message
            const extractFieldError = () => {
                // Common field patterns to check
                const fieldPatterns = [
                    // Format: [field name in message, field name in form]
                    ['username', 'username'],
                    ['email', 'email'],
                    ['student number', 'STUDENT_NUMBER'],
                    ['phone', 'phoneNumber'],
                    ['password', 'password'],
                    ['first name', 'firstName'],
                    ['last name', 'lastName'],
                    ['gender', 'GENDER'],
                    ['department', 'DEPARTMENT_ID'],
                ];
                
                // Common error patterns to check
                const errorTypes = [
                    // Already exists errors
                    { pattern: /(already exist|exists|duplicate|taken|in use)/i, type: 'exists' },
                    // Format errors
                    { pattern: /(invalid|format|characters|allowed|malformed)/i, type: 'format' },
                    // Required errors
                    { pattern: /(required|missing|cannot be empty|must have)/i, type: 'required' },
                ];
                
                // Check each field pattern
                for (const [fieldText, fieldName] of fieldPatterns) {
                    if (lowerMsg.includes(fieldText)) {
                        console.log(`Found "${fieldText}" in message`);
                        
                        // Check error types for this field
                        for (const { pattern, type } of errorTypes) {
                            if (pattern.test(lowerMsg)) {
                                console.log(`Matched error type: ${type}`);
                                return { field: fieldName, errorType: type, fullMessage: message };
                            }
                        }
                        
                        // If field found but no specific error type matched, still return it
                        return { field: fieldName, errorType: 'general', fullMessage: message };
                    }
                }
                
                return null;
            };
            
            // Try to extract field and error type
            const result = extractFieldError();
            
            if (result) {
                // Set the field error with the original message
                newFieldErrors[result.field] = result.fullMessage;
                console.log(`Setting field error for ${result.field}: ${result.fullMessage}`);
                
                // Add to validation errors if not already present
                const existingValidationError = validationErrors.some(ve => 
                    ve.field === result.field && ve.message === result.fullMessage
                );
                
                if (!existingValidationError) {
                    setValidationErrors(prev => [...prev, { field: result.field, message: result.fullMessage }]);
                }
                return true;
            }
            
            console.log('No patterns matched for message:', message);
            return false;
        }
        
        // Apply the parsing logic
        console.log('Starting to parse server errors...')
        parseServerErrors(errorMessage)
        
        // Handle specific error codes
        if (body?.errorCode) {
            console.log('Processing error code:', body.errorCode)
            const lowerMsg = errorMessage.toLowerCase()
            
            switch (body.errorCode) {
                case 'ERR_ENTITY_ALREADY_EXISTS':
                    console.log('ERR_ENTITY_ALREADY_EXISTS detected')
                    // Try to extract which field from the message if not already mapped
                    if (Object.keys(newFieldErrors).length === 0) {
                        console.log('No field errors mapped yet, re-parsing...')
                        
                        // For duplicate entity errors, check common fields
                        if (lowerMsg.includes('email')) {
                            newFieldErrors.email = 'Email address already exists'
                            addFieldError('email', 'Email address already exists')
                        } else if (lowerMsg.includes('username')) {
                            newFieldErrors.username = 'Username already exists'
                            addFieldError('username', 'Username already exists')
                        } else if (lowerMsg.includes('student') && lowerMsg.includes('number')) {
                            newFieldErrors.STUDENT_NUMBER = 'Student number already exists'
                            addFieldError('STUDENT_NUMBER', 'Student number already exists')
                        } else if (lowerMsg.includes('phone')) {
                            newFieldErrors.phoneNumber = 'Phone number already exists'
                            addFieldError('phoneNumber', 'Phone number already exists')
                        } else {
                            // Generic message if we can't determine the specific field
                            parseServerErrors(errorMessage)
                        }
                    }
                    break
                    
                case 'ERR_VALIDATION':
                case 'ERR_VALIDATION_FAILED':
                    console.log('Validation error detected')
                    
                    // If validation array is present, use it
                    if (err.validation && Array.isArray(err.validation) && err.validation.length > 0) {
                        err.validation.forEach((v: any) => {
                            if (v.field) {
                                newFieldErrors[v.field] = v.message
                                addFieldError(v.field, v.message)
                            }
                        })
                    } else if (Object.keys(newFieldErrors).length === 0) {
                        // Try to parse common validation issues
                        parseServerErrors(errorMessage)
                        
                        // Check for password validations
                        if (lowerMsg.includes('password')) {
                            if (lowerMsg.includes('uppercase') || lowerMsg.includes('lowercase') || 
                                lowerMsg.includes('number') || lowerMsg.includes('special')) {
                                const msg = 'Password must contain uppercase, lowercase, number and special characters'
                                newFieldErrors.password = msg
                                addFieldError('password', msg)
                            } else if (lowerMsg.includes('length') || lowerMsg.includes('characters') || 
                                      lowerMsg.includes('short') || lowerMsg.includes('long')) {
                                const msg = 'Password must be between 8 and 128 characters'
                                newFieldErrors.password = msg
                                addFieldError('password', msg)
                            }
                        }
                    }
                    break
                    
                case 'ERR_INVALID_INPUT':
                    console.log('ERR_INVALID_INPUT detected')
                    parseServerErrors(errorMessage)
                    break
                    
                case 'ERR_DUPLICATE_ENTRY':
                    console.log('ERR_DUPLICATE_ENTRY detected')
                    parseServerErrors(errorMessage)
                    break
            }
        }
        
        // For all error types - if we haven't mapped anything yet, try to parse specific text
        if (Object.keys(newFieldErrors).length === 0) {
            // Check for specific patterns in the error message
            if (/email.*exist/i.test(errorMessage)) {
                newFieldErrors.email = errorMessage
                addFieldError('email', errorMessage)
            } else if (/username.*[exist|invalid|format]/i.test(errorMessage)) {
                newFieldErrors.username = errorMessage
                addFieldError('username', errorMessage)
            } else if (/password.*[complex|uppercase|lowercase|number|special|character]/i.test(errorMessage)) {
                newFieldErrors.password = errorMessage
                addFieldError('password', errorMessage)
            } else if (/required|missing/i.test(errorMessage)) {
                // Add generic required field message
                setValidationErrors([{ message: "Please check all required fields" }])
            }
        }
        
        console.log('Final field errors to set:', newFieldErrors)
        
        // Clear any existing validation errors
        setValidationErrors([])
        
        // Set all field errors - this will make them appear under the respective inputs
        setFieldErrors(newFieldErrors)
        
        // Also add each field error to the validation errors array for display in the error summary
        Object.entries(newFieldErrors).forEach(([field, message]) => {
            addFieldError(field, message)
        })
        
        // Set general error message
        let generalError = errorMessage
        
        // If we successfully mapped errors to fields, provide a more user-friendly general message
        if (Object.keys(newFieldErrors).length > 0) {
            generalError = 'Please fix the highlighted errors below'
            console.log('Field errors found, setting user-friendly general message')
        } else {
            // If no specific fields were detected, still show the error in both places
            // Add the general error to validation errors list so it shows in both places
            setValidationErrors([{ message: errorMessage }])
            console.log('No field errors mapped, showing original error message in both places')
        }
        
        console.log('Setting general error:', generalError)
        setError(generalError)
        
        // Find the first field with an error and scroll to it
        const firstErrorField = Object.keys(newFieldErrors)[0]
        if (firstErrorField) {
            scrollToError(firstErrorField)
        }
        
        console.error('=== ERROR DEBUGGING END ===')
        
    } finally {
        setLoading(false);
    }
};

    return (
        <RegistrarLayout role="registrar" title="Add Student">
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border mb-8">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Fill in the information below to create a new student account
                            </p>
                        </div>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="px-6 py-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information Section */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                                First Name *
                                            </Label>
                                            <Input
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                                placeholder="Enter first name"
                                                required
                                                className="w-full"
                                            />
                                            {fieldErrors.firstName && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.firstName}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="middleName" className="text-sm font-medium text-gray-700">
                                                Middle Name
                                            </Label>
                                            <Input
                                                name="middleName"
                                                value={form.middleName}
                                                onChange={handleChange}
                                                placeholder="Enter middle name"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                                Last Name *
                                            </Label>
                                            <Input
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                placeholder="Enter last name"
                                                required
                                                className="w-full"
                                            />
                                            {fieldErrors.lastName && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.lastName}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Account Information Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Account Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                                                Username *
                                            </Label>
                                            <Input
                                                name="username"
                                                value={form.username}
                                                onChange={handleChange}
                                                placeholder="Enter username"
                                                required
                                                className="w-full"
                                            />
                                            {fieldErrors.username && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.username}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                                Password *
                                            </Label>
                                            <Input
                                                name="password"
                                                type="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="Enter password"
                                                required
                                                className="w-full"
                                            />
                                            {fieldErrors.password && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.password}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                Email Address *
                                            </Label>
                                            <Input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="Enter email address"
                                                required
                                                className="w-full"
                                            />
                                            {fieldErrors.email && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.email}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="STUDENT_NUMBER" className="text-sm font-medium text-gray-700">
                                                Student Number *
                                            </Label>
                                            <Input
                                                name="STUDENT_NUMBER"
                                                value={form.attributes.STUDENT_NUMBER}
                                                onChange={handleChange}
                                                placeholder="Enter student number"
                                                required
                                                className="w-full"
                                            />
                                            {fieldErrors.STUDENT_NUMBER && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.STUDENT_NUMBER}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                                Phone Number *
                                            </Label>
                                            <Input
                                                name="phoneNumber"
                                                value={form.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                required
                                                className="w-full"
                                            />
                                            {fieldErrors.phoneNumber && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.phoneNumber}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="DEPARTMENT_ID" className="text-sm font-medium text-gray-700">Department *</Label>
                                            <select
                                                name="DEPARTMENT_ID"
                                                value={form.attributes.DEPARTMENT_ID}
                                                onChange={(e) => handleAttributeChange('DEPARTMENT_ID', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                            >
                                                <option value="">-- Select Department --</option>
                                                {departments.map(d => (
                                                    <option key={d.id} value={d.id}>{d.name}</option>
                                                ))}
                                            </select>
                                            {fieldErrors.DEPARTMENT_ID && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.DEPARTMENT_ID}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="GENDER" className="text-sm font-medium text-gray-700">Gender *</Label>
                                            <select
                                                name="GENDER"
                                                value={form.attributes.GENDER}
                                                onChange={(e) => handleAttributeChange('GENDER', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                            >
                                                <option value="">-- Select Gender --</option>
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">Female</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                            {fieldErrors.GENDER && (
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-red-600 text-sm">{fieldErrors.GENDER}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            
                                {success && (
                                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                                        <div className="text-green-800 text-sm font-medium">{success}</div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={onClose}
                                            className="w-full sm:w-auto px-8 py-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full sm:w-auto px-8 py-2 bg-[#026892] hover:bg-[#0284c7] text-white font-medium"
                                        >
                                            {loading ? "Creating Student..." : "Create Student"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </RegistrarLayout>
    );
}

export default function AddStudentPage() {
    return <AddStudentForm isOpen={true} onClose={() => { }} />;
}