"use client"

import { useState } from "react"
import {  addMonths, subMonths, isSameDay } from "date-fns"
import { eventTypes, Event } from "@/components/academic/calendar/eventTypes"
import { EventFilters } from "@/components/academic/calendar/EventFilters"
import { EventDetailsSidebar } from "@/components/academic/calendar/EventDetailsSidebar"
import { EventDetailModal } from "@/components/academic/calendar/EventDetailModal"
import { AddEventDialog } from "@/components/academic/calendar/AddEventDialog"
import { RegistrarLayout } from "@/components/registrar"
import { CalendarGrid } from "@/components/academic/calendar/CalendarGrid"
import { EventStats } from "@/components/academic/calendar/eventStats"

export default function DepartmentCalendarPage() {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
	const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
	const [showAddEvent, setShowAddEvent] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
	const [filterType, setFilterType] = useState<string>("all")
	const [searchTerm, setSearchTerm] = useState("")

	const [events, setEvents] = useState<Event[]>([
		{
			id: "1",
			title: "Faculty Retreat",
			date: "2024-08-15",
			time: "09:00 AM",
			endTime: "05:00 PM",
			location: "University Hall",
			type: "academic",
			priority: "high",
			attendees: ["Dr. Smith", "Prof. Johnson", "Dr. Williams"],
			description: "Annual faculty retreat for strategic planning and team building.",
			status: "scheduled",
		},
		{
			id: "2",
			title: "Module Review Committee Meeting",
			date: "2024-08-20",
			time: "10:00 AM",
			endTime: "12:00 PM",
			location: "Dept. Meeting Room",
			type: "meeting",
			priority: "high",
			attendees: ["HOD", "Module Coordinators"],
			description: "Review of current modules and planning for next semester.",
			status: "scheduled",
		},
		{
			id: "3",
			title: "New Student Orientation",
			date: "2024-09-01",
			time: "09:00 AM",
			endTime: "01:00 PM",
			location: "Main Auditorium",
			type: "academic",
			priority: "medium",
			attendees: ["All Faculty", "Student Services"],
			description: "Welcome and orientation program for new students.",
			status: "scheduled",
		},
		{
			id: "4",
			title: "Research Grant Application Deadline",
			date: "2024-09-10",
			time: "05:00 PM",
			location: "Online",
			type: "deadline",
			priority: "high",
			description: "Final deadline for research grant applications.",
			status: "scheduled",
		},
		{
			id: "5",
			title: "Department Social Event",
			date: "2024-08-25",
			time: "06:00 PM",
			endTime: "09:00 PM",
			location: "Faculty Lounge",
			type: "social",
			priority: "low",
			attendees: ["All Department Staff"],
			description: "Monthly department social gathering.",
			status: "scheduled",
		},
		{
			id: "6",
			title: "IT System Maintenance",
			date: "2024-08-30",
			time: "02:00 AM",
			endTime: "06:00 AM",
			location: "Server Room",
			type: "maintenance",
			priority: "medium",
			description: "Scheduled maintenance of department IT systems.",
			status: "scheduled",
		},
	])

	const getEventsForDate = (date: Date) => {
		return events.filter((event) => {
			const eventDate = new Date(event.date)
			const matchesDate = isSameDay(eventDate, date)
			const matchesFilter = filterType === "all" || event.type === filterType
			const matchesSearch =
				searchTerm === "" ||
				event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.location.toLowerCase().includes(searchTerm.toLowerCase())
			return matchesDate && matchesFilter && matchesSearch
		})
	}

	const getAllFilteredEvents = () => {
		return events
			.filter((event) => {
				const matchesFilter = filterType === "all" || event.type === filterType
				const matchesSearch =
					searchTerm === "" ||
					event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					event.location.toLowerCase().includes(searchTerm.toLowerCase())
				return matchesFilter && matchesSearch
			})
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	}

	const navigateMonth = (direction: "prev" | "next") => {
		setCurrentDate((prev) => (direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)))
	}

	// Tab logic: set selected date or week/day for "week"/"day" view
	const handleTabChange = (mode: "month" | "week" | "day") => {
		setViewMode(mode)
		if (mode === "month") {
			setSelectedDate(undefined)
		} else if (mode === "week") {
			// If implementing week, set selectedDate to start of week
			// setSelectedDate(startOfWeek(currentDate))
		} else if (mode === "day") {
			setSelectedDate(currentDate)
		}
	}

	return (
		<RegistrarLayout role="registrar-academics" title="Calendar">
			<div className="flex-1 p-1 md:p-2 space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold text-black">Calendar</h1>
						<p className="text-gray-600 mt-1">Manage and view all department events and deadlines</p>
					</div>
					<AddEventDialog
						show={showAddEvent}
						setShow={setShowAddEvent}
						onAddEvent={(newEvent) => setEvents((prev) => [...prev, newEvent])}
						eventTypes={eventTypes}
					/>
				</div>

				<EventStats events={events} currentDate={currentDate} />

				<EventFilters
					filterType={filterType}
					setFilterType={setFilterType}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					viewMode={viewMode}
					setViewMode={handleTabChange}
				/>

				<div className="grid gap-6 lg:grid-cols-3">
					{/* Calendar View */}
					<CalendarGrid
						viewMode={viewMode}
						currentDate={currentDate}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						navigateMonth={navigateMonth}
						setCurrentDate={setCurrentDate}
						getEventsForDate={getEventsForDate}
						eventTypes={eventTypes}
					/>

					<EventDetailsSidebar
						selectedDate={selectedDate}
						getEventsForDate={getEventsForDate}
						selectedEvent={selectedEvent}
						setSelectedEvent={setSelectedEvent}
						getAllFilteredEvents={getAllFilteredEvents}
						eventTypes={eventTypes}
					/>
				</div>

				<EventDetailModal
					selectedEvent={selectedEvent}
					setSelectedEvent={setSelectedEvent}
					eventTypes={eventTypes}
				/>
			</div>
		</RegistrarLayout>
	)
}