import { NextResponse } from 'next/server';

// Mock semester data
const mockSemesters = [
  {
    "id": "sem-2024-1",
    "name": "Fall Semester 2024",
    "code": "FALL2024",
    "description": "Fall semester for academic year 2024-2025",
    "startDate": "2024-09-01",
    "endDate": "2024-12-15",
    "isActive": false,
    "academicYear": "2024-2025",
    "semesterNumber": 1
  },
  {
    "id": "sem-2025-1",
    "name": "Spring Semester 2025",
    "code": "SPRING2025",
    "description": "Spring semester for academic year 2024-2025",
    "startDate": "2025-01-15",
    "endDate": "2025-05-15",
    "isActive": false,
    "academicYear": "2024-2025",
    "semesterNumber": 2
  },
  {
    "id": "sem-2025-2",
    "name": "Summer Semester 2025",
    "code": "SUMMER2025",
    "description": "Summer semester for academic year 2024-2025",
    "startDate": "2025-06-01",
    "endDate": "2025-08-15",
    "isActive": false,
    "academicYear": "2024-2025",
    "semesterNumber": 3
  },
  {
    "id": "sem-2025-3",
    "name": "Fall Semester 2025",
    "code": "FALL2025",
    "description": "Fall semester for academic year 2025-2026",
    "startDate": "2025-09-01",
    "endDate": "2025-12-15",
    "isActive": true,
    "academicYear": "2025-2026",
    "semesterNumber": 1
  },
  {
    "id": "sem-2026-1",
    "name": "Spring Semester 2026",
    "code": "SPRING2026",
    "description": "Spring semester for academic year 2025-2026",
    "startDate": "2026-01-15",
    "endDate": "2026-05-15",
    "isActive": false,
    "academicYear": "2025-2026",
    "semesterNumber": 2
  }
];

// GET /api/academics/semesters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '0');
    const size = parseInt(searchParams.get('size') || '20');
    const activeOnly = searchParams.get('activeOnly') === 'true';
    
    // Filter by active status if requested
    let filteredSemesters = mockSemesters;
    if (activeOnly) {
      filteredSemesters = mockSemesters.filter(semester => semester.isActive);
    }
    
    // Sort by start date (most recent first)
    filteredSemesters.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    
    // Calculate pagination
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedSemesters = filteredSemesters.slice(startIndex, endIndex);
    
    return NextResponse.json({
      success: true,
      message: "Semesters retrieved successfully",
      data: {
        content: paginatedSemesters,
        page: page,
        size: size,
        totalElements: filteredSemesters.length,
        totalPages: Math.ceil(filteredSemesters.length / size),
        first: page === 0,
        last: endIndex >= filteredSemesters.length,
        hasNext: endIndex < filteredSemesters.length,
        hasPrevious: page > 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching semesters:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch semesters',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
