import { NextResponse } from 'next/server';

// GET /api/administrative/schools
export async function GET() {
  try {
    // Replace with your actual database query
    const schools = [
      {
        id: '1',
        name: 'School of Engineering & Technology',
        code: 'SET',
        description: 'Computer Science, Software Engineering, Information Technology'
      },
      {
        id: '2',
        name: 'School of Business Administration',
        code: 'SBA',
        description: 'Business, Accounting, Marketing, Finance'
      },
      {
        id: '3',
        name: 'School of Arts & Sciences',
        code: 'SAS',
        description: 'Liberal Arts, Sciences, Mathematics, Literature'
      },
      {
        id: '4',
        name: 'School of Medicine & Health Sciences',
        code: 'SMHS',
        description: 'Medicine, Nursing, Allied Health'
      },
      {
        id: '5',
        name: 'School of Law',
        code: 'SOL',
        description: 'Law, Legal Studies'
      }
    ];

    return NextResponse.json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}
