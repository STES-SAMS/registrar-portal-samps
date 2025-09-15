import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { eventTypes } from "./eventTypes"

export function EventFilters({
	filterType,
	setFilterType,
	searchTerm,
	setSearchTerm,
	viewMode,
	setViewMode,
}: {
	filterType: string
	setFilterType: (val: string) => void
	searchTerm: string
	setSearchTerm: (val: string) => void
	viewMode: "month" | "week" | "day"
	setViewMode: (val: "month" | "week" | "day") => void
}) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 items-center">
			<div className="flex items-center gap-2">
				<Filter className="h-4 w-4 text-gray-500" />
				<Select value={filterType} onValueChange={setFilterType}>
					<SelectTrigger className="w-40">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Events</SelectItem>
						{Object.entries(eventTypes).map(([key, value]) => (
							<SelectItem key={key} value={key}>
								{value.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center gap-2 flex-1">
				<Search className="h-4 w-4 text-gray-500" />
				<Input
					placeholder="Search events..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="max-w-sm"
				/>
			</div>
			<Tabs value={viewMode}>
				<TabsList>
					<TabsTrigger value="month" onClick={() => setViewMode("month")}>
						Month
					</TabsTrigger>
					<TabsTrigger value="week" onClick={() => setViewMode("week")}>
						Week
					</TabsTrigger>
					<TabsTrigger value="day" onClick={() => setViewMode("day")}>
						Day
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	)
}