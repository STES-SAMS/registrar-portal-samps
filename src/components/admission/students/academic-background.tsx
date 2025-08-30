import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";

export default function AcademicBackground({ formData, handleInputChange }: { formData: any; handleInputChange: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Background</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Previous School/Institution *</label>
          <input
            type="text"
            value={formData.previousSchool}
            onChange={(e) => handleInputChange('previousSchool', e.target.value)}
            placeholder="Enter school name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year *</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  {formData.graduationYear ? formData.graduationYear : "Select year"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-full">
                {["2023", "2024", "2025"].map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => handleInputChange('graduationYear', year)}
                    className={
                      `cursor-pointer px-3 py-2 ${formData.graduationYear === year ? 'bg-blue-100 text-blue-700' : ''}`
                    }
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GPA/Grade *</label>
          <input
            type="text"
            value={formData.gpaGrade}
            onChange={(e) => handleInputChange('gpaGrade', e.target.value)}
            placeholder="Enter GPA or grade"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Test Score (SAT/ACT)</label>
          <input
            type="text"
            value={formData.testScore}
            onChange={(e) => handleInputChange('testScore', e.target.value)}
            placeholder="Enter test score"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Academic Achievements</label>
          <textarea
            value={formData.academicAchievements}
            onChange={(e) => handleInputChange('academicAchievements', e.target.value)}
            placeholder="List any academic achievements, awards, or honors"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
