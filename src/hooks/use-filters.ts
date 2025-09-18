"use client";

import { useState, useEffect } from 'react';
import { 
  FilterState, 
  FilterOptions, 
  School, 
  Department, 
  Program 
} from '@/components/ui/filters/types';
import {
  fetchSchools,
  fetchAllDepartments,
  fetchAllPrograms,
  fetchDepartmentsBySchool,
  fetchProgramsByDepartment,
  
} from '@/lib/api-filters';

export interface UseFiltersOptions {
  initialFilters?: Partial<FilterState>;
  loadMode?: 'lazy' | 'eager'; // lazy = load as needed, eager = load all at once
}

export function useFilters(options: UseFiltersOptions = {}) {
  const {
    initialFilters = {},
    loadMode = 'eager'
  } = options;

  const [filters, setFilters] = useState<FilterState>({
    school: 'all',
    department: 'all',
    program: 'all',
    searchTerm: '',
    ...initialFilters
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    schools: [],
    departments: [],
    programs: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load departments when school changes (lazy mode only)
  useEffect(() => {
    if (loadMode === 'lazy' && filters.school !== 'all') {
      loadDepartmentsBySchool(filters.school);
    }
  }, [filters.school, loadMode]);

  // Load programs when department changes (lazy mode only)
  useEffect(() => {
    if (loadMode === 'lazy' && filters.department !== 'all') {
      loadProgramsByDepartment(filters.department);
    }
  }, [filters.department, loadMode]);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const schools = await fetchSchools();
      setFilterOptions(prev => ({ ...prev, schools }));

      if (loadMode === 'eager') {
        // Load all data at once
        const [departments, programs] = await Promise.all([
          fetchAllDepartments(),
          fetchAllPrograms()
        ]);
        
        setFilterOptions(prev => ({
          ...prev,
          departments,
          programs
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load filter data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDepartmentsBySchool = async (schoolId: string) => {
    try {
      const departments = await fetchDepartmentsBySchool(schoolId);
      setFilterOptions(prev => ({ ...prev, departments }));
    } catch (err) {
      console.error('Error loading departments:', err);
    }
  };

  const loadProgramsByDepartment = async (departmentId: string) => {
    try {
      const programs = await fetchProgramsByDepartment(departmentId);
      setFilterOptions(prev => ({ ...prev, programs }));
    } catch (err) {
      console.error('Error loading programs:', err);
    }
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      school: 'all',
      department: 'all',
      program: 'all',
      searchTerm: '',
    });
  };

  // Helper functions to get filtered data
  const getFilteredDepartments = () => {
    if (filters.school === 'all') {
      return filterOptions.departments;
    }
    return filterOptions.departments.filter(dept => dept.schoolId === filters.school);
  };

  const getFilteredPrograms = () => {
    if (filters.department !== 'all') {
      return filterOptions.programs.filter(program => program.departmentId === filters.department);
    }
    
    if (filters.school !== 'all') {
      const schoolDepartmentIds = getFilteredDepartments().map(dept => dept.id);
      return filterOptions.programs.filter(program => schoolDepartmentIds.includes(program.departmentId));
    }
    
    return filterOptions.programs;
  };

  // Get current filter values as objects
  const getCurrentSchool = (): School | null => {
    if (filters.school === 'all') return null;
    return filterOptions.schools.find(school => school.id === filters.school) || null;
  };

  const getCurrentDepartment = (): Department | null => {
    if (filters.department === 'all') return null;
    return filterOptions.departments.find(dept => dept.id === filters.department) || null;
  };

  const getCurrentProgram = (): Program | null => {
    if (filters.program === 'all') return null;
    return filterOptions.programs.find(program => program.id === filters.program) || null;
  };

  return {
    // State
    filters,
    filterOptions,
    isLoading,
    error,

    // Actions
    updateFilters,
    resetFilters,
    
    // Helper functions
    getFilteredDepartments,
    getFilteredPrograms,
    getCurrentSchool,
    getCurrentDepartment,
    getCurrentProgram,

    // For convenience
    setFilters: updateFilters,
  };
}

// Simplified hook for just managing filter state without API calls
export function useFilterState(initialFilters: Partial<FilterState> = {}) {
  const [filters, setFilters] = useState<FilterState>({
    school: 'all',
    department: 'all',
    program: 'all',
    searchTerm: '',
    ...initialFilters
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      school: 'all',
      department: 'all',
      program: 'all',
      searchTerm: '',
    });
  };

  return {
    filters,
    setFilters: updateFilters,
    updateFilters,
    resetFilters,
  };
}
