
"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import {
    CourseTable,
    ViewCourseDialog,
    CourseStats,
    SearchAndActions,
    useCourseManagement,
    Module
} from "../../../../components/registrar/academic-admin/course-management"
import { RegistrarLayout } from "@/components/registrar"
import BackButton from "@/components/registrar/academic-admin/backbutton"

export default function ManageCourses() {
    const {
        modules,
        departments,
        semesters,
        loading,
        createLoading,
        formData,
        fetchModules,
        createModule,
        handleInputChange,
    } = useCourseManagement()

    // Local state for UI
    const [searchTerm, setSearchTerm] = useState("")
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [selectedModule, setSelectedModule] = useState<Module | null>(null)

    // Filter modules based on search term
    const filteredModules = modules.filter(module =>
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleViewModule = (module: Module) => {
        setSelectedModule(module)
        setViewDialogOpen(true)
    }

    const handleCreateSubmit = async () => {
        const success = await createModule()
        if (success) {
            setCreateDialogOpen(false)
        }
    }

    return (
        <RegistrarLayout role="registrar" title="Manage Courses">
            <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="text-black text-lg font-bold items-center">
                    <div className="inline-flex items-center gap-2">
                        <BackButton />
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Course Management
                        </CardTitle>
                    </div>

                </CardHeader>

                <CardContent className="p-6">
                    {/* Search and Actions */}
                    <SearchAndActions
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onRefresh={fetchModules}
                        loading={loading}
                        createDialogOpen={createDialogOpen}
                        onCreateDialogOpenChange={setCreateDialogOpen}
                        formData={formData}
                        onFormDataChange={handleInputChange}
                        departments={departments}
                        semesters={semesters}
                        onCreateSubmit={handleCreateSubmit}
                        createLoading={createLoading}
                    />

                    {/* Courses Table */}
                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                        <CourseTable
                            modules={filteredModules}
                            loading={loading}
                            onViewModule={handleViewModule}
                        />
                    </div>

                    {/* View Module Details Dialog */}
                    <ViewCourseDialog
                        open={viewDialogOpen}
                        onOpenChange={setViewDialogOpen}
                        module={selectedModule}
                    />

                    {/* Summary Stats */}
                    <CourseStats modules={modules} />
                </CardContent>
            </Card>
        </RegistrarLayout>
    )
}
