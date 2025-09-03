"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showRoleSelection, setShowRoleSelection] = useState(false)

  const registrarRoles = [
    {
      id: "registrar",
      title: "Registrar",
      description: "Oversee student records and manage admission processes",
      path: "/registrar",
    },
    {
      id: "registrar-secretary",
      title: "Registrar Secretary",
      description: "Manage student ID card issuance and track production",
      path: "/registrar-secretary",
    },
    {
      id: "registrar-admission",
      title: "Registrar Admission Officer",
      description: "Process applications and manage admission criteria",
      path: "/registrar-admission",
    },
    {
      id: "registrar-academics",
      title: "Registrar Academics Officer",
      description: "Manage timetabling and coordinate examinations",
      path: "/registrar-academics",
    },
  ]

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (registrationNumber && pin) {
      setShowRoleSelection(true)
    }
  }

  const handleRoleSelect = (rolePath: string) => {
    window.location.href = rolePath
  }

  if (showRoleSelection) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">
                <Image src="/logo.png" alt="Logo" width={64} height={64} />
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#026892] mb-2">SAMPS UR</h1>
            <p className="text-gray-600 mb-1">Student Academic Management Platform</p>
            <p className="text-gray-500 text-sm">University of Rwanda</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-center mb-6">Select Your Portal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registrarRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.path)}
                  className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <h3 className="font-medium text-gray-900 mb-1">{role.title}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">
              <Image src="/logo.png" alt="Logo" width={64} height={64} />
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#026892] mb-2">SAMPS UR</h1>
          <p className="text-gray-600 mb-1">Student Academic Management Platform</p>
          <p className="text-gray-500 text-sm">University of Rwanda</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-sm">Sign in to access your student portal</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Label htmlFor="registration" className="text-sm font-medium text-gray-700">
                Registration Number
              </Label>
              <Input
                id="registration"
                type="text"
                placeholder="Enter your 8-digit registration number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="mt-1"
                maxLength={8}
              />
            </div>

            <div>
              <Label htmlFor="pin" className="text-sm font-medium text-gray-700">
                PIN
              </Label>
              <div className="relative mt-1">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="Enter your 5-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="pr-10"
                  maxLength={5}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">5-digit PIN provided during registration.</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot PIN?
              </button>
            </div>

            <Button type="submit" className="w-full" style={{ backgroundColor: "#026892" }}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Need help?</p>
            <div className="space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-800">Contact Support</button>
              <button className="text-sm text-blue-600 hover:text-blue-800">Help Center</button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">© 2025 University of Rwanda. All rights reserved.</p>
          <p className="text-xs text-gray-500">Secure student portal powered by SAMPS UR</p>
        </div>
      </div>
    </div>
  )
}
