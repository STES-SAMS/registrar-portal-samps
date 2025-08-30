export interface Event {
	id: string
	title: string
	date: string
	time: string
	endTime?: string
	location: string
	type: "meeting" | "deadline" | "academic" | "social" | "maintenance" | "other"
	priority: "high" | "medium" | "low"
	attendees?: string[]
	description?: string
	status: "scheduled" | "completed" | "cancelled"
}

export const eventTypes = {
	meeting: { color: "bg-blue-500", label: "Meeting", textColor: "text-blue-700" },
	deadline: { color: "bg-red-500", label: "Deadline", textColor: "text-red-700" },
	academic: { color: "bg-green-500", label: "Academic", textColor: "text-green-700" },
	social: { color: "bg-purple-500", label: "Social", textColor: "text-purple-700" },
	maintenance: { color: "bg-orange-500", label: "Maintenance", textColor: "text-orange-700" },
	other: { color: "bg-gray-500", label: "Other", textColor: "text-gray-700" },
}