export const studentsData = [
  {
    id: "STU001",
    name: "John Doe",
    avatar: "JD",
    school: "Computer Science",
    department: "Software Engineering",
    year: "Year 3",
    courses: [
      { code: "CS101", title: "Programming", attendance: 92, status: "excellent", trend: "up", sessions: 25, attended: 23 },
      { code: "CS102", title: "Data Structures", attendance: 85, status: "good", trend: "stable", sessions: 20, attended: 17 },
      { code: "MATH201", title: "Discrete Math", attendance: 78, status: "warning", trend: "down", sessions: 18, attended: 14 }
    ],
    overallAttendance: 85,
    trend: "stable",
    riskLevel: "low"
  },
  {
    id: "STU002", 
    name: "Jane Smith",
    avatar: "JS",
    school: "Computer Science",
    department: "Information Systems",
    year: "Year 2",
    courses: [
      { code: "IS101", title: "Database Systems", attendance: 95, status: "excellent", trend: "up", sessions: 22, attended: 21 },
      { code: "IS102", title: "Systems Analysis", attendance: 88, status: "good", trend: "up", sessions: 20, attended: 18 }
    ],
    overallAttendance: 91.5,
    trend: "up",
    riskLevel: "none"
  },
  {
    id: "STU003",
    name: "Mike Johnson", 
    avatar: "MJ",
    school: "Engineering",
    department: "Civil Engineering",
    year: "Year 4",
    courses: [
      { code: "CE101", title: "Structural Design", attendance: 72, status: "critical", trend: "down", sessions: 25, attended: 18 },
      { code: "CE102", title: "Fluid Mechanics", attendance: 80, status: "good", trend: "stable", sessions: 20, attended: 16 }
    ],
    overallAttendance: 76,
    trend: "down",
    riskLevel: "high"
  },
  {
    id: "STU004",
    name: "Sarah Wilson",
    avatar: "SW",
    school: "Business",
    department: "Marketing",
    year: "Year 1",
    courses: [
      { code: "MKT101", title: "Marketing Principles", attendance: 90, status: "excellent", trend: "up", sessions: 24, attended: 22 },
      { code: "MKT102", title: "Consumer Behavior", attendance: 88, status: "good", trend: "stable", sessions: 22, attended: 19 }
    ],
    overallAttendance: 89,
    trend: "up",
    riskLevel: "none"
  }
];

export const lecturersData = [
  {
    id: "LEC001",
    name: "Dr. Alice Brown",
    avatar: "AB",
    school: "Computer Science", 
    department: "Software Engineering",
    title: "Associate Professor",
    courses: [
      { code: "CS101", title: "Programming", sessions: 24, attended: 23, attendance: 95.8, students: 45 },
      { code: "CS201", title: "Advanced Programming", sessions: 20, attended: 20, attendance: 100, students: 32 }
    ],
    overallAttendance: 97.9,
    trend: "up",
    totalStudents: 77
  },
  {
    id: "LEC002",
    name: "Prof. Robert Green",
    avatar: "RG",
    school: "Engineering",
    department: "Civil Engineering",
    title: "Professor", 
    courses: [
      { code: "CE101", title: "Structural Design", sessions: 22, attended: 21, attendance: 95.4, students: 38 },
      { code: "CE301", title: "Advanced Structures", sessions: 18, attended: 17, attendance: 94.4, students: 28 }
    ],
    overallAttendance: 95,
    trend: "stable",
    totalStudents: 66
  },
  {
    id: "LEC003",
    name: "Dr. Emma Davis",
    avatar: "ED",
    school: "Business",
    department: "Marketing",
    title: "Senior Lecturer",
    courses: [
      { code: "MKT101", title: "Marketing Principles", sessions: 25, attended: 24, attendance: 96, students: 52 },
      { code: "MKT201", title: "Digital Marketing", sessions: 20, attended: 19, attendance: 95, students: 41 }
    ],
    overallAttendance: 95.5,
    trend: "stable",
    totalStudents: 93
  }
];