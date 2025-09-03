"use client"


import React, { useState } from 'react';
import { Upload, User, FileText } from 'lucide-react';
import { RegistrarLayout } from '@/components/registrar';
import ApplicationInformation from '../../../components/admission/students/application-information';
import PersonalInformation from '../../../components/admission/students/personal-information';
import AcademicBackground from '../../../components/admission/students/academic-background';
import ProgramSelection from '../../../components/admission/students/program-selection';
import EmergencyContact from '../../../components/admission/students/emergency-contact';

export default function ApplicationForm() {
    const [formData, setFormData] = useState({
        applicationId: 'APP-2025-001',
        applicationDate: '2025-08-30',
        semester: '',
        firstNameEng: '',
        lastNameEng: '',
        emailAddress: '',
        phoneNumber: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        previousSchool: '',
        graduationYear: '',
        gpaGrade: '',
        testScore: '',
        academicAchievements: '',
        firstChoiceProgram: '',
        secondChoiceProgram: '',
        statementOfPurpose: '',
        contactName: '',
        relationship: '',
        phoneNumberEmergency: '',
        emailAddressEmergency: ''
    });

    const [applicationStatus, setApplicationStatus] = useState({
        status: 'Created',
        lastModified: 'Jan 19, 2025',
        created: 'Jan 19, 2025'
    });

    const [checklist, setChecklist] = useState({
        personalInfo: false,
        academicBackground: false,
        programSelection: false,
        requiredDocuments: false,
        emergencyContact: false
    });

    const [documents, setDocuments] = useState([
        { name: 'Academic Transcript', status: 'Choose File - No file chosen', required: true },
        { name: 'ID Document', status: 'Choose File - No file chosen', required: true },
        { name: 'Recommendation Letter', status: 'Choose File - No file chosen', required: true },
        { name: 'Portfolio (if applicable)', status: 'Choose File - No file chosen', required: false }
    ]);

    const handleInputChange = (field?: string, value?: string) => {
        setFormData(prev => ({
            ...prev,
            [field!]: value
        }));
    };

    const handleChecklistUpdate = (item?: string) => {
        setChecklist(prev => ({
            ...prev,
            [item!]: !prev[item!]
        }));
    };

    const handleFileUpload = (index?: number) => {
        // Simulate file upload
        const newDocuments = [...documents];
        newDocuments[index!].status = 'File uploaded successfully';
        setDocuments(newDocuments);
    };

    return (
        <RegistrarLayout role="registrar-admission" title="Student Applications">
            <div className="min-h-screen bg-white">
                <div className="max-w-9xl mx-auto bg-white shadow-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-semibold text-gray-900">New Application</h1>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-white">
                            Save Draft
                        </button>
                        <button className="px-4 py-2 bg-[#026892] text-white rounded-md text-sm font-medium hover:bg-[#025b7f]">
                            Submit Application
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    {/* Left Column - Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <ApplicationInformation formData={formData} handleInputChange={handleInputChange} />
                        <PersonalInformation formData={formData} handleInputChange={handleInputChange} />
                        <AcademicBackground formData={formData} handleInputChange={handleInputChange} />
                        <ProgramSelection formData={formData} handleInputChange={handleInputChange} />
                        <EmergencyContact formData={formData} handleInputChange={handleInputChange} />
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Applicant Photo */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Photo</h3>
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                    <User className="w-12 h-12 text-gray-400" />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-white">
                                    <Upload className="w-4 h-4" />
                                    Upload Photo
                                </button>
                            </div>
                        </div>

                        {/* Application Status */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Application ID:</span>
                                    <span className="text-sm font-medium">{formData.applicationId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Status:</span>
                                    <span className="text-sm font-medium text-blue-600">{applicationStatus.status}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Created:</span>
                                    <span className="text-sm font-medium">{applicationStatus.created}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Last Modified:</span>
                                    <span className="text-sm font-medium">{applicationStatus.lastModified}</span>
                                </div>
                            </div>
                        </div>

                        {/* Required Documents */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                            <div className="space-y-3">
                                {documents.map((doc, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">
                                                {doc.name} {doc.required && '*'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleFileUpload(index)}
                                                className="px-3 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-white"
                                            >
                                                Choose File
                                            </button>
                                            <span className="text-xs text-gray-500">{doc.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Application Checklist */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Checklist</h3>
                            <div className="space-y-3">
                                {Object.entries(checklist).map(([key, checked]) => (
                                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => handleChecklistUpdate(key)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            {key === 'personalInfo' && 'Personal Information'}
                                            {key === 'academicBackground' && 'Academic Background'}
                                            {key === 'programSelection' && 'Program Selection'}
                                            {key === 'requiredDocuments' && 'Required Documents'}
                                            {key === 'emergencyContact' && 'Emergency Contact'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-white rounded-md">
                                    <FileText className="w-4 h-4" />
                                    Preview Application
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-white rounded-md">
                                    <FileText className="w-4 h-4" />
                                    Save as Template
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-white rounded-md">
                                    <Upload className="w-4 h-4" />
                                    Import from File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </RegistrarLayout>
    );
}