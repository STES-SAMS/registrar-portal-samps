import React, { useState, useMemo } from "react";
import { studentsData } from "./attendance";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Import the new filter components with API integration
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

export default function StudentsPage() {
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
    
    const [selectedYear, setSelectedYear] = useState("All Years");

    // Filtering logic with API-based filter system
    const filteredStudents = useMemo(() => {
        return studentsData.filter(student => {
            // School filter - match by school name from API data
            if (filters.school !== 'all') {
                const selectedSchool = filterOptions.schools.find((school: any) => school.id === filters.school);
                if (selectedSchool) {
                    // Try to match school names (handle variations like "School of ICT" vs "Computer Science")
                    const schoolNameMatch = 
                        student.school.toLowerCase().includes(selectedSchool.name?.toLowerCase() || '') ||
                        selectedSchool.name?.toLowerCase().includes(student.school.toLowerCase()) ||
                        (selectedSchool.code && selectedSchool.code.toLowerCase() === student.school.toLowerCase());
                    if (!schoolNameMatch) return false;
                }
            }

            // Department filter - match by department name from API data
            if (filters.department !== 'all') {
                const selectedDepartment = filterOptions.departments.find((dept: any) => dept.id === filters.department);
                if (selectedDepartment) {
                    const departmentNameMatch = 
                        student.department.toLowerCase().includes(selectedDepartment.name?.toLowerCase() || '') ||
                        selectedDepartment.name?.toLowerCase().includes(student.department.toLowerCase()) ||
                        (selectedDepartment.code && selectedDepartment.code.toLowerCase() === student.department.toLowerCase());
                    if (!departmentNameMatch) return false;
                }
            }

            // Program filter - match by program name from API data
            if (filters.program !== 'all') {
                const selectedProgram = filterOptions.programs.find((prog: any) => prog.id === filters.program);
                if (selectedProgram) {
                    // For programs, we might need to check course codes or other identifiers
                    const programMatch = student.courses.some(course => {
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

            // Year filter
            const yearMatch = selectedYear === "All Years" || 
                            (student.year && student.year === selectedYear);
            if (!yearMatch) return false;

            // Search filter
            if (filters.searchTerm && filters.searchTerm.length > 0) {
                const searchLower = filters.searchTerm.toLowerCase();
                const searchMatch = 
                    student.name.toLowerCase().includes(searchLower) ||
                    student.id.toLowerCase().includes(searchLower) ||
                    student.school.toLowerCase().includes(searchLower) ||
                    student.department.toLowerCase().includes(searchLower) ||
                    student.courses.some(course =>
                        course.title.toLowerCase().includes(searchLower) ||
                        course.code.toLowerCase().includes(searchLower)
                    );
                if (!searchMatch) return false;
            }

            return true;
        });
    }, [filters, selectedYear, filterOptions]);

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Student Attendance Records
            </h3>

            {/* New Reusable Filters */}
            <div className="space-y-4 mb-6">
                <CascadingFilters
                    filters={filters}
                    onFiltersChange={updateFilters}
                    options={filterOptions}
                    isLoading={isFilterLoading}
                    showSearch={true}
                    searchPlaceholder="Search students by name, ID, or course..."
                    orientation="horizontal"
                />
                
                {/* Additional Year Filter */}
                <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-gray-700 min-w-fit">Academic Year:</label>
                            <div className="flex gap-2">
                                {["All Years", "Year 1", "Year 2", "Year 3"].map((year) => (
                                    <Button
                                        key={year}
                                        variant={selectedYear === year ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedYear(year)}
                                        className="text-xs"
                                    >
                                        {year}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Filter Summary */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                        <span>Showing {filteredStudents.length} students</span>
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
                        {selectedYear !== 'All Years' && (
                            <Badge variant="secondary">
                                {selectedYear}
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
                      selectedYear !== 'All Years' || filters.searchTerm) && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                resetFilters();
                                setSelectedYear('All Years');
                            }}
                            className="text-xs"
                        >
                            Clear All Filters
                        </Button>
                    )}
                </div>
            </div>

            {/* Students list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStudents.map((student) => (
                    <div
                        key={student.id}
                        className="rounded-xl border-2 p-6 hover:shadow-lg bg-white"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                    {student.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {student.id} • {student.year}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {student.school} • {student.department}
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
                                        student.overallAttendance
                                    )}`}
                                >
                                    {student.overallAttendance}%
                                </span>
                            </div>
                            <Progress value={student.overallAttendance} />
                        </div>
                        <div>
                            <h5 className="font-semibold text-gray-900 text-sm mb-2 mt-4">
                                Courses
                            </h5>
                            {student.courses.map((course, idx) => (
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
                                        {course.attended}/{course.sessions} sessions
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {filteredStudents.length === 0 && (
                    <div className="col-span-2 text-center text-gray-500 py-8">
                        No students found.
                    </div>
                )}
            </div>
        </div>
    );
}
