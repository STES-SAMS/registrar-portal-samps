import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Bell } from "lucide-react"
import { format } from "date-fns"
import { Event } from "./eventTypes"

export function EventDetailsSidebar({
	selectedDate,
	getEventsForDate,
	selectedEvent,
	setSelectedEvent,
	getAllFilteredEvents,
	eventTypes,
}: {
	selectedDate: Date | undefined
	getEventsForDate: (date: Date) => Event[]
	selectedEvent: Event | null
	setSelectedEvent: (event: Event | null) => void
	getAllFilteredEvents: () => Event[]
	eventTypes: typeof import("./eventTypes").eventTypes
}) {
	return (
		<div className="space-y-6">
			<Card className="bg-white shadow-sm">
				<CardHeader>
					<CardTitle className="text-gray-700 mb-2">
						{selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Select a Date"}
					</CardTitle>
					<CardDescription>
						{selectedDate
							? `${getEventsForDate(selectedDate).length} events scheduled`
							: "Click on a date to view events"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{selectedDate && getEventsForDate(selectedDate).length > 0 ? (
						<div className="space-y-3">
							{getEventsForDate(selectedDate).map((event) => (
								<div
									key={event.id}
									className="p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors"
									onClick={() => setSelectedEvent(event)}
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h4 className="font-semibold text-samps-blue-700">{event.title}</h4>
											<div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
												<Clock className="h-3 w-3" />
												{event.time} {event.endTime && `- ${event.endTime}`}
											</div>
											<div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
												<MapPin className="h-3 w-3" />
												{event.location}
											</div>
										</div>
										<Badge className={`${eventTypes[event.type].color} text-white`}>
											{eventTypes[event.type].label}
										</Badge>
									</div>
								</div>
							))}
						</div>
					) : selectedDate ? (
						<p className="text-sm text-gray-600 text-center py-4">No events scheduled for this date.</p>
					) : (
						<p className="text-sm text-gray-600 text-center py-4">Select a date to view events.</p>
					)}
				</CardContent>
			</Card>

			<Card className="bg-white shadow-sm">
				<CardHeader>
					<CardTitle className="text-gray-700 mb-2">Upcoming Events</CardTitle>
					<CardDescription>Next 5 upcoming events</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{getAllFilteredEvents()
							.slice(0, 5)
							.map((event) => (
								<div
									key={event.id}
									className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer transition-colors"
									onClick={() => setSelectedEvent(event)}
								>
									<div className={`w-3 h-3 rounded-full ${eventTypes[event.type].color}`}></div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-sm truncate">{event.title}</p>
										<p className="text-xs text-gray-500">
											{format(new Date(event.date), "MMM d")} • {event.time}
										</p>
									</div>
									{event.priority === "high" && <Bell className="h-3 w-3 text-red-500" />}
								</div>
							))}
					</div>
				</CardContent>
			</Card>

			<Card className="bg-white shadow-sm">
				<CardHeader>
					<CardTitle className="text-gray-700">Event Types</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{Object.entries(eventTypes).map(([key, value]) => (
							<div key={key} className="flex items-center gap-2">
								<div className={`w-3 h-3 rounded-full ${value.color}`}></div>
								<span className="text-sm">{value.label}</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}