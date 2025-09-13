import { NextResponse } from 'next/server';

// Mock data based on the API response structure you provided
const mockModules = [
  {
    "id": "6f83bd67-cddc-449a-b427-6232ca190df1",
    "name": "Web development",
    "code": "COE001",
    "description": "Web development",
    "credits": 10,
    "contactHours": 20,
    "lectureHours": 30,
    "tutorialHours": 10,
    "practicalHours": 10,
    "selfStudyHours": 10,
    "level": 100,
    "semesterOffered": 1,
    "isCore": true,
    "isElective": false,
    "isActive": true,
    "prerequisites": "",
    "learningOutcomes": "",
    "assessmentMethods": "",
    "recommendedTextbooks": "",
    "minimumPassMark": 50.0,
    "maximumRetakes": 2,
    "departmentId": "1475603f-6c32-4ad5-900f-827075d3434c",
    "departmentName": "Software",
    "departmentCode": "SFT",
    "schoolName": "ICT",
    "collegeName": "CST",
    "institutionName": "University of Rwanda",
    "fullName": "COE001 - Web development",
    "levelDescription": "Level 1 (Foundation)",
    "totalContactHours": 50,
    "totalStudyHours": 60,
    "workloadPerCredit": 6.0,
    "requiresPracticalWork": true,
    "hasPrerequisites": false,
    "createdAt": "2025-08-31 09:52:30",
    "updatedAt": "2025-08-31 09:52:30",
    "createdBy": null,
    "updatedBy": null,
    "totalProgramModules": 0,
    "totalAssignments": 1,
    "totalMaterials": 0
  },
  {
    "id": "b52dee69-fe25-41b0-b515-da93a0b04e4b",
    "name": "Computer Programming",
    "code": "COE002",
    "description": "Computer Programming",
    "credits": 10,
    "contactHours": 20,
    "lectureHours": 30,
    "tutorialHours": 10,
    "practicalHours": 10,
    "selfStudyHours": 10,
    "level": 100,
    "semesterOffered": 1,
    "isCore": true,
    "isElective": false,
    "isActive": true,
    "prerequisites": "",
    "learningOutcomes": "",
    "assessmentMethods": "",
    "recommendedTextbooks": "",
    "minimumPassMark": 50.0,
    "maximumRetakes": 2,
    "departmentId": "1475603f-6c32-4ad5-900f-827075d3434c",
    "departmentName": "Software",
    "departmentCode": "SFT",
    "schoolName": "ICT",
    "collegeName": "CST",
    "institutionName": "University of Rwanda",
    "fullName": "COE002 - Computer Programming",
    "levelDescription": "Level 1 (Foundation)",
    "totalContactHours": 50,
    "totalStudyHours": 60,
    "workloadPerCredit": 6.0,
    "requiresPracticalWork": true,
    "hasPrerequisites": false,
    "createdAt": "2025-09-02 08:32:16",
    "updatedAt": "2025-09-02 08:32:16",
    "createdBy": null,
    "updatedBy": null,
    "totalProgramModules": 0,
    "totalAssignments": 1,
    "totalMaterials": 0
  }
];

// Generate a new module ID
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// GET /api/academics/modules
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '0');
    const size = parseInt(searchParams.get('size') || '20');
    
    // Calculate pagination
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedModules = mockModules.slice(startIndex, endIndex);
    
    return NextResponse.json({
      success: true,
      message: "Modules retrieved successfully",
      data: {
        content: paginatedModules,
        page: page,
        size: size,
        totalElements: mockModules.length,
        totalPages: Math.ceil(mockModules.length / size),
        first: page === 0,
        last: endIndex >= mockModules.length,
        hasNext: endIndex < mockModules.length,
        hasPrevious: page > 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch modules',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST /api/academics/modules
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create a new module based on the request body
    const newModule = {
      id: generateId(),
      name: body.name,
      code: body.code,
      description: body.description,
      credits: parseInt(body.credits),
      contactHours: parseInt(body.contactHours),
      lectureHours: parseInt(body.lectureHours),
      tutorialHours: parseInt(body.tutorialHours),
      practicalHours: parseInt(body.practicalHours),
      selfStudyHours: parseInt(body.selfStudyHours),
      level: parseInt(body.level),
      semesterOffered: parseInt(body.semesterOffered),
      isCore: body.isCore === 'true' || body.isCore === true,
      isElective: body.isElective === 'true' || body.isElective === true,
      isActive: body.isActive === 'true' || body.isActive === true,
      prerequisites: body.prerequisites || "",
      learningOutcomes: body.learningOutcomes || "",
      assessmentMethods: body.assessmentMethods || "",
      recommendedTextbooks: body.recommendedTextbooks || "",
      minimumPassMark: parseFloat(body.minimumPassMark),
      maximumRetakes: parseInt(body.maximumRetakes),
      departmentId: body.departmentId,
      // These would normally come from the department lookup
      departmentName: "Software Engineering",
      departmentCode: "SE",
      schoolName: "Engineering & Technology",
      collegeName: "College of Science and Technology",
      institutionName: "University of Rwanda",
      fullName: `${body.code} - ${body.name}`,
      levelDescription: `Level ${Math.floor(parseInt(body.level) / 100)} (${parseInt(body.level) >= 400 ? 'Advanced' : parseInt(body.level) >= 300 ? 'Intermediate' : parseInt(body.level) >= 200 ? 'Foundation+' : 'Foundation'})`,
      totalContactHours: parseInt(body.contactHours) + parseInt(body.lectureHours) + parseInt(body.tutorialHours) + parseInt(body.practicalHours),
      totalStudyHours: parseInt(body.contactHours) + parseInt(body.lectureHours) + parseInt(body.tutorialHours) + parseInt(body.practicalHours) + parseInt(body.selfStudyHours),
      workloadPerCredit: (parseInt(body.contactHours) + parseInt(body.lectureHours) + parseInt(body.tutorialHours) + parseInt(body.practicalHours) + parseInt(body.selfStudyHours)) / parseInt(body.credits),
      requiresPracticalWork: parseInt(body.practicalHours) > 0,
      hasPrerequisites: body.prerequisites && body.prerequisites.trim().length > 0,
      createdAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      updatedAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      createdBy: null,
      updatedBy: null,
      totalProgramModules: 0,
      totalAssignments: 0,
      totalMaterials: 0
    };
    
    // Add to mock data (in a real app, this would save to database)
    mockModules.push(newModule);
    
    return NextResponse.json({
      success: true,
      message: "Module created successfully",
      data: newModule,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create module',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
