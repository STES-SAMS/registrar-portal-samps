import { ResultRecord } from './types'

export const mockResults: ResultRecord[] = [
  {
    id: "RES001",
    studentId: "STU2024001",
    studentName: "John Doe",
    course: "Computer Science",
    module: "Data Structures",
    semester: "Fall 2024",
    marks: 85,
    grade: "A",
    status: "pending",
    submittedBy: "Dr. Smith",
    submittedDate: "2024-12-15"
  },
  {
    id: "RES002",
    studentId: "STU2024002", 
    studentName: "Jane Wilson",
    course: "Information Systems",
    module: "Database Design",
    semester: "Fall 2024",
    marks: 92,
    grade: "A+",
    status: "approved",
    submittedBy: "Prof. Johnson",
    submittedDate: "2024-12-14",
    moderatedBy: "Dr. Brown",
    moderatedDate: "2024-12-16"
  },
  {
    id: "RES003",
    studentId: "STU2024003",
    studentName: "Mike Chen",
    course: "Software Engineering",
    module: "Web Development",
    semester: "Fall 2024", 
    marks: 78,
    grade: "B+",
    status: "under_review",
    submittedBy: "Dr. Davis",
    submittedDate: "2024-12-13",
    comments: "Grade calculation needs verification"
  },
  {
    id: "RES004",
    studentId: "STU2024004",
    studentName: "Sarah Ahmed",
    course: "Computer Science",
    module: "Algorithms",
    semester: "Fall 2024",
    marks: 65,
    grade: "C+",
    status: "rejected",
    submittedBy: "Dr. Wilson",
    submittedDate: "2024-12-12",
    moderatedBy: "Prof. Taylor",
    moderatedDate: "2024-12-17",
    comments: "Insufficient documentation for grade justification"
  }
]
