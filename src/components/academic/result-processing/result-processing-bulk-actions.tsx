import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle } from "lucide-react"

interface ResultProcessingBulkActionsProps {
  selectedCount: number
  onBulkApprove: () => void
  onBulkReview: () => void
  onBulkReject: () => void
}

export function ResultProcessingBulkActions({ 
  selectedCount, 
  onBulkApprove, 
  onBulkReview, 
  onBulkReject 
}: ResultProcessingBulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <Alert>
      <AlertDescription>
        <div className="flex items-center justify-between">
          <span>{selectedCount} result(s) selected</span>
          <div className="flex gap-2">
            <Button size="sm" className="gap-2" onClick={onBulkApprove}>
              <CheckCircle className="h-4 w-4" />
              Bulk Approve
            </Button>
            <Button size="sm" variant="outline" className="gap-2" onClick={onBulkReview}>
              <AlertTriangle className="h-4 w-4" />
              Request Review
            </Button>
            <Button size="sm" variant="destructive" className="gap-2" onClick={onBulkReject}>
              <AlertTriangle className="h-4 w-4" />
              Bulk Reject
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
