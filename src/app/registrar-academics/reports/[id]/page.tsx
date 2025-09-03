"use client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RegistrarLayout } from "@/components/registrar";
import { Eye, Download, Users, GraduationCap, DollarSign, BarChart3, FileText } from "lucide-react";
import React from "react";

// Sample data (should be imported from a shared file or API in production)
const allReports = [
	// Attendance
	{
		id: "1", title: "Student Attendance Summary", description: "Overall attendance rates by program and department", period: "Semester 2, 2024-25", generated: "2024-03-15", status: "Ready", type: "attendance", department: "Computer Science", records: 1247,
	},
	{
		id: "2", title: "Staff Attendance Report", description: "Faculty and staff attendance tracking", period: "March 2024", generated: "2024-03-10", status: "Ready", type: "attendance", department: "All Departments", records: 89,
	},
	{
		id: "3", title: "Low Attendance Alert", description: "Students below 75% attendance threshold", period: "Current Week", generated: "2024-03-18", status: "Processing", type: "attendance", department: "Engineering", records: 23,
	},
	// Academic
	{
		id: "4", title: "Grade Distribution Analysis", description: "Statistical analysis of grades across all modules", period: "Semester 2, 2024-25", generated: "2024-03-14", status: "Ready", type: "academic", department: "All Departments", records: 5678,
	},
	{
		id: "5", title: "Student Performance Trends", description: "Academic performance tracking over time", period: "Academic Year 2024-25", generated: "2024-03-12", status: "Ready", type: "academic", department: "Business Studies", records: 892,
	},
	{
		id: "6", title: "Module Success Rates", description: "Pass/fail rates by module and lecturer", period: "Semester 1, 2024-25", generated: "2024-02-28", status: "Ready", type: "academic", department: "Sciences", records: 2341,
	},
	// Financial
	{
		id: "7", title: "Fee Collection Summary", description: "Student fee payments and outstanding balances", period: "Semester 2, 2024-25", generated: "2024-03-16", status: "Ready", type: "financial", department: "All Programs", records: 3456,
	},
	{
		id: "8", title: "Scholarship Distribution", description: "Financial aid and scholarship allocations", period: "Academic Year 2024-25", generated: "2024-03-13", status: "Ready", type: "financial", department: "All Departments", records: 234,
	},
	// Operational
	{
		id: "9", title: "Room Utilization Analysis", description: "Classroom and facility usage statistics", period: "March 2024", generated: "2024-03-17", status: "Ready", type: "operational", department: "Facilities", records: 156,
	},
	{
		id: "10", title: "Library Usage Report", description: "Book borrowing and resource utilization", period: "Semester 2, 2024-25", generated: "2024-03-11", status: "Ready", type: "operational", department: "Library", records: 1789,
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Ready": return "bg-green-100 text-green-800";
		case "Processing": return "bg-yellow-100 text-yellow-800";
		case "Failed": return "bg-red-100 text-red-800";
		default: return "bg-white text-gray-800";
	}
};

const getTypeIcon = (type: string) => {
	switch (type) {
		case "attendance": return <Users className="h-5 w-5 mr-2" />;
		case "academic": return <GraduationCap className="h-5 w-5 mr-2" />;
		case "financial": return <DollarSign className="h-5 w-5 mr-2" />;
		case "operational": return <BarChart3 className="h-5 w-5 mr-2" />;
		default: return <FileText className="h-5 w-5 mr-2" />;
	}
};

export default function ReportDetailsPage() {
	const params = useParams();
	const id = params?.id?.toString() || "";
	const report = allReports.find(r => r.id === id);

	return (
		<RegistrarLayout role="registrar-academics" title="Report Details">
			<div className="max-w-2xl mx-auto p-6">
				{report ? (
					<Card className="shadow-md">
						<CardHeader>
							<div className="flex items-center gap-2">
								{getTypeIcon(report.type)}
								<CardTitle className="text-2xl font-bold">{report.title}</CardTitle>
								<Badge className={getStatusColor(report.status)}>{report.status}</Badge>
							</div>
							<CardDescription className="mt-2 text-gray-700">{report.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-2 text-base">
								<div className="flex justify-between"><span>Period:</span><span className="font-medium">{report.period}</span></div>
								<div className="flex justify-between"><span>Department:</span><span className="font-medium">{report.department}</span></div>
								<div className="flex justify-between"><span>Records:</span><span className="font-medium">{report.records.toLocaleString()}</span></div>
								<div className="flex justify-between"><span>Generated:</span><span className="font-medium">{report.generated}</span></div>
							</div>
							<div className="flex gap-2 mt-6">
								<Badge variant="outline" className="flex items-center gap-1"><Eye className="h-4 w-4" /> View</Badge>
								<Badge variant="outline" className="flex items-center gap-1"><Download className="h-4 w-4" /> Export</Badge>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="text-center py-12 text-gray-500">
						<FileText className="h-8 w-8 mx-auto mb-2" />
						<div className="text-lg">Report not found.</div>
					</div>
				)}
			</div>
		</RegistrarLayout>
	);
}
