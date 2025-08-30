"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Calendar,
  ChevronDown
} from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  title?: string
  role?: "registrar" | "registrar-secretary" | "registrar-admission" | "registrar-academics"
}

const roleConfigs = {
  registrar: {
    title: "Registrar",
    color: "#026892",
    path: "/registrar",
  },
  "registrar-secretary": {
    title: " Secretary",
    color: "#026892",
    path: "/registrar-secretary",
    },
  "registrar-admission": {
    title: "Admission",
    color: "#026892", 
    path: "/registrar-admission",
  },
  "registrar-academics": {
    title: "Academic",
    color: "#026892",
    path: "/registrar-academics", 
  }
}

export function RegistrarHeader({ title, role = "registrar" }: HeaderProps) {
  const currentRole = roleConfigs[role]
  
  const handleRoleSwitch = (newRole: keyof typeof roleConfigs) => {
    window.location.href = roleConfigs[newRole].path
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-[#026892]">SAMPS UR</span>
          </div>
          {title && (
            <>
              <div className="w-px h-6 bg-gray-300"></div>
              <span className="text-lg font-medium text-gray-700">{title}</span>
            </>
          )}
        </div>

        {/* Right Section - Search, Controls, Profile */}
        <div className="flex items-center gap-4">
 

          {/* Semester Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                2024 Semester 1
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>2024 Semester 1</DropdownMenuItem>
              <DropdownMenuItem>2024 Semester 2</DropdownMenuItem>
              <DropdownMenuItem>2023 Semester 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Role Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                
                {currentRole.title}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Switch Role</p>
                <p className="text-xs text-muted-foreground">Select a different registrar portal</p>
              </div>
              <DropdownMenuSeparator />
              {Object.entries(roleConfigs).map(([roleKey, roleConfig]) => (
                <DropdownMenuItem
                  key={roleKey}
                  onClick={() => handleRoleSwitch(roleKey as keyof typeof roleConfigs)}
                  className={`flex items-center gap-3 px-2 py-2 ${role === roleKey ? 'bg-accent' : ''}`}
                >
                
                  <div className="flex-1">
                    <p className="text-sm font-medium">{roleConfig.title}</p>
                    {role === roleKey && <p className="text-xs text-muted-foreground">Current role</p>}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
              5
            </span>
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Profile Picture" width={32} height={32} className="rounded-full" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                My Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Appearance
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}