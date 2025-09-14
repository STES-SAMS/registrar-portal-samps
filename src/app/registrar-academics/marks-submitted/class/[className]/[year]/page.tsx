"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { RegistrarLayout } from "@/components/registrar";
import ExcelMarksPage from "@/components/academic/marks/over-all";
import RepeatersComponent from "@/components/academic/marks/repeaters";

// Tab component for the class marks view
const ClassMarksTabs: React.FC<{
    activeTab: string;
    setActiveTab: (tab: string) => void;
}> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { key: "summary", label: "Summary" },
        { key: "overall-marks", label: "Overall Marks" },
        { key: "repeaters-retakers", label: "Repeaters & Retakers" },
    ];

    return (
        <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.key
                            ? "border-[#026892] text-[#026892] bg-[#026892]/5"
                            : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Summary tab content
const SummaryTab: React.FC<{ className: string; year: string }> = ({ className, year }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Students</h3>
                    <p className="text-3xl font-bold text-[#026892]">45</p>
                    <p className="text-sm text-gray-600 mt-1">Enrolled students</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Pass Rate</h3>
                    <p className="text-3xl font-bold text-green-600">78%</p>
                    <p className="text-sm text-gray-600 mt-1">Students passed</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Score</h3>
                    <p className="text-3xl font-bold text-blue-600">72.5</p>
                    <p className="text-sm text-gray-600 mt-1">Class average</p>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade Distribution</h3>
                <div className="space-y-3">
                    {[
                        { grade: "A", count: 8, percentage: 18, color: "bg-green-500" },
                        { grade: "B", count: 15, percentage: 33, color: "bg-blue-500" },
                        { grade: "C", count: 12, percentage: 27, color: "bg-yellow-500" },
                        { grade: "D", count: 6, percentage: 13, color: "bg-orange-500" },
                        { grade: "F", count: 4, percentage: 9, color: "bg-red-500" },
                    ].map((item) => (
                        <div key={item.grade} className="flex items-center gap-4">
                            <div className="w-12 text-sm font-medium">{item.grade}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-6">
                                <div
                                    className={`${item.color} h-6 rounded-full flex items-center justify-end pr-2`}
                                    style={{ width: `${item.percentage}%` }}
                                >
                                    <span className="text-white text-xs font-medium">{item.count}</span>
                                </div>
                            </div>
                            <div className="w-16 text-sm text-gray-600">{item.percentage}%</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

// Overall Marks tab content
const OverallMarksTab: React.FC<{ className: string; year: string }> = ({ }) => {

    return (
        <ExcelMarksPage />
    );
};

// Repeaters & Retakers tab content
const RepeatersRetakersTab: React.FC<{ className: string; year: string }> = ({ className, year }) => {
    return (
        <RepeatersComponent className={className} year={year} />
    );
};

export default function ClassMarksPage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("summary");

    const className = decodeURIComponent(params.className as string);
    const year = params.year as string;

    const handleBackToMarks = () => {
        router.push("/registrar-academics/marks-submitted");
    };

    return (
        <RegistrarLayout role="registrar-academics" title={`${className} -Marks`}>
            <div className="p-6">
                {/* Back button */}
                <div className="mb-4">
                    <Button
                        variant="outline"
                        onClick={handleBackToMarks}
                        className="flex items-center gap-2 text-[#026892] border-[#026892] hover:bg-[#026892] hover:text-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Marks
                    </Button>
                </div>

                {/* Page title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {className} -  Marks
                    </h1>
                </div>

                {/* Tabs */}
                <ClassMarksTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab content */}
                <div className="mt-6">
                    {activeTab === "summary" && <SummaryTab className={className} year={year} />}
                    {activeTab === "overall-marks" && <OverallMarksTab className={className} year={year} />}
                    {activeTab === "repeaters-retakers" && <RepeatersRetakersTab className={className} year={year} />}
                </div>
            </div>
        </RegistrarLayout>
    );
}