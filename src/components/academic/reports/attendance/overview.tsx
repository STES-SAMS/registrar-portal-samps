import React from "react";
import { studentsData, lecturersData } from "./attendance";
import { GraduationCap, Users, TrendingUp, AlertTriangle } from "lucide-react";

export default function OverviewPage() {
  const totalStudents = studentsData.length;
  const totalLecturers = lecturersData.length;
  const avgAttendance = studentsData.reduce((sum, s) => sum + s.overallAttendance, 0) / totalStudents || 0;
  const riskStudents = studentsData.filter(s => s.riskLevel === "high" || s.riskLevel === "medium").length;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quick Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
          <GraduationCap className="h-6 w-6 text-blue-600 mt-2" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Lecturers</p>
          <p className="text-2xl font-bold text-gray-900">{totalLecturers}</p>
          <Users className="h-6 w-6 text-emerald-600 mt-2" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Average Attendance</p>
          <p className="text-2xl font-bold text-green-600">{avgAttendance.toFixed(1)}%</p>
          <TrendingUp className="h-6 w-6 text-green-600 mt-2" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">At-Risk Students</p>
          <p className="text-2xl font-bold text-red-600">{riskStudents}</p>
          <AlertTriangle className="h-6 w-6 text-red-600 mt-2" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome</h3>
      <p className="text-gray-600 mb-6">Select a tab to view student or lecturer attendance details.</p>
    </div>
  );
}