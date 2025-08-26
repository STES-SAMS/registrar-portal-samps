// Main component
export { ResultProcessing } from './index'

// Individual components (for flexibility if needed)
export { ResultProcessingHeader } from './result-processing-header'
export { ResultProcessingStats } from './result-processing-stats'
export { ResultProcessingFiltersComponent } from './result-processing-filters'
export { ResultProcessingBulkActions } from './result-processing-bulk-actions'
export { ResultProcessingTable } from './result-processing-table'
export { ResultProcessingSummary } from './result-processing-summary'

// Types and data
export type { ResultRecord, ResultProcessingFilters, ResultProcessingProps } from './types'
export { mockResults } from './mock-data'
