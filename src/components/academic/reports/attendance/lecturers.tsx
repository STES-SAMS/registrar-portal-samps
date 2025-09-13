import React, { useState, useMemo } from "react";
import { lecturersData } from "./attendance";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Import the API-based filter components
import { CascadingFilters } from "@/components/ui/filters";
import { useFilters } from "@/hooks/use-filters";
import type { FilterState } from "@/components/ui/filters/types";

function getAttendanceColor(attendance?: number) {
    if (attendance === undefined) return "text-gray-400";
    if (attendance >= 90) return "text-emerald-600";
    if (attendance >= 85) return "text-green-600";
    if (attendance >= 75) return "text-amber-600";
    return "text-red-600";
}

export default function LecturersPage() {
    // Use API-based filters that connect to your backend
    const {
        filters,
        filterOptions,
        isLoading: isFilterLoading,
        updateFilters,
        resetFilters
    } = useFilters({
        loadMode: 'eager' // Load all data upfront for better UX
    });
    
    const [selectedLevel, setSelectedLevel] = useState("All Levels");

    // Filtering logic with API-based filter system
    const filteredLecturers = useMemo(() => {
        return lecturersData.filter(lecturer => {
            // School filter - match by school name from API data
            if (filters.school !== 'all') {
                const selectedSchool = filterOptions.schools.find((school: any) => school.id === filters.school);
                if (selectedSchool) {
                    // Try to match school names (handle variations like "School of ICT" vs "Computer Science")
                    const schoolNameMatch = 
                        lecturer.school.toLowerCase().includes(selectedSchool.name?.toLowerCase() || '') ||
                        selectedSchool.name?.toLowerCase().includes(lecturer.school.toLowerCase()) ||
                        (selectedSchool.code && selectedSchool.code.toLowerCase() === lecturer.school.toLowerCase());
                    if (!schoolNameMatch) return false;
                }
            }

            // Department filter - match by department name from API data
            if (filters.department !== 'all') {
                const selectedDepartment = filterOptions.departments.find((dept: any) => dept.id === filters.department);
                if (selectedDepartment) {
                    const departmentNameMatch = 
                        lecturer.department.toLowerCase().includes(selectedDepartment.name?.toLowerCase() || '') ||
                        selectedDepartment.name?.toLowerCase().includes(lecturer.department.toLowerCase()) ||
                        (selectedDepartment.code && selectedDepartment.code.toLowerCase() === lecturer.department.toLowerCase());
                    if (!departmentNameMatch) return false;
                }
            }

            // Program filter - match by program name from API data
            if (filters.program !== 'all') {
                const selectedProgram = filterOptions.programs.find((prog: any) => prog.id === filters.program);
                if (selectedProgram) {
                    // For programs, check course codes or other identifiers
                    const programMatch = lecturer.courses.some(course => {
                        if (selectedProgram.code) {
                            return course.code.toLowerCase().includes(selectedProgram.code.toLowerCase()) ||
                                   selectedProgram.code.toLowerCase().includes(course.code.toLowerCase());
                        }
                        // Fallback to name matching if no code
                        return selectedProgram.name?.toLowerCase().includes(course.title.toLowerCase()) ||
                               course.title.toLowerCase().includes(selectedProgram.name?.toLowerCase() || '');
                    });
                    if (!programMatch) return false;
                }
            }

            // Academic Level filter
            const levelMatch = selectedLevel === "All Levels" || 
                            (lecturer.title && lecturer.title.includes(selectedLevel));
            if (!levelMatch) return false;

            // Search filter
            if (filters.searchTerm && filters.searchTerm.length > 0) {
                const searchLower = filters.searchTerm.toLowerCase();
                const searchMatch = 
                    lecturer.name.toLowerCase().includes(searchLower) ||
                    lecturer.id.toLowerCase().includes(searchLower) ||
                    lecturer.school.toLowerCase().includes(searchLower) ||
                    lecturer.department.toLowerCase().includes(searchLower) ||
                    lecturer.title.toLowerCase().includes(searchLower) ||
                    lecturer.courses.some(course =>
                        course.title.toLowerCase().includes(searchLower) ||
                        course.code.toLowerCase().includes(searchLower)
                    );
                if (!searchMatch) return false;
            }

            return true;
        });
    }, [filters, selectedLevel, filterOptions]);

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Lecturer Attendance Records
            </h3>
            {/* New API-based Reusable Filters */}
            <div className="space-y-4 mb-6">
                <CascadingFilters
                    filters={filters}
                    onFiltersChange={updateFilters}
                    options={filterOptions}
                    isLoading={isFilterLoading}
                    showSearch={true}
                    searchPlaceholder="Search lecturers by name, ID, course, or title..."
                    orientation="horizontal"
                />
                
                {/* Additional Academic Level Filter */}
                <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-gray-700 min-w-fit">Academic Level:</label>
                            <div className="flex gap-2">
                                {["All Levels", "Professor", "Associate Professor", "Senior Lecturer", "Lecturer"].map((level) => (
                                    <Button
                                        key={level}
                                        variant={selectedLevel === level ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedLevel(level)}
                                        className="text-xs"
                                    >
                                        {level}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Filter Summary */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                        <span>Showing {filteredLecturers.length} lecturers</span>
                        {filters.school !== 'all' && (
                            <Badge variant="secondary">
                                School: {filterOptions.schools.find((s: any) => s.id === filters.school)?.name}
                            </Badge>
                        )}
                        {filters.department !== 'all' && (
                            <Badge variant="secondary">
                                Department: {filterOptions.departments.find((d: any) => d.id === filters.department)?.name}
                            </Badge>
                        )}
                        {filters.program !== 'all' && (
                            <Badge variant="secondary">
                                Program: {filterOptions.programs.find((p: any) => p.id === filters.program)?.name}
                            </Badge>
                        )}
                        {selectedLevel !== 'All Levels' && (
                            <Badge variant="secondary">
                                {selectedLevel}
                            </Badge>
                        )}
                        {filters.searchTerm && (
                            <Badge variant="secondary">
                                Search: "{filters.searchTerm}"
                            </Badge>
                        )}
                    </div>
                    
                    {/* Reset Filters Button */}
                    {(filters.school !== 'all' || filters.department !== 'all' || filters.program !== 'all' || 
                      selectedLevel !== 'All Levels' || filters.searchTerm) && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                resetFilters();
                                setSelectedLevel('All Levels');
                            }}
                            className="text-xs"
                        >
                            Clear All Filters
                        </Button>
                    )}
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLecturers.map((lecturer) => (
                    <div
                        key={lecturer.id}
                        className="rounded-xl border-2 p-6 hover:shadow-lg bg-white"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                    {lecturer.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {lecturer.id} • {lecturer.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {lecturer.school} • {lecturer.department}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-sm text-gray-800">
                                    Overall Attendance
                                </span>
                                <span
                                    className={`font-bold text-sm ${getAttendanceColor(
                                        lecturer.overallAttendance
                                    )}`}
                                >
                                    {lecturer.overallAttendance}%
                                </span>
                            </div>
                            <Progress value={lecturer.overallAttendance} />
                            <div className="text-xs text-gray-500 mt-1">
                                {lecturer.totalStudents} students
                            </div>
                        </div>
                        <div>
                            <h5 className="font-semibold text-gray-900 text-sm mb-2 mt-4">
                                Courses
                            </h5>
                            {lecturer.courses.map((course, idx) => (
                                <div key={idx} className="mb-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-semibold text-gray-900 text-sm">
                                                {course.code}
                                            </span>
                                            <span className="text-gray-600 ml-2 text-sm">
                                                {course.title}
                                            </span>
                                        </div>
                                        <span
                                            className={`font-bold text-sm ${getAttendanceColor(
                                                course.attendance
                                            )}`}
                                        >
                                            {course.attendance}%
                                        </span>
                                    </div>
                                    <Progress value={course.attendance} />
                                    <div className="text-xs text-gray-500 mt-1">
                                        {course.attended}/{course.sessions} sessions • {course.students} students
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {filteredLecturers.length === 0 && (
                    <div className="col-span-2 text-center text-gray-500 py-8">
                        No lecturers found.
                    </div>
                )}
            </div>
        </div>
    );
}
