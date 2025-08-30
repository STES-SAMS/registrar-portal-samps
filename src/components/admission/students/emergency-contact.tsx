import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EmergencyContact({ formData, handleInputChange }: { formData: any; handleInputChange: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
          <input
            type="text"
            value={formData.contactName}
            onChange={(e) => handleInputChange('contactName', e.target.value)}
            placeholder="Enter contact name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                {formData.relationship ?
                  ["Parent", "Guardian", "Sibling", "Other"][
                    ["parent", "guardian", "sibling", "other"].indexOf(formData.relationship)
                  ] : "Select relationship"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              {[{ value: "parent", label: "Parent" }, { value: "guardian", label: "Guardian" }, { value: "sibling", label: "Sibling" }, { value: "other", label: "Other" }].map((rel) => (
                <DropdownMenuItem
                  key={rel.value}
                  onClick={() => handleInputChange('relationship', rel.value)}
                  className={`cursor-pointer px-3 py-2 ${formData.relationship === rel.value ? 'bg-blue-100 text-blue-700' : ''}`}
                >
                  {rel.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            value={formData.phoneNumberEmergency}
            onChange={(e) => handleInputChange('phoneNumberEmergency', e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={formData.emailAddressEmergency}
            onChange={(e) => handleInputChange('emailAddressEmergency', e.target.value)}
            placeholder="Enter email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
