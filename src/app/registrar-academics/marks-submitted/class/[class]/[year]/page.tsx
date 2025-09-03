// --- Reference table constants ---
"use client";
type Student = {
  sn: number;
  ref: string;
  sex: "M" | "F";
  status?: "ABSCONDED";
};

const students: Student[] = [
  { sn: 1, ref: "223020071", sex: "M" },
  { sn: 2, ref: "223020155", sex: "F" },
  { sn: 3, ref: "223020281", sex: "F" },
  { sn: 4, ref: "223015014", sex: "F" },
  { sn: 5, ref: "223025287", sex: "M", status: "ABSCONDED" },
  { sn: 6, ref: "223023693", sex: "F", status: "ABSCONDED" },
];
const sem1Codes = ["MAT113", "PHY116", "CHE116", "MEE112", "MEE116", "EGP111"];
const sem2Codes = ["MAT112", "PHY112", "CSC112", "MEE114", "CTE111", "MEE117", "MEE132",];
const sem1Credits = [10, 10, 10, 10, 10, 5];
const sem2Credits = [10, 10, 10, 10, 10, 5, 10];

// Data for the Summary tab - Student Summary
const studentSummaryData = [
  { category: "Total number of students registered", 
    f: 11, m: 22, tot: 33, fPct: 33.33, mPct: 66.67, totPct: 100.0 
  },
  {
    category: "Total number of students who sat for exams",
    f: 10,
    m: 19,
    tot: 29,
    fPct: 30.3,
    mPct: 57.58,
    totPct: 87.88,
  },
  { category: "Total number of students to progress", f: 5, m: 11, tot: 16, fPct: 17.24, mPct: 37.93, totPct: 55.17 },
  {
    category: "Total number of students to progress with retake(s)",
    f: 4,
    m: 5,
    tot: 9,
    fPct: 13.79,
    mPct: 17.24,
    totPct: 31.03,
  },
  {
    category: "Total number of students to repeat the year",
    f: 1,
    m: 3,
    tot: 4,
    fPct: 3.45,
    mPct: 10.34,
    totPct: 13.79,
  },
  { category: "Total number of students discontinued", f: 0, m: 0, tot: 0, fPct: 0.0, mPct: 0.0, totPct: 0.0 },
  { category: "Total number of students absconded", f: 1, m: 3, tot: 4, fPct: 3.03, mPct: 9.09, totPct: 12.12 },
  { category: "Total number of students suspended", f: 0, m: 0, tot: 0, fPct: 0.0, mPct: 0.0, totPct: 0.0 },
  { category: "Principal's roll of honour", f: 0, m: 0, tot: 0, fPct: 0.0, mPct: 0.0, totPct: 0.0 },
];

// Data for the Summary tab - Module Performance
const moduleData = [
  {
    semester: "I",
    code: "MAT1163",
    title: "Calculus for Engineers",
    avgScore: 58.27,
    sd: 8.97,
    registered: 33,
    whoSat: 31,
    pass: 33,
    retake: 4,
  },
  {
    semester: "",
    code: "PHY1164",
    title: "Physics for Engineers I",
    avgScore: 58.32,
    sd: 9.48,
    registered: 33,
    whoSat: 31,
    pass: 4,
    retake: 3,
  },
  {
    semester: "",
    code: "CHE1165",
    title: "Chemistry for Engineers",
    avgScore: 56.04,
    sd: 13.67,
    registered: 33,
    whoSat: 37,
    pass: 29,
    retake: 8,
  },
  {
    semester: "",
    code: "MEE1162",
    title: "Engineering Workshop",
    avgScore: 76.81,
    sd: 6.04,
    registered: 33,
    whoSat: 33,
    pass: 33,
    retake: 0,
  },
  {
    semester: "",
    code: "MEE1161",
    title: "Engineering Drawing and CAD",
    avgScore: 66.87,
    sd: 8.6,
    registered: 33,
    whoSat: 37,
    pass: 36,
    retake: 1,
  },
  {
    semester: "",
    code: "ENE1161",
    title: "Introduction to Energy Resources",
    avgScore: 56.97,
    sd: 10.42,
    registered: 33,
    whoSat: 31,
    pass: 33,
    retake: 6,
  },
  {
    semester: "",
    code: "EGP1111",
    title: "English for General Purposes",
    avgScore: 63.27,
    sd: 6.01,
    registered: 33,
    whoSat: 33,
    pass: 33,
    retake: 0,
  },
  {
    semester: "II",
    code: "MAT1263",
    title: "Advanced Calculus for Engineers",
    avgScore: 67.09,
    sd: 9.24,
    registered: 33,
    whoSat: 33,
    pass: 32,
    retake: 1,
  },
  {
    semester: "",
    code: "PHY1263",
    title: "Physics for Engineers II",
    avgScore: 66.38,
    sd: 8.78,
    registered: 33,
    whoSat: 33,
    pass: 33,
    retake: 0,
  },
  {
    semester: "",
    code: "CSC1261",
    title: "Computer Programming",
    avgScore: 58.71,
    sd: 11.09,
    registered: 33,
    whoSat: 33,
    pass: 27,
    retake: 6,
  },
  {
    semester: "",
    code: "MEE1261",
    title: "Engineering Mechanics",
    avgScore: 57.64,
    sd: 11.37,
    registered: 33,
    whoSat: 33,
    pass: 37,
    retake: 6,
  },
  {
    semester: "",
    code: "CTE1111",
    title: "Citizenship and Transformative Education",
    avgScore: 72.37,
    sd: 12.05,
    registered: 33,
    whoSat: 33,
    pass: 31,
    retake: 2,
  },
  {
    semester: "",
    code: "MEE1263",
    title: "Mechanical Workshop Technology II",
    avgScore: 76.81,
    sd: 6.04,
    registered: 33,
    whoSat: 33,
    pass: 33,
    retake: 0,
  },
  {
    semester: "",
    code: "MEE1262",
    title: "Basics of Electrical and Electronic Engineering",
    avgScore: 60.33,
    sd: 10.28,
    registered: 33,
    whoSat: 33,
    pass: 29,
    retake: 4,
  },
];

// Sample data for students
const studentData = [
  {
    scores1: [69.83, 73.8, 73.5, 87.5, 68.06, 61.83],
    scores2: [68.0, 62.83, 72.24, 53.0, 61.7, 67.5, 60.0],
    avg: 63.13,
  },
  {
    scores1: [51.5, 50.7, 51.08, 75.1, 64.8, 50.35],
    scores2: [66.5, 50.5, 58.07, 51.0, 50.1, 64.5, 56.0],
    avg: 57.88,
  },
  {
    scores1: [52.33, 63.1, 60.62, 77.3, 59.32, 55.6],
    scores2: [66.75, 66.33, 70.0, 50.0, 65.3, 81.5, 62.0],
    avg: 64.74,
  },
  {
    scores1: [63.5, 64.8, 68.63, 77.8, 61.08, 65.33],
    scores2: [70.0, 73.0, 70.0, 75.0, 62.3, 76.0, 62.0],
    avg: 70.5,
  },
  { scores1: [44.0, 37.1, 42.48, 0, 55.52, 40.38], scores2: [], avg: 0 }, // ABSCONDED
  { scores1: [66.0, 56.8, 81.53, 0, 69.88, 66.57], scores2: [], avg: 0 }, // ABSCONDED
];

function getLetterGrade(score: number): string {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegistrarLayout } from "@/components/registrar/layout";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Retakers from "@/components/academic/marks/retakers";

const tabs = ["Summary", "Overall Marks", "Repeaters & Retakers"];

export default function ClassMarksPage() {
  const params = useParams();
  const className = params.class
    ? decodeURIComponent(
      Array.isArray(params.class) ? params.class[0] : params.class
    )
    : "Class";
  const year = params.year
    ? decodeURIComponent(
      Array.isArray(params.year) ? params.year[0] : params.year
    )
    : "Year";
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const filteredStudents = students.filter((student) =>
    student.ref.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <RegistrarLayout role="registrar-academics" title="Marks Management">
      <div className="flex items-center mb-4">
        <Link href="/registrar-academics/marks-submitted">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#026892] text-[#026892] hover:bg-[#026892] hover:text-white font-medium shadow-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Marks
          </Button>
        </Link>
      </div>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-2">
          {className} - {year} Marks
        </h1>
        <div className="mb-4 flex gap-2">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-2 rounded-md font-medium text-sm border ${activeTab === idx
                ? "bg-[#026892] text-white border-gray-200 hover:bg-[#026892]/90"
                : "bg-white text-black border-gray-200 hover:bg-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === 0 && (
          <div className="space-y-8">
            {/* First Table - Student Summary */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-2 bg-[#e8e8e8] text-center font-bold" colSpan={7}>
                          TOTAL NUMBER OF STUDENTS
                        </th>
                      </tr>
                      <tr className="bg-[#f5f5f5]">
                        <th className="border p-2 text-left w-80"></th>
                        <th className="border p-2 text-center w-12 font-semibold">F</th>
                        <th className="border p-2 text-center w-12 font-semibold">M</th>
                        <th className="border p-2 text-center w-16 font-semibold">TOT</th>
                        <th className="border p-2 text-center w-16 font-semibold">%F</th>
                        <th className="border p-2 text-center w-16 font-semibold">%M</th>
                        <th className="border p-2 text-center w-16 font-semibold">%TOT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentSummaryData.map((row, idx) => (
                        <tr key={idx} className="even:bg-muted/30">
                          <td className="border p-2 text-left">{row.category}</td>
                          <td className="border p-2 text-center">{row.f}</td>
                          <td className="border p-2 text-center">{row.m}</td>
                          <td className="border p-2 text-center font-semibold">{row.tot}</td>
                          <td className="border p-2 text-center">{row.fPct.toFixed(2)}%</td>
                          <td className="border p-2 text-center">{row.mPct.toFixed(2)}%</td>
                          <td className="border p-2 text-center font-semibold">{row.totPct.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Second Table - Module Performance */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-[#f5f5f5]">
                        <th className="border p-2 text-center w-20 font-semibold">SEMESTER</th>
                        <th className="border p-2 text-center w-20 font-semibold">MODULE CODE</th>
                        <th className="border p-2 text-center w-80 font-semibold">MODULE TITLE</th>
                        <th className="border p-2 text-center w-20 font-semibold">AVERAGE SCORE (%)</th>
                        <th className="border p-2 text-center w-16 font-semibold">SD</th>
                        <th className="border p-2 text-center w-20 font-semibold">NUMBER OF REGISTERED</th>
                        <th className="border p-2 text-center w-24 font-semibold">NUMBER OF STUDENTS WHO SAT FOR EXAMS</th>
                        <th className="border p-2 text-center w-16 font-semibold">PASS</th>
                        <th className="border p-2 text-center w-16 font-semibold">RETAKE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleData.map((row, idx) => (
                        <tr key={idx} className="even:bg-muted/30">
                          <td className="border p-2 text-center font-semibold">{row.semester}</td>
                          <td className="border p-2 text-center font-mono">{row.code}</td>
                          <td className="border p-2 text-left">{row.title}</td>
                          <td className="border p-2 text-center">{row.avgScore.toFixed(2)}</td>
                          <td className="border p-2 text-center">{row.sd.toFixed(2)}</td>
                          <td className="border p-2 text-center">{row.registered}</td>
                          <td className="border p-2 text-center">{row.whoSat}</td>
                          <td className="border p-2 text-center">{row.pass}</td>
                          <td className="border p-2 text-center">{row.retake}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {activeTab === 1 && (
          <Card>
            <CardContent>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-[11px] border-collapse">
                  <thead className="sticky top-0 z-10 w-full">
                    <tr>
                      <th rowSpan={3} className="border p-2 bg-[#cfeac4] w-8">
                        SN
                      </th>
                      <th
                        rowSpan={3}
                        className="border p-2 bg-[#cfeac4] w-24 text-left"
                      >
                        Ref.No.
                      </th>
                      <th rowSpan={3} className="border p-2 bg-[#cfeac4] w-8">
                        SEX
                      </th>
                      <th
                        colSpan={sem1Codes.length}
                        className="border p-2 bg-[#c6f3f1] text-center font-semibold"
                      >
                        SEMESTER I
                      </th>
                      <th
                        colSpan={sem2Codes.length}
                        className="border p-2 bg-[#c6f3f1] text-center font-semibold"
                      >
                        SEMESTER II
                      </th>
                      <th
                        colSpan={6}
                        className="border p-2 bg-[#bfb0d8] text-center font-semibold"
                      >
                        OBSERVATIONS
                      </th>
                    </tr>
                    <tr className="text-[10px]">
                      {sem1Codes.map((c) => (
                        <th
                          key={c}
                          className="border p-1 bg-[#e0f2f1] w-12 text-center"
                        >
                          {c}
                        </th>
                      ))}
                      {sem2Codes.map((c) => (
                        <th
                          key={c}
                          className="border p-1 bg-[#e0f2f1] w-12 text-center"
                        >
                          {c}
                        </th>
                      ))}
                      <th className="border p-1 bg-[#d8caec] w-16">
                        Total credits (ΣCi)
                      </th>
                      <th className="border p-1 bg-[#d8caec] w-16">
                        Annual Average
                      </th>
                      <th className="border p-1 bg-[#d8caec] w-20">
                        Previous Failed module
                      </th>
                      <th className="border p-1 bg-[#d8caec] w-20">
                        Current Failed module
                      </th>
                      <th className="border p-1 bg-[#d8caec] w-20">Remark</th>
                      <th className="border p-1 bg-[#d8caec] w-12">PRH</th>
                    </tr>
                    <tr className="text-[10px]">
                      {sem1Codes.map((_, i) => (
                        <th key={`max1-${i}`} className="border p-1 bg-[#f0f8ff]">
                          100
                        </th>
                      ))}
                      {sem2Codes.map((_, i) => (
                        <th key={`max2-${i}`} className="border p-1 bg-[#f0f8ff]">
                          100
                        </th>
                      ))}
                      <th className="border p-1 bg-[#f0f8ff]" colSpan={6}></th>
                    </tr>
                    <tr className="text-[10px]">
                      <th className="border p-1 bg-[#fff8f0]" colSpan={3}>
                        Pass Mark
                      </th>
                      {Array.from({
                        length: sem1Codes.length + sem2Codes.length,
                      }).map((_, i) => (
                        <th key={`pass-${i}`} className="border p-1 bg-[#fff8f0]">
                          50
                        </th>
                      ))}
                      <th className="border p-1 bg-[#fff8f0]" colSpan={6}></th>
                    </tr>
                    <tr className="text-[10px]">
                      <th className="border p-1 bg-[#f8fff8]" colSpan={3}>
                        Credit (Ci)
                      </th>
                      {sem1Credits.map((c, i) => (
                        <th
                          key={`cred1-${i}`}
                          className="border p-1 bg-[#f8fff8]"
                        >
                          {c}
                        </th>
                      ))}
                      {sem2Credits.map((c, i) => (
                        <th
                          key={`cred2-${i}`}
                          className="border p-1 bg-[#f8fff8]"
                        >
                          {c}
                        </th>
                      ))}
                      <th className="border p-1 bg-[#f8fff8]">130</th>
                      <th className="border p-1 bg-[#f8fff8]" colSpan={5}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map((s, idx) => {
                      // Find the correct index in studentData for the current student
                      const dataIdx = students.findIndex(
                        (stu) => stu.ref === s.ref
                      );
                      return (
                        <React.Fragment key={s.sn}>
                          {/* Numeric scores row */}
                          <tr className="even:bg-muted/30">
                            <td className="border p-1 text-center">{s.sn}</td>
                            <td className="border p-1">{s.ref}</td>
                            <td className="border p-1 text-center">{s.sex}</td>
                            {/* Semester 1 scores */}
                            {studentData[dataIdx]?.scores1.map((score, i) => (
                              <td
                                key={`s1-${i}`}
                                className={`border p-1 text-center ${score < 50 && score > 0
                                  ? "bg-[#ffd9de] text-red-600 font-semibold"
                                  : ""
                                  }`}
                              >
                                {score > 0 ? score.toFixed(2) : ""}
                              </td>
                            ))}
                            {/* Semester 2 scores */}
                            {s.status === "ABSCONDED"
                              ? Array.from({ length: sem2Codes.length }).map(
                                (_, i) => (
                                  <td
                                    key={`s2-abs-${i}`}
                                    className="border p-1 text-center bg-[#ffe4ea]"
                                  ></td>
                                )
                              )
                              : studentData[dataIdx]?.scores2.map((score, i) => (
                                <td
                                  key={`s2-${i}`}
                                  className={`border p-1 text-center ${score < 50
                                    ? "bg-[#ffd9de] text-red-600 font-semibold"
                                    : ""
                                    }`}
                                >
                                  {score.toFixed(2)}
                                </td>
                              ))}
                            <td className="border p-1 text-center">130</td>
                            <td className="border p-1 text-center">
                              {studentData[dataIdx]?.avg > 0
                                ? studentData[dataIdx]?.avg.toFixed(2)
                                : ""}
                            </td>
                            <td className="border p-1"></td>
                            <td className="border p-1"></td>
                            <td className="border p-1 font-semibold">
                              {s.status || "PROGRESS"}
                            </td>
                            <td className="border p-1"></td>
                          </tr>
                          {/* Letter grades row */}
                          <tr className="text-[10px]">
                            <td
                              className="border p-1 text-muted-foreground"
                              colSpan={3}
                            >
                              Letter Grade
                            </td>
                            {/* Semester 1 letter grades */}
                            {studentData[dataIdx]?.scores1.map((score, i) => (
                              <td
                                key={`lg1-${i}`}
                                className="border p-1 text-center text-muted-foreground"
                              >
                                {score > 0 ? getLetterGrade(score) : ""}
                              </td>
                            ))}
                            {/* Semester 2 letter grades */}
                            {s.status === "ABSCONDED"
                              ? Array.from({ length: sem2Codes.length }).map(
                                (_, i) => (
                                  <td
                                    key={`lg2-abs-${i}`}
                                    className="border p-1 text-center text-muted-foreground"
                                  >
                                    F
                                  </td>
                                )
                              )
                              : studentData[dataIdx]?.scores2.map((score, i) => (
                                <td
                                  key={`lg2-${i}`}
                                  className="border p-1 text-center text-muted-foreground"
                                >
                                  {getLetterGrade(score)}
                                </td>
                              ))}
                            <td className="border p-1" colSpan={6}></td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Pagination controls */}
              <div className="flex justify-end items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="text-xs">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        {activeTab === 2 && (
          <Retakers />
        )}
      </div>
    </RegistrarLayout>
  );
}
