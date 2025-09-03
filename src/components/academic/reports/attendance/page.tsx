import React from "react";
import Link from "next/link"; // or your preferred Link component
import OverviewPage from "./overview";
import StudentsPage from "./students";
import LecturersPage from "./lecturers";

// Simple tab state management since you don't want React Router
export default function RegistrarAttendancePage() {
  const [activeTab, setActiveTab] = React.useState("overview");

  // Tab rendering helper
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage />;
      case "students":
        return <StudentsPage />;
      case "lecturers":
        return <LecturersPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="min-h-screen ">
      <div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 px-6 pt-6">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-blue-50 text-[#026892] border-b-2 border-[#026892]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("students")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "students"
                    ? "bg-blue-50 text-[#026892] border-b-2 border-[#026892]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab("lecturers")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "lecturers"
                    ? "bg-blue-50 text-[#026892] border-b-2 border-[#026892]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                Lecturers
              </button>
            </div>
          </div>
          {/* Page Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}