import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  Edit,
  FileText,
  Building
} from "lucide-react"

// Examination Schedule Component
export function ExaminationSchedule() {
  const examSchedule = [
    {
      day: "Friday",
      date: "Jun-25",
      time: "14:00-16:00",
      room: "SARYRIVG Area 5-D",
      dept: "SABE",
      moduleCode: "CITE111",
      moduleTitle: "Citizenship and Transformative Leadership",
      level: "L1",
      students: 44,
      examiner: "Mr. Bernard KIN"
    },
    {
      day: "Tuesday",
      date: "Jun-25",
      time: "14:00-16:00",
      room: "SARYRIVG Area 5-D",
      dept: "SABE",
      moduleCode: "GH2494",
      moduleTitle: "Construction Technology I",
      level: "L1",
      students: 44,
      examiner: "Mr. Simon NYITE"
    },
    {
      day: "Wednesday",
      date: "Jun-26",
      time: "09:00-11:00",
      room: "SMS Building 217",
      dept: "SABE",
      moduleCode: "GH2001",
      moduleTitle: "Management of Construction Works",
      level: "L2",
      students: 38,
      examiner: "Mr. Franklin KIN"
    },
    {
      day: "Thursday",
      date: "Jun-27",
      time: "14:00-16:00",
      room: "EINSTEIN J803",
      dept: "SABE",
      moduleCode: "GH2002",
      moduleTitle: "Structural Design I",
      level: "L2",
      students: 38,
      examiner: "Mr. Simon NYITE"
    },
    {
      day: "Wednesday",
      date: "Jul-11",
      time: "09:00-11:00",
      room: "EINSTEIN J804",
      dept: "SABE",
      moduleCode: "GH2003",
      moduleTitle: "Building Economics I",
      level: "L2",
      students: 38,
      examiner: "Mr. Jean Damasc"
    },
    {
      day: "Friday",
      date: "Jul-26",
      time: "09:00-11:00",
      room: "SARYRIVG Area 4-C",
      dept: "SABE",
      moduleCode: "GH2005",
      moduleTitle: "Construction Technology II",
      level: "L2",
      students: 38,
      examiner: "Mr. Janetta IRAK"
    },
    {
      day: "Monday",
      date: "Jul-26",
      time: "14:00-16:00",
      room: "SARYRIVG Area 5-D",
      dept: "SABE",
      moduleCode: "EDH111",
      moduleTitle: "English for General Purposes",
      level: "L1",
      students: 34,
      examiner: "Bashota RW Div"
    },
    {
      day: "Thursday",
      date: "Jun-26",
      time: "09:00-11:00",
      room: "SARYRIVG Area 5-D",
      dept: "SABE",
      moduleCode: "ART1402",
      moduleTitle: "Geology, Ecology and Biodiversity",
      level: "L1",
      students: 34,
      examiner: "Kayezu De Edwin"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Examination Schedule - June 2025</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-white">
                <th className="text-left p-3 font-medium">Day</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Time</th>
                <th className="text-left p-3 font-medium">Room</th>
                <th className="text-left p-3 font-medium">Dept</th>
                <th className="text-left p-3 font-medium">Module Code</th>
                <th className="text-left p-3 font-medium">Module Title</th>
                <th className="text-left p-3 font-medium">Level</th>
                <th className="text-left p-3 font-medium">Students</th>
                <th className="text-left p-3 font-medium">Examiner</th>
              </tr>
            </thead>
            <tbody>
              {examSchedule.map((exam, index) => (
                <tr key={index} className="border-b hover:bg-white">
                  <td className="p-3 font-medium">{exam.day}</td>
                  <td className="p-3">{exam.date}</td>
                  <td className="p-3">{exam.time}</td>
                  <td className="p-3">{exam.room}</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="text-xs">
                      {exam.dept}
                    </Badge>
                  </td>
                  <td className="p-3 font-medium text-blue-600">{exam.moduleCode}</td>
                  <td className="p-3">{exam.moduleTitle}</td>
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs">
                      {exam.level}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">{exam.students}</td>
                  <td className="p-3">{exam.examiner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Room Utilization for Examinations
export function ExamRoomUtilization() {
  const rooms = [
    { name: "SARYRIVG Area 5-D", utilization: 85, exams: 15, color: "bg-orange-500" },
    { name: "SARYRIVG Area 4-C", utilization: 78, exams: 12, color: "bg-yellow-500" },
    { name: "EINSTEIN J803", utilization: 92, exams: 18, color: "bg-red-500" },
    { name: "EINSTEIN J804", utilization: 67, exams: 10, color: "bg-green-500" },
    { name: "SMS Building 217", utilization: 73, exams: 14, color: "bg-blue-500" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Room Utilization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rooms.map((room, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-sm">{room.name}</div>
                <div className="text-xs text-gray-500">{room.exams} exams scheduled</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{room.utilization}%</span>
                <Button size="sm" variant="outline" className="h-7 px-2">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress 
                value={room.utilization} 
                className="flex-1 h-2"
              />
              <Badge 
                variant={room.utilization > 80 ? "destructive" : room.utilization > 60 ? "default" : "secondary"}
                className="text-xs"
              >
                {room.utilization > 80 ? "High" : room.utilization > 60 ? "Medium" : "Low"}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Examiner Workload Component
export function ExaminerWorkload() {
  const examiners = [
    { name: "Mr. Simon NYITEGEIKA", exams: 8, hours: 24, load: "High", status: "4 exams" },
    { name: "Mr. Jean Damasc OSIII", exams: 6, hours: 18, load: "Normal", status: "3 exams" },
    { name: "Mr. Janetta UWAYIMBIRUA", exams: 5, hours: 15, load: "Normal", status: "3 exams" },
    { name: "Mr. Bernard NSANZIMANA", exams: 7, hours: 21, load: "High", status: "4 exams" },
    { name: "Kayezu De Edwin", exams: 4, hours: 12, load: "Normal", status: "3 exams" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Examiner Workload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {examiners.map((examiner, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-sm">{examiner.name}</div>
              <div className="text-xs text-gray-500">{examiner.hours} total exam hours</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={examiner.load === "High" ? "destructive" : "default"}
                className="text-xs"
              >
                {examiner.status}
              </Badge>
              <Button size="sm" variant="outline" className="h-7 px-2">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
