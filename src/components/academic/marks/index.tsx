"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MarksRow, MarksSubmittedTable } from "./marks";
import { useRouter } from "next/navigation";

export const MarksHeaderTabs: React.FC<{
  mainActiveTab: string;
  setMainActiveTab: (t: string) => void;
}> = ({ mainActiveTab, setMainActiveTab }) => (
  <div className="flex items-center justify-between mb-4 mt-4">
    <div className="flex gap-2 w-full">
      {[
        { key: "mark-submissions", label: "Mark Submissions" },
        { key: "analytics", label: "Analytics" },
        { key: "deadlines", label: "Deadlines" },
      ].map((tab) => (
        <button
          key={tab.key}
          className={`px-6 py-2 rounded-md font-medium text-sm border ${
            mainActiveTab === tab.key
              ? "bg-[#026892] text-white border-gray-200 hover:bg-[#026892]/90"
              : "bg-white text-black border-gray-200 hover:bg-gray-100"
          }`}
          onClick={() => setMainActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <button className="bg-[#026892] text-white px-2 py-2 rounded-md font-medium text-sm hover:bg-[#026892]/90 w-[180px]">
      Export All Marks
    </button>
  </div>
);

export const MarksSubTabs: React.FC<{
  activeTab: string;
  setActiveTab: (t: string) => void;
}> = ({ activeTab, setActiveTab }) => (
  <div className="flex gap-2 mb-6">
    <button
      className={`px-6 py-2 rounded-md font-medium text-sm border ${
        activeTab === "module"
          ? "bg-[#026892] text-white border-gray-200 hover:bg-[#026892]/90"
          : "bg-white text-black border-gray-200 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab("module")}
    >
      Module
    </button>
    <button
      className={`px-6 py-2 rounded-md font-medium text-sm border ${
        activeTab === "class"
          ? "bg-[#026892] text-white font-medium hover:bg-[#026892]/90 border-gray-200"
          : "bg-white text-black border-gray-200 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab("class")}
    >
      Class
    </button>
  </div>
);

export const MarksModuleSection: React.FC<{
  data: MarksRow[];
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  totalPages: number;
  moduleSearch: string;
  setModuleSearch: (v: string) => void;
}> = ({ data, page, pageSize, onPageChange, totalPages, moduleSearch, setModuleSearch }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-2 mb-4 items-center">
        <select className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Overdue</option>
          <option>Rejected</option>
        </select>
        <div className="relative w-full max-w-xs">
          <input
            type="search"
            value={moduleSearch}
            onChange={(e) => setModuleSearch(e.target.value)}
            placeholder="Search lecturer, module..."
            className="border rounded-md px-10 py-2 text-sm w-full bg-white focus:border-none focus:ring-blue"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      <MarksSubmittedTable
        data={data}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        totalPages={totalPages}
        renderActions={(row) => (
          <button
            className="flex items-center gap-1 text-[#0891b2] bg-[#e0f2fe] hover:bg-[#bae6fd] px-3 py-1 rounded-md text-sm font-medium"
            onClick={() => router.push(`/registrar-academics/marks-submitted/${encodeURIComponent(row.module)}`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View
          </button>
        )}
      />
    </>
  );
};

export const MarksClassSection: React.FC<{
  classData: {
    className: string;
    lecturer: string;
    students: number;
    submissionDate: string;
    deadline: string;
    status: string;
  }[];
  classPage: number;
  setClassPage: (p: number) => void;
  classTotalPages: number;
  classSearch: string;
  setClassSearch: (v: string) => void;
}> = ({ classData, classPage, setClassPage, classTotalPages, classSearch, setClassSearch }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-2 mb-4 items-center">
        <select className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
          <option>All Years</option>
          <option>Year 1</option>
          <option>Year 2</option>
          <option>Year 3</option>
        </select>
        <select className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Overdue</option>
          <option>Rejected</option>
        </select>
        <div className="relative w-full max-w-xs">
          <input
            type="search"
            value={classSearch}
            onChange={(e) => setClassSearch(e.target.value)}
            placeholder="Search class, lecturer..."
            className="border rounded-md px-10 py-2 text-sm w-full bg-white focus:border-[#0891b2] focus:ring-[#0891b2]"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-black">Class</TableHead>
              <TableHead className="text-black">Lecturer</TableHead>
              <TableHead className="text-black">Students</TableHead>
              <TableHead className="text-black">Submission Date</TableHead>
              <TableHead className="text-black">Deadline</TableHead>
              <TableHead className="text-black">Status</TableHead>
              <TableHead className="text-right text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium text-gray-800">{row.className}</TableCell>
                <TableCell className="text-gray-700">{row.lecturer}</TableCell>
                <TableCell className="text-gray-700">{row.students}</TableCell>
                <TableCell className="text-gray-700">{row.submissionDate}</TableCell>
                <TableCell className="text-gray-700">{row.deadline}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <button
                    className="flex items-center gap-1 text-[#0891b2] bg-[#e0f2fe] hover:bg-[#bae6fd] px-3 py-1 rounded-md text-sm font-medium"
                    onClick={() => router.push(`/registrar-academics/marks-submitted/class/${encodeURIComponent(row.className)}/2025`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 disabled:opacity-50" onClick={() => setClassPage(Math.max(1, classPage - 1))} disabled={classPage === 1}>
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {classPage} of {classTotalPages}</span>
        <button className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 disabled:opacity-50" onClick={() => setClassPage(Math.min(classTotalPages, classPage + 1))} disabled={classPage === classTotalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export const MarksAnalyticsSection: React.FC<{
  submissionStatistics: { totalSubmissions: number; approved: number; pending: number; overdue: number; rejected: number };
  gradeDistribution: { grade: string; percentage: number; color: string }[];
  departmentStats: { overallAverage: number; highestModuleAvg: number; lowestModuleAvg: number };
  BarChartCmp: any;
  CartesianGridCmp: any;
  XAxisCmp: any;
  YAxisCmp: any;
  TooltipCmp: any;
  BarCmp: any;
}> = ({ submissionStatistics, gradeDistribution, departmentStats, BarChartCmp, CartesianGridCmp, XAxisCmp, YAxisCmp, TooltipCmp, BarCmp }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Statistics</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center"><span className="text-gray-600">Total Submissions:</span><span className="font-semibold">{submissionStatistics.totalSubmissions}</span></div>
        <div className="flex justify-between items-center"><span className="text-gray-600">Approved:</span><span className="font-semibold text-green-600">{submissionStatistics.approved}</span></div>
        <div className="flex justify-between items-center"><span className="text-gray-600">Pending:</span><span className="font-semibold text-orange-600">{submissionStatistics.pending}</span></div>
        <div className="flex justify-between items-center"><span className="text-gray-600">Overdue:</span><span className="font-semibold text-red-600">{submissionStatistics.overdue}</span></div>
        <div className="flex justify-between items-center"><span className="text-gray-600">Rejected:</span><span className="font-semibold text-red-600">{submissionStatistics.rejected}</span></div>
      </div>
    </Card>
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
      <div className="space-y-3">
        {gradeDistribution.map((grade) => (
          <div key={grade.grade} className="flex justify-between items-center">
            <span className="text-gray-600">{grade.grade} Grades:</span>
            <span className={`font-semibold ${grade.grade === 'F' ? 'text-red-600' : 'text-gray-900'}`}>{grade.percentage}%</span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-32">
        <BarChartCmp data={gradeDistribution}>
          <CartesianGridCmp strokeDasharray="3 3" />
          <XAxisCmp dataKey="grade" />
          <YAxisCmp />
          <TooltipCmp />
          <BarCmp dataKey="percentage" fill="#026892" />
        </BarChartCmp>
      </div>
    </Card>
    <Card className="p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Average</h3>
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-[#026892] mb-2">{departmentStats.overallAverage}%</div>
        <div className="text-sm text-gray-600">Overall Department Average</div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center"><span className="text-gray-600">Highest Module Avg:</span><span className="font-semibold text-green-600">{departmentStats.highestModuleAvg}%</span></div>
        <div className="flex justify-between items-center"><span className="text-gray-600">Lowest Module Avg:</span><span className="font-semibold text-red-600">{departmentStats.lowestModuleAvg}%</span></div>
      </div>
    </Card>
  </div>
);

export const MarksDeadlinesSection: React.FC<{
  selectedModule: string;
  setSelectedModule: (v: string) => void;
  selectedDeadline: string;
  setSelectedDeadline: (v: string) => void;
  deadlinesData: { module: string; instructor: string; deadline: string; status: string; daysLeft: number }[];
}> = ({ selectedModule, setSelectedModule, selectedDeadline, setSelectedDeadline, deadlinesData }) => (
  <Card className="p-6 border border-gray-200">
    <h2 className="text-2xl font-bold text-black mb-1">Mark Submission Deadlines</h2>
    <p className="text-gray-600 text-sm mb-6">Manage and track mark submission deadlines for all modules</p>
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Set New Deadline</h3>
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
          <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
            <option value="">Select Module</option>
            <option value="COE3163">COE3163 - Software Engineering</option>
            <option value="COE3166">COE3166 - Web Development</option>
            <option value="COE3264">COE3264 - Database Systems</option>
            <option value="COE3261">COE3261 - Machine Learning</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
          <div className="relative">
            <input type="date" value={selectedDeadline} onChange={(e) => setSelectedDeadline(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white pr-10" />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <button className="bg-[#026892] text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-[#026892]/90">Set Deadline</button>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
      <div className="space-y-3">
        {deadlinesData.map((deadline, index) => (
          <div key={index} className={`p-4 rounded-lg border ${deadline.status === "Overdue" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"}`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-900">{deadline.module}</h4>
                <p className="text-sm text-gray-600">Instructor: {deadline.instructor}</p>
                <p className="text-sm text-gray-600">Deadline: {deadline.deadline}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${deadline.status === "Overdue" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {deadline.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);


