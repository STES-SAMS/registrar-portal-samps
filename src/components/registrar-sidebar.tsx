"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Users,
  FileText,
  GraduationCap,
  CreditCard,
  BarChart3,
  Settings,
  Calendar,
  Database,
  UserCheck,
  ClipboardList,
  Award,
  BookOpen,
  Mail,
  Printer,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface SidebarProps {
  role: "registrar" | "registrar-secretary" | "registrar-admission" | "registrar-academics"
  className?: string
}

const roleConfigs = {
  registrar: {
    title: "Registrar",
    color: "#026892",
    path: "/registrar",
    menuItems: [
      { icon: Home, label: "Dashboard", href: "/registrar" },
      { icon: Users, label: "Student Records", href: "/registrar/student-records" },
      { icon: GraduationCap, label: "Admissions", href: "/registrar/admissions" },
      { icon: Calendar, label: "Academic Administration", href: "/registrar/academic-admin" },
      { icon: Award, label: "Graduation", href: "/registrar/graduation" },
      { icon: FileText, label: "Documents", href: "/registrar/documents" },
      { icon: BarChart3, label: "Reports", href: "/registrar/reports" },
    ],
  },
  "registrar-secretary": {
    title: "Registrar Secretary",
    color: "#026892",
    path: "/registrar-secretary",
    menuItems: [
      { icon: Home, label: "Dashboard", href: "/registrar-secretary" },
      { icon: Printer, label: "Card Production", href: "/registrar-secretary/card-production" },
      { icon: AlertTriangle, label: "Replacements", href: "/registrar-secretary/replacement-request" },
      { icon: CreditCard, label: "Issue Management", href: "/registrar-secretary/issue-management" },
      { icon: UserCheck, label: "Verification", href: "/registrar-secretary/verification" },
      { icon: FileText, label: "Reports", href: "/registrar-secretary/reports" },
    ],
  },
  "registrar-admission": {
    title: "Registrar Admission Officer",
    color: "#026892",
    path: "/registrar-admission",
    menuItems: [
      { icon: Home, label: "Dashboard", href: "/registrar-admission" },
      { icon: FileText, label: "Application Processing", href: "/registrar-admission/application-processing" },
      { icon: UserCheck, label: "Admission Decision", href: "/registrar-admission/admission-decision" },
      { icon: Users, label: "Enrollment Management", href: "/registrar-admission/enrollment" },
      { icon: Mail, label: "Communication Center", href: "/registrar-admission/communication" },
      { icon: BarChart3, label: "Capacity Planning", href: "/registrar-admission/capacity-planning" },
    ],
  },
  "registrar-academics": {
    title: "Registrar Academics Officer",
    color: "#026892",
    path: "/registrar-academics",
    menuItems: [
      { icon: Home, label: "Dashboard", href: "/registrar-academics" },
      { icon: Calendar, label: "Timetable ", href: "/registrar-academics/timetable" },
      { icon: BookOpen, label: "Examination ", href: "/registrar-academics/examinations" },
      { icon: Award, label: "Graduation ", href: "/registrar-academics/graduation" },
      { icon: Award, label: "Marks ", href: "/registrar-academics/marks-submitted" },
      { icon: FileText, label: "Transcripts", href: "/registrar-academics/transcripts" },
      { icon: ClipboardList, label: "Calendar", href: "/registrar-academics/calendar" },
      { icon: BarChart3, label: "Reports", href: "/registrar-academics/reports" },
    ],
  },
}

export function RegistrarSidebar({ role, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const config = roleConfigs[role]
  const isRegistrarSecretary = role === "registrar-secretary"

  const handleRoleSwitch = (newRole: keyof typeof roleConfigs) => {
    window.location.href = roleConfigs[newRole].path
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  const isActiveRoute = (href: string) => {
    return pathname === href
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r transition-all duration-300 ",
        isCollapsed ? "w-16" : "w-64",
        isRegistrarSecretary ? "bg-white border-gray-200" : "bg-sidebar border-sidebar-border ",
        className,
      )}
      style={
        isRegistrarSecretary
          ? {
            backgroundColor: "white",
            borderColor: "#e5e7eb",
          }
          : undefined
      }
    >
      {/* Header */}
      <div className="relative flex items-center justify-between h-16 px-4 border-b border-gray-100">
        <Link href={config.path} className="absolute left-1/2 -translate-x-1/2 cursor-pointer">
          <Image
            width={48}
            height={48}
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {config.menuItems.map((item, index) => {
            const IconComponent = item.icon
            const isActive = isActiveRoute(item.href)
            
            return (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-10 cursor-pointer",
                  isCollapsed && "justify-center px-2",
                  isRegistrarSecretary ? "hover:bg-gray-100 text-black" : "hover:bg-sidebar-accent",
                  isActive && "bg-[#e6f3f7] text-[#026892] hover:bg-[#e6f3f7]"
                )}
                style={
                  isRegistrarSecretary && !isActive
                    ? {
                      color: "black",
                    }
                    : isActive
                    ? {
                      backgroundColor: "#e6f3f7",
                      color: "#026892",
                    }
                    : undefined
                }
                onClick={() => (window.location.href = item.href)}
              >
                <IconComponent className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}