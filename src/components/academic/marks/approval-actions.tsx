"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Eye, Clock, Calendar, User, FileText, ArrowRight } from "lucide-react";

interface ApprovalActionsProps {
  submission: any;
  onApprove: (submission: any) => void;
  onReject: (submission: any) => void;
  onView: (submission: any) => void;
  isLoading?: boolean;
  loadingSubmissionId?: string | number | null;
}

export const ApprovalActions: React.FC<ApprovalActionsProps> = ({
  submission,
  onApprove,
  onReject,
  onView,
  isLoading = false,
  loadingSubmissionId,
}) => {
  const isProcessing = isLoading && loadingSubmissionId === submission.groupSubmissionId;

  const getStatusConfig = (colorCode: string) => {
    switch (colorCode) {
      case 'orange': 
        return { 
          bg: 'bg-gradient-to-r from-orange-50 to-orange-100', 
          text: 'text-orange-900', 
          border: 'border-orange-200',
          badge: 'bg-orange-100 text-orange-800 border-orange-300'
        };
      case 'green': 
        return { 
          bg: 'bg-gradient-to-r from-green-50 to-green-100', 
          text: 'text-green-900', 
          border: 'border-green-200',
          badge: 'bg-green-100 text-green-800 border-green-300'
        };
      case 'red': 
        return { 
          bg: 'bg-gradient-to-r from-red-50 to-red-100', 
          text: 'text-red-900', 
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-800 border-red-300'
        };
      case 'blue': 
        return { 
          bg: 'bg-gradient-to-r from-blue-50 to-blue-100', 
          text: 'text-blue-900', 
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-800 border-blue-300'
        };
      default: 
        return { 
          bg: 'bg-gradient-to-r from-gray-50 to-gray-100', 
          text: 'text-gray-900', 
          border: 'border-gray-200',
          badge: 'bg-gray-100 text-gray-800 border-gray-300'
        };
    }
  };

  const statusConfig = getStatusConfig(submission.statusColorCode);

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 border-2 ${statusConfig.border} ${statusConfig.bg} hover:scale-[1.02] transform`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          {/* Left Side - Submission Details */}
          <div className="flex-1 space-y-4">
            {/* Header with Title and Status */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className={`text-xl font-bold ${statusConfig.text} flex items-center gap-2`}>
                  <FileText className="h-5 w-5" />
                  {submission.groupName}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{submission.groupCode}</span>
                </div>
              </div>
              
              <Badge 
                variant="outline" 
                className={`${statusConfig.badge} border-2 font-semibold text-sm px-3 py-1 shadow-sm`}
              >
                <span className="mr-2 text-base">{submission.statusIcon}</span>
                {submission.statusDisplayName}
              </Badge>
            </div>

            {/* Submission Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/70 p-3 rounded-lg border border-gray-200">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Submitted</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(submission.submittedToDeanAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {submission.workflowStageDescription && (
                <div className="flex items-center gap-3 bg-white/70 p-3 rounded-lg border border-gray-200">
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Stage</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {submission.workflowStageDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Notes Preview */}
            {submission.submissionNotes && (
              <div className="bg-white/70 p-3 rounded-lg border border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Notes</p>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {submission.submissionNotes}
                </p>
              </div>
            )}
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex flex-col space-y-3 ml-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(submission)}
              disabled={isProcessing}
              className="group/btn bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Eye className="h-4 w-4 mr-2 group-hover/btn:text-blue-600 transition-colors" />
              <span className="font-medium">Review</span>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => onReject(submission)}
              disabled={isProcessing}
              className="group/btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md hover:shadow-lg transition-all duration-200 border-0"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                  <span className="font-semibold">Reject</span>
                </>
              )}
            </Button>

            <Button
              size="sm"
              onClick={() => onApprove(submission)}
              disabled={isProcessing}
              className="group/btn bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all duration-200 border-0"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                  <span className="font-semibold">Approve</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};