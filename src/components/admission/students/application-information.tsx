import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ApplicationInformation({ formData, handleInputChange }: { formData: any; handleInputChange: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Application ID</label>
          <input
            type="text"
            value={formData.applicationId}
            readOnly
            className="w-full bg-gray-white px-3 py-2 border border-gray-300 rounded-md text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
          <input
            type="date"
            value={formData.applicationDate}
            readOnly
            className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {formData.academicYear ? formData.academicYear : "Select Academic Year"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              {[{ value: "fall2025", label: "Fall 2025" }, { value: "spring2026", label: "Spring 2026" }].map((year) => (
                <DropdownMenuItem
                  key={year.value}
                  onClick={() => handleInputChange('academicYear', year.value)}
                  className={`cursor-pointer px-3 py-2 ${formData.academicYear === year.value ? 'bg-blue-100 text-blue-700' : ''}`}
                >
                  {year.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {formData.semester ? formData.semester.charAt(0).toUpperCase() + formData.semester.slice(1) : "Select Semester"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              {[{ value: "fall", label: "Fall" }, { value: "spring", label: "Spring" }].map((sem) => (
                <DropdownMenuItem
                  key={sem.value}
                  onClick={() => handleInputChange('semester', sem.value)}
                  className={`cursor-pointer px-3 py-2 ${formData.semester === sem.value ? 'bg-blue-100 text-blue-700' : ''}`}
                >
                  {sem.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
