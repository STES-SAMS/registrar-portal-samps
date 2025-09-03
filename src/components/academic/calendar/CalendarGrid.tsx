import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth } from "date-fns"
import { Event } from "./eventTypes"

export function CalendarGrid({
	viewMode,
	currentDate,
	selectedDate,
	setSelectedDate,
	navigateMonth,
	setCurrentDate,
	getEventsForDate,
	eventTypes,
}: {
	viewMode: "month" | "week" | "day"
	currentDate: Date
	selectedDate: Date | undefined
	setSelectedDate: (date: Date) => void
	navigateMonth: (dir: "prev" | "next") => void
	setCurrentDate: (date: Date) => void
	getEventsForDate: (date: Date) => Event[]
	eventTypes: typeof import("./eventTypes").eventTypes
}) {
	const renderMonthGrid = () => {
		const monthStart = startOfMonth(currentDate)
		const monthEnd = endOfMonth(currentDate)
		const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

		return (
			<div className="grid grid-cols-7 gap-1 p-4">
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
					<div key={day} className="p-2 text-center font-semibold text-samps-blue-700 border-b">
						{day}
					</div>
				))}
				{days.map((day) => {
					const dayEvents = getEventsForDate(day)
					const isSelected = selectedDate && isSameDay(day, selectedDate)
					const isCurrentDay = isToday(day)

					return (
						<div
							key={day.toISOString()}
							className={`min-h-[100px] p-1 border border-gray-200 cursor-pointer transition-colors hover:bg-white ${isSelected ? "bg-samps-blue-50 border-samps-blue-300" : ""
								} ${isCurrentDay ? "ring-2 ring-samps-blue-400" : ""}`}
							onClick={() => setSelectedDate(day)}
						>
							<div
								className={`text-sm font-medium mb-1 ${isCurrentDay
									? "text-samps-blue-600 font-bold"
									: isSameMonth(day, currentDate)
										? "text-gray-900"
										: "text-gray-400"
									}`}
							>
								{format(day, "d")}
							</div>
							<div className="space-y-1">
								{dayEvents.slice(0, 2).map((event) => (
									<div
										key={event.id}
										className={`text-xs p-1 rounded truncate cursor-pointer ${eventTypes[event.type].color} text-white hover:opacity-80`}
									>
										{event.title}
									</div>
								))}
								{dayEvents.length > 2 && (
									<div className="text-xs text-gray-500 font-medium">+{dayEvents.length - 2} more</div>
								)}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<Card className="lg:col-span-2 bg-white shadow-sm">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-gray-700 mb-2">{format(currentDate, "MMMM yyyy")}</CardTitle>
						<CardDescription>Click on dates to view events</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
							Today
						</Button>
						<Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				{viewMode === "month" && renderMonthGrid()}
				{viewMode !== "month" && (
					<div className="flex items-center justify-center min-h-[200px] text-gray-500 font-medium">
						{viewMode === "week"
							? "Week view coming soon!"
							: "Day view coming soon!"}
					</div>
				)}
			</CardContent>
		</Card>
	)
}