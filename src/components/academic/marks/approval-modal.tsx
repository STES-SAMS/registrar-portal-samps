"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Clock, FileText, User, Calendar, Building, ArrowRight, MessageSquare, AlertTriangle } from "lucide-react";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: any;
  comments: string;
  onCommentsChange: (comments: string) => void;
  onApprove: () => void;
  onReject: () => void;
  isLoading: boolean;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  submission,
  comments,
  onCommentsChange,
  onApprove,
  onReject,
  isLoading,
}) => {
  if (!submission) return null;

  const getStatusConfig = (colorCode: string) => {
    switch (colorCode) {
      case 'orange': 
        return { 
          gradient: 'bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200',
          text: 'text-orange-900', 
          badge: 'bg-orange-500 text-white shadow-lg'
        };
      case 'green': 
        return { 
          gradient: 'bg-gradient-to-br from-green-50 via-green-100 to-green-200',
          text: 'text-green-900', 
          badge: 'bg-green-500 text-white shadow-lg'
        };
      case 'red': 
        return { 
          gradient: 'bg-gradient-to-br from-red-50 via-red-100 to-red-200',
          text: 'text-red-900', 
          badge: 'bg-red-500 text-white shadow-lg'
        };
      case 'blue': 
        return { 
          gradient: 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200',
          text: 'text-blue-900', 
          badge: 'bg-blue-500 text-white shadow-lg'
        };
      default: 
        return { 
          gradient: 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200',
          text: 'text-gray-900', 
          badge: 'bg-gray-500 text-white shadow-lg'
        };
    }
  };

  const statusConfig = getStatusConfig(submission.statusColorCode);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50">
        <DialogHeader className="space-y-4 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  Review Submission
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-1">
                  Carefully review the submission details before making your decision
                </DialogDescription>
              </div>
            </div>
            <Badge className={`${statusConfig.badge} text-sm px-4 py-2 font-bold`}>
              <span className="mr-2 text-lg">{submission.statusIcon}</span>
              {submission.statusDisplayName}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Main Submission Card */}
          <Card className={`border-2 shadow-xl ${statusConfig.gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
            <div className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/90 rounded-2xl shadow-md">
                      <Building className="h-8 w-8 text-gray-700" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${statusConfig.text}`}>
                        {submission.groupName}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2 text-lg font-semibold">
                        <User className="h-5 w-5" />
                        {submission.groupCode}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 bg-white/90 p-4 rounded-2xl shadow-md border border-white/50">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Submitted Date</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {new Date(submission.submittedToDeanAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {submission.workflowStageDescription && (
                    <div className="flex items-center gap-4 bg-white/90 p-4 rounded-2xl shadow-md border border-white/50">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <ArrowRight className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Current Stage</p>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                          {submission.workflowStageDescription}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submission Notes */}
                {submission.submissionNotes && (
                  <div className="bg-white/90 p-6 rounded-2xl shadow-md border border-white/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-yellow-600" />
                      </div>
                      <p className="text-lg font-bold text-gray-900">Submission Notes</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-l-4 border-yellow-400">
                      <p className="text-gray-800 leading-relaxed">{submission.submissionNotes}</p>
                    </div>
                  </div>
                )}

                {/* Responsible Office */}
                {submission.responsibleOfficeName && (
                  <div className="bg-white/90 p-4 rounded-2xl shadow-md border border-white/50 flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Building className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Responsible Office</p>
                      <p className="text-lg font-bold text-gray-900">{submission.responsibleOfficeName}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-white to-gray-50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Review Comments *
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Please provide detailed comments for your decision (required)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your detailed review comments here... Be specific about your decision reasoning."
                value={comments}
                onChange={(e) => onCommentsChange(e.target.value)}
                rows={5}
                className="resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 border-2 text-lg p-4 rounded-xl bg-white shadow-inner"
              />
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500">
                  {comments.length} characters entered
                </p>
                <p className="text-xs text-red-500 font-medium">
                  * Comments are required for all decisions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="space-x-4 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 font-semibold rounded-xl"
          >
            Cancel
          </Button>
          
          <Button
            variant="destructive"
            onClick={onReject}
            disabled={!comments.trim() || isLoading}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Rejecting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <XCircle className="h-5 w-5" />
                <span>Reject Submission</span>
              </div>
            )}
          </Button>

          <Button
            onClick={onApprove}
            disabled={!comments.trim() || isLoading}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Approving...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5" />
                <span>Approve Submission</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};