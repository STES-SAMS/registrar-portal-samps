import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { Event } from "./eventTypes"

export function AddEventDialog({
	show,
	setShow,
	onAddEvent,
	eventTypes,
}: {
	show: boolean
	setShow: (val: boolean) => void
	onAddEvent: (event: Event) => void
	eventTypes: typeof import("./eventTypes").eventTypes
}) {
	const [form, setForm] = useState({
		title: "",
		date: "",
		time: "",
		location: "",
		type: "",
		description: "",
	})

	const handleChange = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = () => {
		if (!form.title || !form.date || !form.time || !form.location || !form.type) return
		onAddEvent({
			id: Date.now().toString(),
			title: form.title,
			date: form.date,
			time: form.time,
			location: form.location,
			type: form.type as any,
			priority: "medium",
			status: "scheduled",
			description: form.description,
		})
		setForm({
			title: "",
			date: "",
			time: "",
			location: "",
			type: "",
			description: "",
		})
		setShow(false)
	}

	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogTrigger asChild>
				<Button className="bg-[#026892] hover:bg-[#025f7f]/90 text-white">
					<PlusCircle className="mr-2 h-4 w-4" />
					Add Event
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Add New Event</DialogTitle>
					<DialogDescription>Create a new department event or deadline.</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<Label htmlFor="title">Event Title</Label>
						<Input
							id="title"
							placeholder="Enter event title"
							value={form.title}
							onChange={e => handleChange("title", e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>
							<Label htmlFor="date">Date</Label>
							<Input
								id="date"
								type="date"
								value={form.date}
								onChange={e => handleChange("date", e.target.value)}
							/>
						</div>
						<div>
							<Label htmlFor="time">Time</Label>
							<Input
								id="time"
								type="time"
								value={form.time}
								onChange={e => handleChange("time", e.target.value)}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="location">Location</Label>
						<Input
							id="location"
							placeholder="Event location"
							value={form.location}
							onChange={e => handleChange("location", e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="type">Event Type</Label>
						<Select value={form.type} onValueChange={val => handleChange("type", val)}>
							<SelectTrigger>
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(eventTypes).map(([key, value]) => (
									<SelectItem key={key} value={key}>
										{value.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Event description"
							value={form.description}
							onChange={e => handleChange("description", e.target.value)}
						/>
					</div>
					<div className="flex justify-end gap-2">
						<Button variant="outline" onClick={() => setShow(false)}>
							Cancel
						</Button>
						<Button className="bg-samps-blue-600 hover:bg-samps-blue-700" onClick={handleSubmit}>
							Create Event
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}