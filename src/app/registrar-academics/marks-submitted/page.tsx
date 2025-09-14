"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { MarksHeaderTabs, MarksSubTabs, MarksClassSection } from "@/components/academic/marks";
import { RegistrarLayout } from "@/components/registrar";

// Import our API-based filters
import { useFilters } from "@/hooks/use-filters";

// Import the grading API functions
import {
  fetchPendingGroupSubmissions,
  GroupSubmission,
  submitGroupSubmissionApproval,
  ApprovalRequest
} from "@/lib/api-mark-submition";

export default function MarksSubmittedPage() {
  const [mainActiveTab, setMainActiveTab] = React.useState("mark-submissions");

  // Sub tabs: 'module' or 'class' (only for mark-submissions tab)
  const [activeTab, setActiveTab] = React.useState("class");

  // API data states
  const [pendingSubmissions, setPendingSubmissions] = React.useState<GroupSubmission[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = React.useState(false);
  const [submissionsError, setSubmissionsError] = React.useState<string | null>(null);

  // Approval states
  const [approvalLoading, setApprovalLoading] = React.useState<Record<string, boolean>>({});
  const [selectedSubmission, setSelectedSubmission] = React.useState<GroupSubmission | null>(null);
  const [approvalComments, setApprovalComments] = React.useState("");
  const [showApprovalModal, setShowApprovalModal] = React.useState(false);

  // API-based filters
  const {
    filters,
    filterOptions,
    isLoading: isFilterLoading,
    updateFilters,
    resetFilters
  } = useFilters({
    loadMode: 'eager' // Load all data upfront for better UX
  });

  // Fetch pending submissions on component mount
  React.useEffect(() => {
    loadPendingSubmissions();
  }, []);

  const loadPendingSubmissions = async () => {
    setIsLoadingSubmissions(true);
    setSubmissionsError(null);
    try {
      console.log('Fetching pending submissions...');
      const response = await fetchPendingGroupSubmissions();
      console.log('API Response:', response);
      if (response.success) {
        setPendingSubmissions(response.data);
        console.log('Successfully loaded', response.data.length, 'submissions');
      } else {
        setSubmissionsError(response.message || 'Failed to fetch submissions');
        console.error('API Error:', response.message);
      }
    } catch (error) {
      console.error('Error loading pending submissions:', error);
      setSubmissionsError('Failed to load pending submissions. Please check the console for details.');
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  // Handle approval/rejection of submissions
  const handleApproval = async (submission: GroupSubmission, approved: boolean, comments: string) => {
    const submissionId = submission.id;
    setApprovalLoading(prev => ({ ...prev, [submissionId]: true }));

    try {
      const approvalData: ApprovalRequest = {
        submissionId,
        approved,
        comments
      };

      console.log('Submitting approval:', approvalData);
      const response = await submitGroupSubmissionApproval(approvalData);

      if (response.success) {
        console.log('Approval submitted successfully:', response.message);
        // Refresh the submissions list to reflect the updated status
        await loadPendingSubmissions();
        setShowApprovalModal(false);
        setSelectedSubmission(null);
        setApprovalComments("");
      } else {
        console.error('Approval failed:', response.message);
        alert('Failed to submit approval: ' + response.message);
      }
    } catch (error) {
      console.error('Error submitting approval:', error);
      alert('Failed to submit approval. Please try again.');
    } finally {
      setApprovalLoading(prev => ({ ...prev, [submissionId]: false }));
    }
  };

  // Open approval modal
  const openApprovalModal = (submission: GroupSubmission) => {
    setSelectedSubmission(submission);
    setApprovalComments("");
    setShowApprovalModal(true);
  };

  // Transform API data to match class table format
  const transformSubmissionsToClassData = (submissions: GroupSubmission[]) => {
    return submissions.map(submission => ({
      className: submission.groupName || 'Unknown Class',
      yearOfStudy: submission.groupCode || 'Unknown Year', // Using groupCode as year identifier
      students: 0, // This info isn't available in the API response, could be fetched separately
      submissionDate: submission.submittedToDeanAt ? new Date(submission.submittedToDeanAt).toLocaleDateString() : "Not submitted",
      deadline: "2024-12-20", // This should come from another API or be calculated
      status: submission.statusDisplayName || submission.status,
      statusColorCode: submission.statusColorCode || 'gray',
      statusIcon: submission.statusIcon || '',
      // Additional fields from API that might be useful
      id: submission.id,
      groupId: submission.groupId,
      workflowStageDescription: submission.workflowStageDescription || '',
      nextApproverRole: submission.nextApproverRole || '',
      canBeForwarded: submission.canBeForwarded || false,
      canBeEdited: submission.canBeEdited || false,
      submissionNotes: submission.submissionNotes || '',
      responsibleOfficeName: submission.responsibleOfficeName || '',
      // Include the full submission object for approval actions
      submission: submission
    }));
  };

  // Get transformed class data from API
  const apiClassData = React.useMemo(() => {
    return transformSubmissionsToClassData(pendingSubmissions);
  }, [pendingSubmissions]);

  // Class Table State - use API data only
  const [classPage, setClassPage] = React.useState(1);
  const [classSearch, setClassSearch] = React.useState("");
  const classPageSize = 4;

  // Use API data only
  const activeClassData = apiClassData;

  const classFilteredData = activeClassData.filter(
    (row) =>
      (row.className &&
        row.className.toLowerCase().includes(classSearch.toLowerCase())) ||
      (row.yearOfStudy &&
        row.yearOfStudy.toLowerCase().includes(classSearch.toLowerCase()))
  );
  const classTotalPages = Math.ceil(classFilteredData.length / classPageSize);
  const classPaginatedData = classFilteredData.slice(
    (classPage - 1) * classPageSize,
    classPage * classPageSize
  );

  // Additional year filter for academic years
  const [selectedYear, setSelectedYear] = React.useState("");

  return (
    <RegistrarLayout role="registrar-academics" title="Marks Submitted">
      <div className="p-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Marks Management
        </h1>
        <p className="text-gray-600 text-base mb-2">
          Review and approve marks submitted by Dean
        </p>
        <MarksHeaderTabs mainActiveTab={mainActiveTab} setMainActiveTab={setMainActiveTab} />

        {/* Mark Submissions Tab */}
        {mainActiveTab === "mark-submissions" && (
          <Card className="p-6 border border-gray-200">
            {/* Add submission status and refresh button */}
            {activeTab === "class" && (
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {pendingSubmissions.length > 0
                      ? `${pendingSubmissions.length} submission(s) pending review`
                      : "No pending submissions"
                    }
                  </span>
                  {pendingSubmissions.length > 0 && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                      {pendingSubmissions.filter(s => s.status === "PENDING_SCHOOL_APPROVAL").length} pending approval
                    </span>
                  )}
                </div>
                <button
                  onClick={loadPendingSubmissions}
                  disabled={isLoadingSubmissions}
                  className="flex items-center gap-2 px-3 py-2 bg-[#026892] text-white rounded-md text-sm hover:bg-[#026892]/90 disabled:opacity-50"
                >
                  <svg className={`w-4 h-4 ${isLoadingSubmissions ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
            )}

            <MarksSubTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* Table for Class Tab */}
            {activeTab === "class" && (
              <>
                {/* Show loading state */}
                {isLoadingSubmissions && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#026892]"></div>
                    <span className="ml-2 text-gray-600">Loading submissions...</span>
                  </div>
                )}

                {/* Show error state */}
                {submissionsError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Error loading submissions
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{submissionsError}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show table when data is loaded or show dummy data if no API data */}
                {!isLoadingSubmissions && (
                  <MarksClassSection
                    classData={classPaginatedData}
                    classPage={classPage}
                    setClassPage={setClassPage}
                    classTotalPages={classTotalPages}
                    classSearch={classSearch}
                    setClassSearch={(v: string) => { setClassSearch(v); setClassPage(1); }}
                    filters={filters}
                    onFiltersChange={updateFilters}
                    isFilterLoading={isFilterLoading}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    onApproval={openApprovalModal}
                    approvalLoading={approvalLoading}
                  />
                )}
              </>
            )}
          </Card>
        )}

        {/* Approval Modal */}
        {showApprovalModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Review Submission: {selectedSubmission.groupName}
              </h3>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  <p><strong>Group Code:</strong> {selectedSubmission.groupCode}</p>
                  <p><strong>Submitted:</strong> {new Date(selectedSubmission.submittedToDeanAt).toLocaleDateString()}</p>
                  <p><strong>Current Status:</strong> {selectedSubmission.statusDisplayName}</p>
                  {selectedSubmission.submissionNotes && (
                    <p><strong>Notes:</strong> {selectedSubmission.submissionNotes}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                  Comments (required)
                </label>
                <textarea
                  id="comments"
                  rows={3}
                  value={approvalComments}
                  onChange={(e) => setApprovalComments(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#026892] focus:border-transparent"
                  placeholder="Enter your review comments..."
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  disabled={approvalLoading[selectedSubmission.id]}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApproval(selectedSubmission, false, approvalComments)}
                  disabled={!approvalComments.trim() || approvalLoading[selectedSubmission.id]}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {approvalLoading[selectedSubmission.id] ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </div>
                  ) : (
                    'Reject'
                  )}
                </button>
                <button
                  onClick={() => handleApproval(selectedSubmission, true, approvalComments)}
                  disabled={!approvalComments.trim() || approvalLoading[selectedSubmission.id]}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {approvalLoading[selectedSubmission.id] ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </div>
                  ) : (
                    'Approve'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RegistrarLayout>
  );
}
