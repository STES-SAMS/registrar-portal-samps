import { NextResponse } from 'next/server';

// GET /api/programs?departmentId=1 or /api/programs?schoolId=1
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');
    const schoolId = searchParams.get('schoolId');

    // All programs
    const allPrograms = [
      // Computer Science Programs
      { id: '1', name: 'Bachelor of Computer Science', code: 'BCS', departmentId: '1', level: 'Undergraduate', duration: '4 years' },
      { id: '2', name: 'Master of Computer Science', code: 'MCS', departmentId: '1', level: 'Graduate', duration: '2 years' },
      { id: '3', name: 'PhD in Computer Science', code: 'PhD-CS', departmentId: '1', level: 'Postgraduate', duration: '3-5 years' },
      
      // Software Engineering Programs
      { id: '4', name: 'Bachelor of Software Engineering', code: 'BSE', departmentId: '2', level: 'Undergraduate', duration: '4 years' },
      { id: '5', name: 'Master of Software Engineering', code: 'MSE', departmentId: '2', level: 'Graduate', duration: '2 years' },
      
      // Information Technology Programs
      { id: '6', name: 'Bachelor of Information Technology', code: 'BIT', departmentId: '3', level: 'Undergraduate', duration: '4 years' },
      { id: '7', name: 'Associate in Information Technology', code: 'AIT', departmentId: '3', level: 'Associate', duration: '2 years' },
      
      // Information Systems Programs
      { id: '8', name: 'Bachelor of Information Systems', code: 'BIS', departmentId: '4', level: 'Undergraduate', duration: '4 years' },
      { id: '9', name: 'Master of Information Systems', code: 'MIS', departmentId: '4', level: 'Graduate', duration: '2 years' },
      
      // Business Administration Programs
      { id: '10', name: 'Bachelor of Business Administration', code: 'BBA', departmentId: '6', level: 'Undergraduate', duration: '4 years' },
      { id: '11', name: 'Master of Business Administration', code: 'MBA', departmentId: '6', level: 'Graduate', duration: '2 years' },
      { id: '12', name: 'Executive MBA', code: 'EMBA', departmentId: '6', level: 'Graduate', duration: '18 months' },
      
      // Accounting & Finance Programs  
      { id: '13', name: 'Bachelor of Accounting', code: 'BAcc', departmentId: '7', level: 'Undergraduate', duration: '4 years' },
      { id: '14', name: 'Bachelor of Finance', code: 'BFin', departmentId: '7', level: 'Undergraduate', duration: '4 years' },
      { id: '15', name: 'Master of Accounting', code: 'MAcc', departmentId: '7', level: 'Graduate', duration: '2 years' },
      
      // Medicine Programs
      { id: '16', name: 'Doctor of Medicine', code: 'MD', departmentId: '15', level: 'Professional', duration: '6 years' },
      { id: '17', name: 'Bachelor of Medicine & Surgery', code: 'MBBS', departmentId: '15', level: 'Undergraduate', duration: '6 years' },
      
      // Nursing Programs
      { id: '18', name: 'Bachelor of Science in Nursing', code: 'BSN', departmentId: '16', level: 'Undergraduate', duration: '4 years' },
      { id: '19', name: 'Associate in Nursing', code: 'AN', departmentId: '16', level: 'Associate', duration: '2 years' },
      
      // Law Programs
      { id: '20', name: 'Bachelor of Laws', code: 'LLB', departmentId: '18', level: 'Undergraduate', duration: '4 years' },
      { id: '21', name: 'Master of Laws', code: 'LLM', departmentId: '18', level: 'Graduate', duration: '2 years' },
      { id: '22', name: 'Juris Doctor', code: 'JD', departmentId: '18', level: 'Professional', duration: '3 years' },
    ];

    let programs = allPrograms;

    // Filter by department if provided
    if (departmentId) {
      programs = programs.filter(program => program.departmentId === departmentId);
    } 
    // Filter by school if provided (get all programs in school's departments)
    else if (schoolId) {
      const schoolDepartmentMap: Record<string, string[]> = {
        '1': ['1', '2', '3', '4', '5'], // Engineering & Technology
        '2': ['6', '7', '8', '9'],     // Business Administration  
        '3': ['10', '11', '12', '13', '14'], // Arts & Sciences
        '4': ['15', '16', '17'],       // Medicine & Health Sciences
        '5': ['18', '19']              // Law
      };
      
      const departmentIds = schoolDepartmentMap[schoolId] || [];
      programs = programs.filter(program => departmentIds.includes(program.departmentId));
    }

    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}
