// Simple Marks component for QuickActions
export const Marks: React.FC = () => (
	<div>
		<h2 className="text-xl font-bold mb-2">All Student Marks</h2>
		<p className="text-gray-600 mb-4">This is a placeholder for the marks overview.</p>
		{/* You can render <MarksSubmittedTable /> or other mark-related components here */}
	</div>
);
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface MarksRow {
	lecturer: string;
	module: string;
	students: number;
	submissionDate: string;
	deadline: string;
	status: string;
}

interface MarksSubmittedTableProps {
	data: MarksRow[];
	page: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	totalPages: number;
	// Optional custom renderer for the Actions column
	renderActions?: (row: MarksRow, index: number) => React.ReactNode;
}

export const MarksSubmittedTable: React.FC<MarksSubmittedTableProps> = ({ data, page, pageSize, onPageChange, totalPages, renderActions }) => (
	<>
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow className="bg-gray-50">
						<TableHead className="text-black">Lecturer</TableHead>
						<TableHead className="text-black">Module</TableHead>
						<TableHead className="text-black">Students</TableHead>
						<TableHead className="text-black">Submission Date</TableHead>
						<TableHead className="text-black">Deadline</TableHead>
						<TableHead className="text-black">Status</TableHead>
						<TableHead className="text-right text-black">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, idx) => (
						<TableRow key={idx}>
							<TableCell className="font-medium text-gray-800">{row.lecturer}</TableCell>
							<TableCell className="text-gray-700">{row.module}</TableCell>
							<TableCell className="text-gray-700">{row.students}</TableCell>
							<TableCell className="text-gray-700">{row.submissionDate}</TableCell>
							<TableCell className="text-gray-700">{row.deadline}</TableCell>
							<TableCell>{row.status}</TableCell>
							<TableCell className="text-right flex gap-2 justify-end">{renderActions ? renderActions(row, idx) : null}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
		{/* Pagination Controls */}
		<div className="flex justify-end items-center mt-4 gap-2">
			<button
				className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 disabled:opacity-50"
				onClick={() => onPageChange(Math.max(1, page - 1))}
				disabled={page === 1}
			>
				Previous
			</button>
			<span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
			<button
				className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 disabled:opacity-50"
				onClick={() => onPageChange(Math.min(totalPages, page + 1))}
				disabled={page === totalPages}
			>
				Next
			</button>
		</div>
	</>
);
