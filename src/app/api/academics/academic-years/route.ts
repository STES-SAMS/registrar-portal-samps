import { NextResponse } from 'next/server';

// Mock academic years data
const mockAcademicYears = [
  {
    "id": "ay-2023-2024",
    "uuid": "ay-2023-2024",
    "name": "2023-2024",
    "title": "Academic Year 2023-2024",
    "year": "2023-2024",
    "startDate": "2023-09-01",
    "endDate": "2024-08-31",
    "isActive": false,
    "isCurrent": false
  },
  {
    "id": "ay-2024-2025",
    "uuid": "ay-2024-2025",
    "name": "2024-2025",
    "title": "Academic Year 2024-2025",
    "year": "2024-2025",
    "startDate": "2024-09-01",
    "endDate": "2025-08-31",
    "isActive": false,
    "isCurrent": false
  },
  {
    "id": "ay-2025-2026",
    "uuid": "ay-2025-2026",
    "name": "2025-2026",
    "title": "Academic Year 2025-2026",
    "year": "2025-2026",
    "startDate": "2025-09-01",
    "endDate": "2026-08-31",
    "isActive": true,
    "isCurrent": true
  },
  {
    "id": "ay-2026-2027",
    "uuid": "ay-2026-2027",
    "name": "2026-2027",
    "title": "Academic Year 2026-2027", 
    "year": "2026-2027",
    "startDate": "2026-09-01",
    "endDate": "2027-08-31",
    "isActive": false,
    "isCurrent": false
  }
];

export async function GET(request: Request) {
  try {
    console.log('🎓 API: GET /api/academics/academic-years called');
    
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    const page = parseInt(searchParams.get('page') || '0');
    const size = parseInt(searchParams.get('size') || '10');

    let filteredYears = mockAcademicYears;
    
    if (activeOnly) {
      filteredYears = mockAcademicYears.filter(year => year.isActive);
    }

    // Sort by year descending (most recent first)
    filteredYears.sort((a, b) => b.year.localeCompare(a.year));

    // Implement pagination
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedYears = filteredYears.slice(startIndex, endIndex);

    const response = {
      content: paginatedYears,
      data: paginatedYears, // Include both for compatibility
      page: {
        size: size,
        number: page,
        totalElements: filteredYears.length,
        totalPages: Math.ceil(filteredYears.length / size)
      },
      first: page === 0,
      last: page >= Math.ceil(filteredYears.length / size) - 1,
      numberOfElements: paginatedYears.length
    };

    console.log('🎓 API: Returning academic years response:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Error fetching academic years:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch academic years',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('🎓 API: POST /api/academics/academic-years called with:', body);
    
    // Mock creating a new academic year
    const newAcademicYear = {
      id: `ay-${Date.now()}`,
      uuid: `ay-${Date.now()}`,
      ...body,
      isActive: false,
      isCurrent: false
    };
    
    console.log('🎓 API: Created new academic year:', newAcademicYear);
    
    return NextResponse.json(newAcademicYear, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating academic year:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create academic year',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}