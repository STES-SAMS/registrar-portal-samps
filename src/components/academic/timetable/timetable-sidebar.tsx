import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Filter,
  Search,
  Download,
  Plus,
  Settings,
  Bell,
  BookOpen,
  Building,
  Eye
} from "lucide-react"

export function TimetableSidebar() {
  const quickStats = [
    { label: "Today's Classes", value: "24", icon: BookOpen, color: "text-[#3B82F6]" },
    { label: "Active Rooms", value: "12", icon: Building, color: "text-[#10B981]" },
    { label: "Free Periods", value: "8", icon: Clock, color: "text-[#F59E0B]" },
    { label: "Conflicts", value: "3", icon: Bell, color: "text-[#EF4444]" }
  ]

  const upcomingClasses = [
    {
      time: "09:00 AM",
      course: "Computer Science",
      room: "LH-101",
      instructor: "Dr. Smith",
      status: "ongoing"
    },
    {
      time: "10:00 AM", 
      course: "Data Structures",
      room: "LH-102",
      instructor: "Prof. Johnson",
      status: "upcoming"
    },
    {
      time: "11:00 AM",
      course: "Database Systems", 
      room: "LH-103",
      instructor: "Dr. Brown",
      status: "upcoming"
    },
    {
      time: "02:00 PM",
      course: "Software Engineering",
      room: "LH-104", 
      instructor: "Dr. Davis",
      status: "upcoming"
    }
  ]

  const roomStatus = [
    { room: "LH-101", status: "occupied", nextFree: "10:00 AM" },
    { room: "LH-102", status: "free", nextClass: "10:00 AM" },
    { room: "LH-103", status: "maintenance", nextAvailable: "2:00 PM" },
    { room: "LAB-201", status: "occupied", nextFree: "11:00 AM" }
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start bg-black hover:bg-gray-800 text-white" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Find Room
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter View
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Today's Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <span className="font-bold text-lg">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Classes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingClasses.map((class_, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{class_.time}</span>
                <Badge 
                  variant={class_.status === "ongoing" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {class_.status}
                </Badge>
              </div>
              <div className="text-sm font-semibold">{class_.course}</div>
              <div className="text-xs text-gray-600">
                {class_.room} • {class_.instructor}
              </div>
              {index < upcomingClasses.length - 1 && <hr className="mt-3" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Room Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Room Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {roomStatus.map((room, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{room.room}</div>
                <div className="text-xs text-gray-600">
                  {room.status === "occupied" && `Next free: ${room.nextFree}`}
                  {room.status === "free" && `Next class: ${room.nextClass}`}
                  {room.status === "maintenance" && `Available: ${room.nextAvailable}`}
                </div>
              </div>
              <Badge 
                variant={
                  room.status === "occupied" ? "destructive" : 
                  room.status === "free" ? "secondary" : 
                  "default"
                }
                className="text-xs"
              >
                {room.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* View Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">View Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Room Layout
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Instructor View
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
