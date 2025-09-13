// API service functions for fetching filter data
import axios from '@/lib/api';
import { School, Department, Program } from '@/components/ui/filters/types';

// API endpoints for filter data
export const FILTER_ENDPOINTS = {
  schools: '/administrative/schools',
  departments: '/administrative/departments',
  programs: '/administrative/programs',
};

/**
 * Fetch all schools
 */
export async function fetchSchools(): Promise<School[]> {
  try {
    const response = await axios.get(FILTER_ENDPOINTS.schools);
    
    // Handle the actual API response format
    if (response.data.success && response.data.data?.content) {
      return response.data.data.content.map((school: any) => ({
        id: school.id,
        name: school.name,
        code: school.code,
        description: school.description || school.fullDisplayName,
      }));
    }
    
    // Fallback to empty array if response format is unexpected
    return [];
  } catch (error) {
    console.error('Error fetching schools:', error);
    // Return mock data for development if API fails
    return getMockSchools();
  }
}

/**
 * Fetch departments by school ID
 */
export async function fetchDepartmentsBySchool(schoolId: string): Promise<Department[]> {
  try {
    const response = await axios.get(`${FILTER_ENDPOINTS.departments}?schoolId=${schoolId}`);
    
    // Handle the actual API response format
    if (response.data.success && response.data.data?.content) {
      return response.data.data.content.map((dept: any) => ({
        id: dept.id,
        name: dept.name,
        code: dept.code,
        schoolId: dept.schoolId,
        description: dept.description || dept.fullDisplayName,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching departments:', error);
    // Return mock data for development if API fails
    return getMockDepartments().filter(dept => dept.schoolId === schoolId);
  }
}

/**
 * Fetch all departments
 */
export async function fetchAllDepartments(): Promise<Department[]> {
  try {
    const response = await axios.get(FILTER_ENDPOINTS.departments);
    
    // Handle the actual API response format
    if (response.data.success && response.data.data?.content) {
      return response.data.data.content.map((dept: any) => ({
        id: dept.id,
        name: dept.name,
        code: dept.code,
        schoolId: dept.schoolId,
        description: dept.description || dept.fullDisplayName,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching all departments:', error);
    return getMockDepartments();
  }
}

/**
 * Fetch programs by department ID
 */
export async function fetchProgramsByDepartment(departmentId: string): Promise<Program[]> {
  try {
    const response = await axios.get(`${FILTER_ENDPOINTS.programs}?departmentId=${departmentId}`);
    
    // Handle the actual API response format
    if (response.data.success && response.data.data?.content) {
      return response.data.data.content.map((program: any) => ({
        id: program.id,
        name: program.name,
        code: program.code,
        departmentId: program.departmentId,
        level: program.degreeLevel || program.degreeType,
        duration: program.durationYears ? `${program.durationYears} years` : undefined,
        description: program.description || program.fullDisplayName,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching programs:', error);
    // Return mock data for development if API fails
    return getMockPrograms().filter(program => program.departmentId === departmentId);
  }
}

/**
 * Fetch all programs
 */
export async function fetchAllPrograms(): Promise<Program[]> {
  try {
    const response = await axios.get(FILTER_ENDPOINTS.programs);
    
    // Handle the actual API response format
    if (response.data.success && response.data.data?.content) {
      return response.data.data.content.map((program: any) => ({
        id: program.id,
        name: program.name,
        code: program.code,
        departmentId: program.departmentId,
        level: program.degreeLevel || program.degreeType,
        duration: program.durationYears ? `${program.durationYears} years` : undefined,
        description: program.description || program.fullDisplayName,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching all programs:', error);
    return getMockPrograms();
  }
}

/**
 * Fetch programs by school ID (through departments)
 */
export async function fetchProgramsBySchool(schoolId: string): Promise<Program[]> {
  try {
    const response = await axios.get(`${FILTER_ENDPOINTS.programs}?schoolId=${schoolId}`);
    
    // Handle the actual API response format
    if (response.data.success && response.data.data?.content) {
      return response.data.data.content.map((program: any) => ({
        id: program.id,
        name: program.name,
        code: program.code,
        departmentId: program.departmentId,
        level: program.degreeLevel || program.degreeType,
        duration: program.durationYears ? `${program.durationYears} years` : undefined,
        description: program.description || program.fullDisplayName,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching programs by school:', error);
    // Fallback: get departments first, then programs
    const departments = await fetchDepartmentsBySchool(schoolId);
    const departmentIds = departments.map(dept => dept.id);
    const allPrograms = await fetchAllPrograms();
    return allPrograms.filter(program => departmentIds.includes(program.departmentId));
  }
}

// Mock data for development/fallback
function getMockSchools(): School[] {
  return [
    { id: '1', name: 'School of Engineering', code: 'ENG' },
    { id: '2', name: 'School of Business', code: 'BUS' },
    { id: '3', name: 'School of Arts & Sciences', code: 'AS' },
    { id: '4', name: 'School of Medicine', code: 'MED' },
    { id: '5', name: 'School of Law', code: 'LAW' },
    { id: '6', name: 'School of Education', code: 'EDU' },
  ];
}

function getMockDepartments(): Department[] {
  return [
    // Engineering Departments
    { id: '1', name: 'Computer Science', code: 'CS', schoolId: '1' },
    { id: '2', name: 'Information Systems', code: 'IS', schoolId: '1' },
    { id: '3', name: 'Software Engineering', code: 'SE', schoolId: '1' },
    { id: '4', name: 'Electrical Engineering', code: 'EE', schoolId: '1' },
    { id: '5', name: 'Mechanical Engineering', code: 'ME', schoolId: '1' },
    
    // Business Departments
    { id: '6', name: 'Business Administration', code: 'BA', schoolId: '2' },
    { id: '7', name: 'Accounting', code: 'ACC', schoolId: '2' },
    { id: '8', name: 'Marketing', code: 'MKT', schoolId: '2' },
    { id: '9', name: 'Finance', code: 'FIN', schoolId: '2' },
    
    // Arts & Sciences Departments
    { id: '10', name: 'Mathematics', code: 'MATH', schoolId: '3' },
    { id: '11', name: 'Physics', code: 'PHYS', schoolId: '3' },
    { id: '12', name: 'Chemistry', code: 'CHEM', schoolId: '3' },
    { id: '13', name: 'Biology', code: 'BIO', schoolId: '3' },
    { id: '14', name: 'English Literature', code: 'ENG', schoolId: '3' },
    
    // Medicine Departments
    { id: '15', name: 'Internal Medicine', code: 'IM', schoolId: '4' },
    { id: '16', name: 'Surgery', code: 'SURG', schoolId: '4' },
    { id: '17', name: 'Pediatrics', code: 'PED', schoolId: '4' },
    
    // Law Departments
    { id: '18', name: 'Constitutional Law', code: 'CONST', schoolId: '5' },
    { id: '19', name: 'Criminal Law', code: 'CRIM', schoolId: '5' },
    
    // Education Departments
    { id: '20', name: 'Elementary Education', code: 'ELEM', schoolId: '6' },
    { id: '21', name: 'Secondary Education', code: 'SEC', schoolId: '6' },
  ];
}

function getMockPrograms(): Program[] {
  return [
    // Computer Science Programs
    { id: '1', name: 'Bachelor of Computer Science', code: 'BCS', departmentId: '1', level: 'Undergraduate', duration: '4 years' },
    { id: '2', name: 'Master of Computer Science', code: 'MCS', departmentId: '1', level: 'Graduate', duration: '2 years' },
    { id: '3', name: 'PhD in Computer Science', code: 'PhD-CS', departmentId: '1', level: 'Postgraduate', duration: '4 years' },
    
    // Information Systems Programs
    { id: '4', name: 'Bachelor of Information Systems', code: 'BIS', departmentId: '2', level: 'Undergraduate', duration: '4 years' },
    { id: '5', name: 'Master of Information Systems', code: 'MIS', departmentId: '2', level: 'Graduate', duration: '2 years' },
    
    // Software Engineering Programs
    { id: '6', name: 'Bachelor of Software Engineering', code: 'BSE', departmentId: '3', level: 'Undergraduate', duration: '4 years' },
    { id: '7', name: 'Master of Software Engineering', code: 'MSE', departmentId: '3', level: 'Graduate', duration: '2 years' },
    
    // Business Administration Programs
    { id: '8', name: 'Bachelor of Business Administration', code: 'BBA', departmentId: '6', level: 'Undergraduate', duration: '4 years' },
    { id: '9', name: 'Master of Business Administration', code: 'MBA', departmentId: '6', level: 'Graduate', duration: '2 years' },
    
    // Accounting Programs
    { id: '10', name: 'Bachelor of Accounting', code: 'BAcc', departmentId: '7', level: 'Undergraduate', duration: '4 years' },
    { id: '11', name: 'Master of Accounting', code: 'MAcc', departmentId: '7', level: 'Graduate', duration: '2 years' },
    
    // Mathematics Programs
    { id: '12', name: 'Bachelor of Mathematics', code: 'BMath', departmentId: '10', level: 'Undergraduate', duration: '4 years' },
    { id: '13', name: 'Master of Mathematics', code: 'MMath', departmentId: '10', level: 'Graduate', duration: '2 years' },
    
    // Medicine Programs
    { id: '14', name: 'Doctor of Medicine', code: 'MD', departmentId: '15', level: 'Professional', duration: '6 years' },
    { id: '15', name: 'Bachelor of Medicine', code: 'MBBS', departmentId: '15', level: 'Undergraduate', duration: '6 years' },
    
    // Law Programs
    { id: '16', name: 'Bachelor of Laws', code: 'LLB', departmentId: '18', level: 'Undergraduate', duration: '4 years' },
    { id: '17', name: 'Master of Laws', code: 'LLM', departmentId: '18', level: 'Graduate', duration: '2 years' },
    
    // Education Programs
    { id: '18', name: 'Bachelor of Education', code: 'BEd', departmentId: '20', level: 'Undergraduate', duration: '4 years' },
    { id: '19', name: 'Master of Education', code: 'MEd', departmentId: '20', level: 'Graduate', duration: '2 years' },
  ];
}
