import { NextResponse } from 'next/server';

// GET /api/administrative/departments?schoolId=1
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');

    // All departments
    const allDepartments = [
      // School of Engineering & Technology
      { id: '1', name: 'Computer Science', code: 'CS', schoolId: '1' },
      { id: '2', name: 'Software Engineering', code: 'SE', schoolId: '1' },
      { id: '3', name: 'Information Technology', code: 'IT', schoolId: '1' },
      { id: '4', name: 'Information Systems', code: 'IS', schoolId: '1' },
      { id: '5', name: 'Electrical Engineering', code: 'EE', schoolId: '1' },
      { id: '1475603f-6c32-4ad5-900f-827075d3434c', name: 'Software', code: 'SFT', schoolId: '1' }, // From your example
      
      // School of Business Administration  
      { id: '6', name: 'Business Administration', code: 'BA', schoolId: '2' },
      { id: '7', name: 'Accounting & Finance', code: 'AF', schoolId: '2' },
      { id: '8', name: 'Marketing', code: 'MKT', schoolId: '2' },
      { id: '9', name: 'Human Resources', code: 'HR', schoolId: '2' },
      
      // School of Arts & Sciences
      { id: '10', name: 'Mathematics', code: 'MATH', schoolId: '3' },
      { id: '11', name: 'Physics', code: 'PHYS', schoolId: '3' },
      { id: '12', name: 'Chemistry', code: 'CHEM', schoolId: '3' },
      { id: '13', name: 'English Literature', code: 'ENG', schoolId: '3' },
      { id: '14', name: 'History', code: 'HIST', schoolId: '3' },
      
      // School of Medicine & Health Sciences
      { id: '15', name: 'Medicine', code: 'MED', schoolId: '4' },
      { id: '16', name: 'Nursing', code: 'NURS', schoolId: '4' },
      { id: '17', name: 'Pharmacy', code: 'PHAR', schoolId: '4' },
      
      // School of Law
      { id: '18', name: 'Law', code: 'LAW', schoolId: '5' },
      { id: '19', name: 'Legal Studies', code: 'LS', schoolId: '5' }
    ];

    // Filter by school if provided
    const departments = schoolId 
      ? allDepartments.filter(dept => dept.schoolId === schoolId)
      : allDepartments;

    // Match your actual API response format
    return NextResponse.json({
      success: true,
      message: "Departments retrieved successfully", 
      data: {
        content: departments,
        page: 0,
        size: 20,
        totalElements: departments.length,
        totalPages: 1,
        first: true,
        last: true,
        hasNext: false,
        hasPrevious: false
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}
