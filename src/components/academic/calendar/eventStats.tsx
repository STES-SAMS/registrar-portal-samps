import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Clock, Bell, Users } from "lucide-react"
import { isSameMonth } from "date-fns"
import { Event } from "./eventTypes"

export function EventStats({ events, currentDate }: { events: Event[]; currentDate: Date }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
			<Card className="bg-[#026892] from-blue-500 to-blue-600 text-white">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-blue-100 text-sm">Total Events</p>
							<p className="text-2xl font-bold">{events.length}</p>
						</div>
						<CalendarIcon className="h-8 w-8 text-blue-200" />
					</div>
				</CardContent>
			</Card>
			<Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-green-100 text-sm">This Month</p>
							<p className="text-2xl font-bold">
								{events.filter((e) => isSameMonth(new Date(e.date), currentDate)).length}
							</p>
						</div>
						<Clock className="h-8 w-8 text-green-200" />
					</div>
				</CardContent>
			</Card>
			<Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-orange-100 text-sm">High Priority</p>
							<p className="text-2xl font-bold">{events.filter((e) => e.priority === "high").length}</p>
						</div>
						<Bell className="h-8 w-8 text-orange-200" />
					</div>
				</CardContent>
			</Card>
			<Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-purple-100 text-sm">Meetings</p>
							<p className="text-2xl font-bold">{events.filter((e) => e.type === "meeting").length}</p>
						</div>
						<Users className="h-8 w-8 text-purple-200" />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}