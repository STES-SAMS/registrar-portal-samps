"use client";
import React, { useState } from "react";
import { ApprovalModal } from "./approval-modal";
import { ApprovalActions } from "./approval-actions";
import { submitGroupSubmissionApproval } from "@/lib/api-mark-submition";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

interface ApprovalComponentProps {
  submissions: any[];
  onSubmissionsUpdate: () => void;
}

export const ApprovalComponent: React.FC<ApprovalComponentProps> = ({
  submissions,
  onSubmissionsUpdate,
}) => {
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSubmissionId, setLoadingSubmissionId] = useState<string | number | null>(null);

  const handleApprove = (submission: any) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
    setComments("");
  };

  const handleReject = (submission: any) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
    setComments("");
  };

  const handleView = (submission: any) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
    setComments("");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
    setComments("");
    setIsLoading(false);
    setLoadingSubmissionId(null);
  };

  const processApproval = async (decision: 'approved' | 'rejected') => {
    if (!selectedSubmission || !comments.trim()) {
      toast({
        title: "Error",
        description: "Please provide comments for your decision.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setLoadingSubmissionId(selectedSubmission.groupSubmissionId);

    try {
      await submitGroupSubmissionApproval({
        submissionId: selectedSubmission.groupSubmissionId,
        approved: decision === 'approved',
        comments: comments.trim(),
      });

      toast({
        title: "Success",
        description: `Submission ${decision} successfully.`,
        variant: "default",
      });

      handleModalClose();
      onSubmissionsUpdate();
    } catch (error) {
      console.error(`Error ${decision === 'approved' ? 'approving' : 'rejecting'} submission:`, error);
      toast({
        title: "Error",
        description: `Failed to ${decision === 'approved' ? 'approve' : 'reject'} submission. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setLoadingSubmissionId(null);
    }
  };

  const handleApproveSubmission = () => processApproval('approved');
  const handleRejectSubmission = () => processApproval('rejected');

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
              <p className="text-gray-600 mt-1">
                Review and process {submissions.length} submission{submissions.length !== 1 ? 's' : ''} awaiting your approval
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-blue-200">
              <p className="text-sm text-gray-500 font-medium">Total Pending</p>
              <p className="text-3xl font-bold text-blue-600">{submissions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Grid */}
      <div className="space-y-6">
        {submissions.map((submission, index) => (
          <div key={submission.groupSubmissionId} className="relative">
            {/* Number badge */}
            <div className="absolute -left-4 top-6 z-10">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>
            </div>
            <ApprovalActions
              submission={submission}
              onApprove={handleApprove}
              onReject={handleReject}
              onView={handleView}
              isLoading={isLoading}
              loadingSubmissionId={loadingSubmissionId}
            />
          </div>
        ))}
      </div>

      {/* Approval Modal */}
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        submission={selectedSubmission}
        comments={comments}
        onCommentsChange={setComments}
        onApprove={handleApproveSubmission}
        onReject={handleRejectSubmission}
        isLoading={isLoading}
      />
    </div>
  );
};