"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Download } from 'lucide-react';

import { CascadingFilters } from '@/components/ui/filters';
import { useFilters } from '@/hooks/use-filters';

// Mock data for demonstration
const sampleStudents = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    studentId: 'ST001',
    schoolId: '1',
    departmentId: '1',
    programId: '1',
    year: '3rd Year',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    studentId: 'ST002',
    schoolId: '1',
    departmentId: '2',
    programId: '4',
    year: '2nd Year',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    studentId: 'ST003',
    schoolId: '2',
    departmentId: '6',
    programId: '8',
    year: '1st Year',
    status: 'Active'
  },
  // Add more sample data...
];

export default function StudentsListExample() {
  const {
    filters,
    filterOptions,
    isLoading,
    error,
    updateFilters,
    resetFilters,
    getCurrentSchool,
    getCurrentDepartment,
    getCurrentProgram
  } = useFilters({
    loadMode: 'eager' // Load all data at once for better UX
  });

  // Filter students based on current filter state
  const filteredStudents = React.useMemo(() => {
    return sampleStudents.filter(student => {
      // School filter
      if (filters.school !== 'all' && student.schoolId !== filters.school) {
        return false;
      }

      // Department filter
      if (filters.department !== 'all' && student.departmentId !== filters.department) {
        return false;
      }

      // Program filter
      if (filters.program !== 'all' && student.programId !== filters.program) {
        return false;
      }

      // Search filter
      if (filters.searchTerm && filters.searchTerm.length > 0) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          student.name.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          student.studentId.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [filters, sampleStudents]);

  const getSchoolName = (schoolId: string) => {
    const school = filterOptions.schools.find(s => s.id === schoolId);
    return school ? school.name : 'Unknown School';
  };

  const getDepartmentName = (departmentId: string) => {
    const department = filterOptions.departments.find(d => d.id === departmentId);
    return department ? department.name : 'Unknown Department';
  };

  const getProgramName = (programId: string) => {
    const program = filterOptions.programs.find(p => p.id === programId);
    return program ? program.name : 'Unknown Program';
  };

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200">
          <CardContent className="p-6">
            <p className="text-red-600">Error loading data: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
        <p className="text-gray-600">Manage and filter students across schools, departments, and programs</p>
      </div>

      {/* Filters */}
      <CascadingFilters
        filters={filters}
        onFiltersChange={updateFilters}
        options={filterOptions}
        isLoading={isLoading}
        showSearch={true}
        searchPlaceholder="Search students by name, email, or ID..."
        orientation="horizontal"
      />

      {/* Filter Summary */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <span>Showing {filteredStudents.length} students</span>
        {getCurrentSchool() && (
          <Badge variant="secondary">
            School: {getCurrentSchool()?.name}
          </Badge>
        )}
        {getCurrentDepartment() && (
          <Badge variant="secondary">
            Department: {getCurrentDepartment()?.name}
          </Badge>
        )}
        {getCurrentProgram() && (
          <Badge variant="secondary">
            Program: {getCurrentProgram()?.name}
          </Badge>
        )}
        {filters.searchTerm && (
          <Badge variant="secondary">
            Search: "{filters.searchTerm}"
          </Badge>
        )}
      </div>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No students found matching your criteria</p>
              <Button 
                onClick={resetFilters} 
                variant="outline" 
                className="mt-4"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Student ID:</span> {student.studentId}</p>
                        <p><span className="font-medium">Email:</span> {student.email}</p>
                        <p><span className="font-medium">Year:</span> {student.year}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">School:</span> {getSchoolName(student.schoolId)}</p>
                        <p><span className="font-medium">Department:</span> {getDepartmentName(student.departmentId)}</p>
                        <p><span className="font-medium">Program:</span> {getProgramName(student.programId)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
