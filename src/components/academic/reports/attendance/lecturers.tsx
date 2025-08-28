import React, { useState } from "react";
import { lecturersData } from "./attendance";
import { Progress } from "@/components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ✅ use shadcn/ui instead of radix
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

function getAttendanceColor(attendance) {
    if (attendance >= 90) return "text-emerald-600";
    if (attendance >= 85) return "text-green-600";
    if (attendance >= 75) return "text-amber-600";
    return "text-red-600";
}

const SCHOOLS = ["All Schools", "School of ICT", "School of Business", "School of Arts"];
const PROGRAMS = ["All Programs", "CSE", "CS", "IT", "IS"];
const YEARS = ["All Years", "Year 1", "Year 2", "Year 3"];

export default function LecturersPage() {
    const [selectedSchool, setSelectedSchool] = useState("All Schools");
    const [selectedProgram, setSelectedProgram] = useState("All Programs");
    const [selectedYear, setSelectedYear] = useState("All Years");
    const [classSearch, setClassSearch] = useState("");

    const filteredLecturers = lecturersData.filter(lecturer => {
        const schoolMatch =
            selectedSchool === "All Schools" || lecturer.school === selectedSchool;
        const programMatch =
            selectedProgram === "All Programs" ||
            (lecturer.program && lecturer.program === selectedProgram);
        const yearMatch =
            selectedYear === "All Years" ||
            (lecturer.year && lecturer.year === selectedYear);

        const searchLower = classSearch.toLowerCase();
        const searchMatch =
            classSearch === "" ||
            lecturer.name.toLowerCase().includes(searchLower) ||
            lecturer.id.toLowerCase().includes(searchLower) ||
            lecturer.courses.some(
                course =>
                    course.title.toLowerCase().includes(searchLower) ||
                    course.code.toLowerCase().includes(searchLower)
            );
        return schoolMatch && programMatch && yearMatch && searchMatch;
    });

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Lecturer Attendance Records
            </h3>
            <div className="flex gap-2 mb-4 items-center flex-wrap">
                {/* School Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 min-w-[160px] justify-between"
                        >
                            {selectedSchool}
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-[9999] bg-white shadow-lg">
                        {SCHOOLS.map((school) => (
                            <DropdownMenuItem
                                key={school}
                                onClick={() => setSelectedSchool(school)} //  use onClick not onSelect
                                className={`flex items-center gap-2 px-2 py-2 ${selectedSchool === school ? "bg-accent" : ""
                                    }`}
                            >
                                <span>{school}</span>
                                {selectedSchool === school && (
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        ✓
                                    </span>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Program Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 min-w-[140px] justify-between"
                        >
                            {selectedProgram}
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-[9999] bg-white shadow-lg">
                        {PROGRAMS.map((program) => (
                            <DropdownMenuItem
                                key={program}
                                onClick={() => setSelectedProgram(program)}
                                className={`flex items-center gap-2 px-2 py-2 ${selectedProgram === program ? "bg-accent" : ""
                                    }`}
                            >
                                <span>{program}</span>
                                {selectedProgram === program && (
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        ✓
                                    </span>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Year Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 min-w-[120px] justify-between"
                        >
                            {selectedYear}
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-[9999] bg-white shadow-lg">
                        {YEARS.map((year) => (
                            <DropdownMenuItem
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`flex items-center gap-2 px-2 py-2 ${selectedYear === year ? "bg-accent" : ""
                                    }`}
                            >
                                <span>{year}</span>
                                {selectedYear === year && (
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        ✓
                                    </span>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
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
