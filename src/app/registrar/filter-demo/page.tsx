"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CascadingFilters, SchoolFilter, DepartmentFilter, ProgramFilter } from '@/components/ui/filters';
import { useFilters, useFilterState } from '@/hooks/use-filters';

export default function FilterDemoPage() {
  // Demo with API calls (will use mock data if APIs not available)
  const apiFilters = useFilters({
    loadMode: 'eager'
  });

  // Demo with static data
  const staticFilters = useFilterState();
  const staticOptions = {
    schools: [
      { id: '1', name: 'School of ICT', code: 'ICT' },
      { id: '2', name: 'School of Business', code: 'BUS' },
    ],
    departments: [
      { id: '1', name: 'Computer Science', code: 'CS', schoolId: '1' },
      { id: '2', name: 'Information Systems', code: 'IS', schoolId: '1' },
      { id: '3', name: 'Business Admin', code: 'BA', schoolId: '2' },
    ],
    programs: [
      { id: '1', name: 'Bachelor of CS', code: 'BCS', departmentId: '1', level: 'Undergraduate' },
      { id: '2', name: 'Bachelor of IS', code: 'BIS', departmentId: '2', level: 'Undergraduate' },
      { id: '3', name: 'Bachelor of BA', code: 'BBA', departmentId: '3', level: 'Undergraduate' },
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Filter Components Demo</h1>
        <p className="text-gray-600">Demonstrating reusable filter components for school, department, and program selection.</p>
      </div>

      {/* API-based Cascading Filters */}
      <Card>
        <CardHeader>
          <CardTitle>1. Cascading Filters with API Integration</CardTitle>
          <p className="text-sm text-gray-600">Filters that load data from your API endpoints</p>
        </CardHeader>
        <CardContent>
          <CascadingFilters
            filters={apiFilters.filters}
            onFiltersChange={apiFilters.updateFilters}
            options={apiFilters.filterOptions}
            isLoading={apiFilters.isLoading}
            showSearch={true}
            searchPlaceholder="Search anything..."
            orientation="horizontal"
          />
          
          {/* Show current filter state */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Current Filter State:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">School: {apiFilters.filters.school}</Badge>
              <Badge variant="outline">Department: {apiFilters.filters.department}</Badge>
              <Badge variant="outline">Program: {apiFilters.filters.program}</Badge>
              {apiFilters.filters.searchTerm && (
                <Badge variant="outline">Search: "{apiFilters.filters.searchTerm}"</Badge>
              )}
            </div>
          </div>

          {apiFilters.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">Error: {apiFilters.error}</p>
              <p className="text-red-500 text-xs mt-1">Using mock data instead</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Static Data Cascading Filters */}
      <Card>
        <CardHeader>
          <CardTitle>2. Cascading Filters with Static Data</CardTitle>
          <p className="text-sm text-gray-600">Filters using predefined static data</p>
        </CardHeader>
        <CardContent>
          <CascadingFilters
            filters={staticFilters.filters}
            onFiltersChange={staticFilters.updateFilters}
            options={staticOptions}
            isLoading={false}
            showSearch={true}
            searchPlaceholder="Search static data..."
            orientation="horizontal"
          />
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Current Filter State:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">School: {staticFilters.filters.school}</Badge>
              <Badge variant="outline">Department: {staticFilters.filters.department}</Badge>  
              <Badge variant="outline">Program: {staticFilters.filters.program}</Badge>
              {staticFilters.filters.searchTerm && (
                <Badge variant="outline">Search: "{staticFilters.filters.searchTerm}"</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Filter Components */}
      <Card>
        <CardHeader>
          <CardTitle>3. Individual Filter Components</CardTitle>
          <p className="text-sm text-gray-600">Using individual filter components for custom layouts</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">School</label>
              <SchoolFilter
                schools={staticOptions.schools}
                value={staticFilters.filters.school}
                onValueChange={(value) => staticFilters.updateFilters({ school: value, department: 'all', program: 'all' })}
                placeholder="Choose School"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <DepartmentFilter
                departments={staticOptions.departments.filter(d => 
                  staticFilters.filters.school === 'all' || d.schoolId === staticFilters.filters.school
                )}
                value={staticFilters.filters.department}
                onValueChange={(value) => staticFilters.updateFilters({ department: value, program: 'all' })}
                placeholder="Choose Department"
                disabled={staticFilters.filters.school === 'all'}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Program</label>
              <ProgramFilter
                programs={staticOptions.programs.filter(p => 
                  staticFilters.filters.department === 'all' || p.departmentId === staticFilters.filters.department
                )}
                value={staticFilters.filters.program}
                onValueChange={(value) => staticFilters.updateFilters({ program: value })}
                placeholder="Choose Program"
                disabled={staticFilters.filters.department === 'all'}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vertical Layout Demo */}
      <Card>
        <CardHeader>
          <CardTitle>4. Vertical Layout</CardTitle>
          <p className="text-sm text-gray-600">Filters in vertical orientation (good for sidebars)</p>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <CascadingFilters
              filters={staticFilters.filters}
              onFiltersChange={staticFilters.updateFilters}
              options={staticOptions}
              isLoading={false}
              showSearch={false}
              orientation="vertical"
            />
          </div>
        </CardContent>
      </Card>

      {/* Usage Example */}
      <Card>
        <CardHeader>
          <CardTitle>5. Implementation Code Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`import { CascadingFilters } from '@/components/ui/filters';
import { useFilters } from '@/hooks/use-filters';

export default function YourPage() {
  const { filters, filterOptions, isLoading, updateFilters } = useFilters();
  
  // Filter your data based on current filters
  const filteredData = data.filter(item => {
    if (filters.school !== 'all' && item.schoolId !== filters.school) return false;
    if (filters.department !== 'all' && item.departmentId !== filters.department) return false;
    if (filters.program !== 'all' && item.programId !== filters.program) return false;
    return true;
  });

  return (
    <div>
      <CascadingFilters
        filters={filters}
        onFiltersChange={updateFilters}
        options={filterOptions}
        isLoading={isLoading}
        showSearch={true}
        searchPlaceholder="Search..."
      />
      {/* Your filtered content here */}
    </div>
  );
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
