import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProgramSelection({ formData, handleInputChange }: { formData: any; handleInputChange: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Selection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Choice Program *</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {formData.firstChoiceProgram ?
                  ["Computer Science", "Business Administration", "Engineering", "Medicine"][
                    ["computer-science", "business-admin", "engineering", "medicine"].indexOf(formData.firstChoiceProgram)
                  ] : "Select program"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              {[{ value: "computer-science", label: "Computer Science" }, { value: "business-admin", label: "Business Administration" }, { value: "engineering", label: "Engineering" }, { value: "medicine", label: "Medicine" }].map((prog) => (
                <DropdownMenuItem
                  key={prog.value}
                  onClick={() => handleInputChange('firstChoiceProgram', prog.value)}
                  className={`cursor-pointer px-3 py-2 ${formData.firstChoiceProgram === prog.value ? 'bg-blue-100 text-blue-700' : ''}`}
                >
                  {prog.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Second Choice Program</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {formData.secondChoiceProgram ?
                  ["Computer Science", "Business Administration", "Engineering", "Medicine"][
                    ["computer-science", "business-admin", "engineering", "medicine"].indexOf(formData.secondChoiceProgram)
                  ] : "Select program"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              {[{ value: "computer-science", label: "Computer Science" }, { value: "business-admin", label: "Business Administration" }, { value: "engineering", label: "Engineering" }, { value: "medicine", label: "Medicine" }].map((prog) => (
                <DropdownMenuItem
                  key={prog.value}
                  onClick={() => handleInputChange('secondChoiceProgram', prog.value)}
                  className={`cursor-pointer px-3 py-2 ${formData.secondChoiceProgram === prog.value ? 'bg-blue-100 text-blue-700' : ''}`}
                >
                  {prog.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Statement of Purpose *</label>
          <textarea
            value={formData.statementOfPurpose}
            onChange={(e) => handleInputChange('statementOfPurpose', e.target.value)}
            placeholder="Explain why you want to study this program and your career goals"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
