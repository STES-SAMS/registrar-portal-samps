"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { MarksRow } from "@/components/academic/marks/marks";
import { MarksHeaderTabs, MarksSubTabs, MarksModuleSection, MarksClassSection, MarksAnalyticsSection, MarksDeadlinesSection } from "@/components/academic/marks";
import { ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { RegistrarLayout } from "@/components/registrar";

// Import our API-based filters
import { useFilters } from "@/hooks/use-filters";


const gradeDistributionData = [
  { name: "Approved", value: 3, color: "#22c55e" },
  { name: "Pending", value: 2, color: "#eab308" },
  { name: "Not Submitted", value: 1, color: "#6b7280" },
];

// Analytics data based on the image
const submissionStatistics = {
  totalSubmissions: 4,
  approved: 1,
  pending: 1,
  overdue: 1,
  rejected: 1,
};

const gradeDistribution = [
  { grade: "A", percentage: 25, color: "#22c55e" },
  { grade: "B", percentage: 35, color: "#3b82f6" },
  { grade: "C", percentage: 30, color: "#f59e0b" },
  { grade: "D", percentage: 8, color: "#8b5cf6" },
  { grade: "F", percentage: 2, color: "#ef4444" },
];

const departmentStats = {
  overallAverage: 74.2,
  highestModuleAvg: 86.3,
  lowestModuleAvg: 62.1,
};

// Deadlines data based on the image
const deadlinesData = [
  {
    module: "COE3166 - Web Development",
    instructor: "Ms. Carol Davis",
    deadline: "Dec 18, 2024",
    status: "Overdue",
    daysLeft: -2,
  },
  {
    module: "COE3163 - Software Engineering",
    instructor: "Dr. Alice Smith",
    deadline: "Dec 20, 2024",
    status: "2 days left",
    daysLeft: 2,
  },
];

const marksData = [
  {
    lecturer: "Dr. Alice Smith",
    module: "COE3163 - Software Engineering",
    students: 45,
    submissionDate: "2024-12-15",
    deadline: "2024-12-20",
    status: "Pending",
  },
  {
    lecturer: "Prof. Bob Johnson",
    module: "COE3264 - Database Systems",
    students: 38,
    submissionDate: "2024-12-14",
    deadline: "2024-12-20",
    status: "Approved",
  },
  {
    lecturer: "Ms. Carol Davis",
    module: "COE3166 - Web Development",
    students: 42,
    submissionDate: "Not submitted",
    deadline: "2024-12-18",
    status: "Overdue",
  },
  {
    lecturer: "Dr. David Brown",
    module: "COE3261 - Machine Learning",
    students: 35,
    submissionDate: "2024-12-16",
    deadline: "2024-12-20",
    status: "Rejected",
  },
];

export default function MarksSubmittedPage() {
  // Main tabs: 'mark-submissions', 'analytics', 'deadlines'
  const [mainActiveTab, setMainActiveTab] = React.useState("mark-submissions");
  
  // Sub tabs: 'module' or 'class' (only for mark-submissions tab)
  const [activeTab, setActiveTab] = React.useState("class");

  // API-based filters
  const {
    filters,
    filterOptions,
    isLoading: isFilterLoading,
    updateFilters,
    resetFilters
  } = useFilters({
    loadMode: 'eager' // Load all data upfront for better UX
  });
  
  // Module Table State
  const [modulePage, setModulePage] = React.useState(1);
  const [moduleSearch, setModuleSearch] = React.useState("");
  const modulePageSize = 4;
  const moduleFilteredData = marksData.filter(
    (row) =>
      (row.lecturer &&
        row.lecturer.toLowerCase().includes(moduleSearch.toLowerCase())) ||
      (row.module &&
        row.module.toLowerCase().includes(moduleSearch.toLowerCase()))
  );
  const moduleTotalPages = Math.ceil(
    moduleFilteredData.length / modulePageSize
  );
  const modulePaginatedData = moduleFilteredData.slice(
    (modulePage - 1) * modulePageSize,
    modulePage * modulePageSize
  );

  // Dummy class data for demonstration
  const classData = [
    {
      className: "Computer Science",
      yearOfStudy: "Year 1",
      students: 45,
      submissionDate: "2024-12-15",
      deadline: "2024-12-20",
      status: "Pending",
    },
    {
      className: "Computer Engineering",
      yearOfStudy: "Year 2",
      students: 38,
      submissionDate: "2024-12-14",
      deadline: "2024-12-20",
      status: "Approved",
    },
    {
      className: "Information Technology",
      yearOfStudy: "Year 1",
      students: 42,
      submissionDate: "Not submitted",
      deadline: "2024-12-18",
      status: "Overdue",
    },
    {
      className: "Information System",
      yearOfStudy: "Year 3",
      students: 35,
      submissionDate: "2024-12-16",
      deadline: "2024-12-20",
      status: "Rejected",
    },
  ];
  // Class Table State
  const [classPage, setClassPage] = React.useState(1);
  const [classSearch, setClassSearch] = React.useState("");
  const classPageSize = 4;
  const classFilteredData = classData.filter(
    (row) =>
      (row.className &&
        row.className.toLowerCase().includes(classSearch.toLowerCase())) ||
      (row.yearOfStudy &&
        row.yearOfStudy.toLowerCase().includes(classSearch.toLowerCase()))
  );
  const classTotalPages = Math.ceil(classFilteredData.length / classPageSize);
  const classPaginatedData = classFilteredData.slice(
    (classPage - 1) * classPageSize,
    classPage * classPageSize
  );

  // Deadlines state
  const [selectedModule, setSelectedModule] = React.useState("");
  const [selectedDeadline, setSelectedDeadline] = React.useState("");
  
  // Additional year filter for academic years
  const [selectedYear, setSelectedYear] = React.useState("");

  return (
    <RegistrarLayout role="registrar-academics" title="Marks Management">
      <div className="p-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Marks Management
        </h1>
        <p className="text-gray-600 text-base mb-2">
        Review and approve marks submitted by Dean
      </p>
      <MarksHeaderTabs mainActiveTab={mainActiveTab} setMainActiveTab={setMainActiveTab} />

      {/* Mark Submissions Tab */}
      {mainActiveTab === "mark-submissions" && (
        <Card className="p-6 border border-gray-200">
          
          <MarksSubTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* Table for Module Tab */}
          {activeTab === "module" && (
            <MarksModuleSection
              data={modulePaginatedData as MarksRow[]}
              page={modulePage}
              pageSize={modulePageSize}
              onPageChange={setModulePage}
              totalPages={moduleTotalPages}
              moduleSearch={moduleSearch}
              setModuleSearch={(v: string) => { setModuleSearch(v); setModulePage(1); }}
            />
          )}
          {/* Table for Class Tab */}
          {activeTab === "class" && (
            <MarksClassSection
              classData={classPaginatedData}
              classPage={classPage}
              setClassPage={setClassPage}
              classTotalPages={classTotalPages}
              classSearch={classSearch}
              setClassSearch={(v: string) => { setClassSearch(v); setClassPage(1); }}
              filters={filters}
              onFiltersChange={updateFilters}
              filterOptions={filterOptions}
              isFilterLoading={isFilterLoading}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          )}
        </Card>
      )}

      {/* Analytics Tab */}
      {mainActiveTab === "analytics" && (
        <MarksAnalyticsSection
          submissionStatistics={submissionStatistics}
          gradeDistribution={gradeDistribution}
          departmentStats={departmentStats}
          BarChartCmp={({ children, ...props }: any) => (
            <ResponsiveContainer width="100%" height={128}>
              <BarChart {...props}>{children}</BarChart>
            </ResponsiveContainer>
          )}
          CartesianGridCmp={CartesianGrid}
          XAxisCmp={XAxis}
          YAxisCmp={YAxis}
          TooltipCmp={Tooltip}
          BarCmp={Bar}
        />
      )}

      {/* Deadlines Tab */}
      {mainActiveTab === "deadlines" && (
        <MarksDeadlinesSection
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          selectedDeadline={selectedDeadline}
          setSelectedDeadline={setSelectedDeadline}
          deadlinesData={deadlinesData}
        />
      )}
    </div>
    </RegistrarLayout>
  );
}
