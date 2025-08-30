import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin, Users } from "lucide-react"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { Event } from "./eventTypes"

export function EventDetailModal({
	selectedEvent,
	setSelectedEvent,
	eventTypes,
}: {
	selectedEvent: Event | null
	setSelectedEvent: (event: Event | null) => void
	eventTypes: typeof import("./eventTypes").eventTypes
}) {
	if (!selectedEvent) return null
	return (
		<Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<CalendarIcon className="h-5 w-5" />
						{selectedEvent.title}
					</DialogTitle>
					<DialogDescription>Event Details</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Badge className={`${eventTypes[selectedEvent.type].color} text-white`}>
							{eventTypes[selectedEvent.type].label}
						</Badge>
						<Badge
							variant={
								selectedEvent.priority === "high"
									? "destructive"
									: selectedEvent.priority === "medium"
										? "default"
										: "secondary"
							}
						>
							{selectedEvent.priority} priority
						</Badge>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label className="text-sm font-medium text-gray-700">Date</Label>
							<p className="text-sm">{format(new Date(selectedEvent.date), "EEEE, MMMM d, yyyy")}</p>
						</div>
						<div>
							<Label className="text-sm font-medium text-gray-700">Time</Label>
							<p className="text-sm">
								{selectedEvent.time} {selectedEvent.endTime && `- ${selectedEvent.endTime}`}
							</p>
						</div>
					</div>

					<div>
						<Label className="text-sm font-medium text-gray-700">Location</Label>
						<p className="text-sm flex items-center gap-1">
							<MapPin className="h-3 w-3" />
							{selectedEvent.location}
						</p>
					</div>

					{selectedEvent.attendees && (
						<div>
							<Label className="text-sm font-medium text-gray-700">Attendees</Label>
							<p className="text-sm flex items-center gap-1">
								<Users className="h-3 w-3" />
								{selectedEvent.attendees.join(", ")}
							</p>
						</div>
					)}

					{selectedEvent.description && (
						<div>
							<Label className="text-sm font-medium text-gray-700">Description</Label>
							<p className="text-sm text-gray-600">{selectedEvent.description}</p>
						</div>
					)}

					<div className="flex justify-end gap-2 pt-4">
						<Button variant="outline" onClick={() => setSelectedEvent(null)}>
							Close
						</Button>
						<Button className="bg-[#026892] hover:bg-[#025f7f]/90">Edit Event</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}