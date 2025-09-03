"use client"
import React from "react";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

export default function NotifyPage() {
    const searchParams = useSearchParams();
    const applicant = searchParams.get("applicant") || "";
    const [open, setOpen] = React.useState(true);

    // Close dialog and go back
    const handleClose = () => {
        setOpen(false);
        window.history.back();
    };

    return (
        <Dialog open={open} onOpenChange={val => { if (!val) handleClose(); }}>
            <DialogContent showCloseButton>
                <DialogHeader>
                    <DialogTitle>Notify Applicants</DialogTitle>
                    <DialogDescription>Send notifications to applicants about their admission decisions.</DialogDescription>
                </DialogHeader>
                <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleClose(); }}>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="applicant">Applicant Name or ID</label>
                        <input type="text" id="applicant" className="w-full border rounded px-3 py-2 bg-white" value={applicant} readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="decision">Decision</label>
                        <select id="decision" className="w-full border rounded px-3 py-2">
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Waitlisted">Waitlisted</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                        <textarea id="message" className="w-full border rounded px-3 py-2" rows={4} placeholder="Type your notification message here..." />
                    </div>
                    <button type="submit" className="bg-[#026892] text-white px-6 py-2 rounded hover:bg-[#025b7f] cursor-pointer">Send Notification</button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
