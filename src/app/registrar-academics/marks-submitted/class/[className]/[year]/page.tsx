"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { RegistrarLayout } from "@/components/registrar";
import ExcelMarksPage from "@/components/academic/marks/over-all";
import RepeatersComponent from "@/components/academic/marks/repeaters";
import SummaryPage from "@/components/academic/marks/summary";

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
const SummaryTab: React.FC<{ className: string; year: string; groupId: string }> = ({ className, year, groupId }) => {
    console.log('SummaryTab rendering with groupId:', groupId);
    
    return (
        <div className="space-y-6">
            <SummaryPage 
                groupId={groupId} 
                groupName={`${className} - Year ${year}`} 
            />
        </div>
    );
};

// Overall Marks tab content
const OverallMarksTab: React.FC<{ className: string; year: string; groupId: string }> = ({ className, year, groupId }) => {
    console.log('OverallMarksTab rendering with groupId:', groupId);
    
    return (
        <ExcelMarksPage 
            groupId={groupId}
            groupName={`${className} - Year ${year}`} 
        />
    );
};

// Repeaters & Retakers tab content
const RepeatersRetakersTab: React.FC<{ className: string; year: string; groupId: string }> = ({ className, year, groupId }) => {
    return (
        <RepeatersComponent className={className} year={year} groupId={groupId} />
    );
};

export default function ClassMarksPage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("summary");
    const [groupId, setGroupId] = useState("");

    const className = decodeURIComponent(params.className as string);
    const year = params.year as string;
    
    // Get the groupId from the URL query parameters
    useEffect(() => {
        // Extract groupId from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const groupIdParam = urlParams.get('groupId');
        
        if (groupIdParam) {
            console.log('ClassMarksPage - Found groupId in URL:', groupIdParam);
            setGroupId(groupIdParam);
        } else {
            console.log('ClassMarksPage - No groupId in URL, using default');
            // Default group ID if not provided in URL
        }
    }, []);

    const handleBackToMarks = () => {
        router.push("/registrar-academics/marks-submitted");
    };

    return (
        <RegistrarLayout role="registrar-academics" title={`${className} -Marks`}>
            <div className="p-2">
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
                 

                    {activeTab === "summary" && <SummaryTab className={className} year={year} groupId={groupId} />}
                    {activeTab === "overall-marks" && <OverallMarksTab className={className} year={year} groupId={groupId} />}
                    {activeTab === "repeaters-retakers" && <RepeatersRetakersTab className={className} year={year} groupId={groupId} />}
                </div>
            </div>
        </RegistrarLayout>
    );
}