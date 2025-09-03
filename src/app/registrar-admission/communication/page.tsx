"use client"

import React, { useState } from 'react';
import { Send, Mail, MessageSquare, Eye, Calendar } from 'lucide-react';
import { RegistrarLayout } from '@/components/registrar';

// Example programs and students data
const programs = [
    "Computer Science",
    "Engineering", 
    "Business Administration",
    "Medicine",
    "Arts & Sciences"
];

const students = [
    { id: "120001", name: "Niyonzima Eric" },
    { id: "120002", name: "Uwimana Alice" },
    { id: "120003", name: "Mugisha Jean Paul" },
    { id: "120004", name: "Mukamana Chantal" },
    { id: "120005", name: "Habimana Claude" },
    { id: "130001", name: "Maniraguha Yves" },
    { id: "130002", name: "Mukandayisenga Clarisse" },
    { id: "140001", name: "Munyaneza Pascal" },
    { id: "150001", name: "Ndayisaba Emmanuel" },
    { id: "160001", name: "Munyakazi Jean Bosco" }
];

const RegistrarAdmissionCommunications = () => {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const messageTemplates = [
        { id: 1, name: 'Application Status Update', content: 'Dear applicant, your application status has been updated...' },
        { id: 2, name: 'Interview Invitation', content: 'You are invited for an interview...' },
        { id: 3, name: 'Document Submission Reminder', content: 'Please submit the required documents...' },
        { id: 4, name: 'Admission Decision', content: 'We are pleased to inform you...' }
    ];

    const recentMessages = [
        {
            id: 1,
            title: 'Application Status Update',
            recipients: 45,
            date: '2024-01-15',
            status: 'Sent'
        },
        {
            id: 2,
            title: 'Interview Invitation',
            recipients: 23,
            date: '2024-01-14',
            status: 'Delivered'
        },
        {
            id: 3,
            title: 'Document Submission Reminder',
            recipients: 67,
            date: '2024-01-13',
            status: 'Sent'
        },
        {
            id: 4,
            title: 'Admission Decision',
            recipients: 89,
            date: '2024-01-12',
            status: 'Delivered'
        }
    ];

    const handleTemplateSelect = (template: { name: string; content: string }) => {
        setSelectedTemplate(template.name);
        setMessage(template.content);
        setSubject(template.name);
    };

    const handleSendMessage = () => {
        // Handle message sending logic
        console.log('Sending message:', { recipients, subject, message });
        // Reset form
        setRecipients('');
        setSubject('');
        setMessage('');
        setSelectedTemplate('');
    };

    const handleStudentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
        setSelectedStudents(options);
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would send the message to the backend
        alert(`Message sent to ${selectedProgram ? selectedProgram : "selected students"}`);
        setSubject("");
        setMessage("");
        setSelectedProgram("");
        setSelectedStudents([]);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Sent':
                return 'text-blue-600';
            case 'Delivered':
                return 'text-green-600';
            case 'Pending':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    // Mock communication data for the existing communications section
    const communicationData = [
        {
            id: 1,
            subject: "Welcome to the Admission Process",
            message: "Welcome to our university admission process. We're excited to have you as a potential student.",
            sender: "Admissions Office",
            date: "2024-01-15"
        },
        {
            id: 2,
            subject: "Document Verification Complete",
            message: "Your submitted documents have been verified successfully.",
            sender: "Document Verification Team",
            date: "2024-01-14"
        },
        {
            id: 3,
            subject: "Interview Schedule",
            message: "Your interview has been scheduled for next week.",
            sender: "Interview Committee",
            date: "2024-01-13"
        }
    ];

    return (
        <RegistrarLayout role="registrar-admission" title="Communication">
            <div className="mx-auto bg-white ">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Messages Sent</h3>
                            <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">1,247</div>
                        <p className="text-sm text-gray-500 mt-1">This month</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Open Rate</h3>
                            <Eye className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">87.3%</div>
                        <p className="text-sm text-gray-500 mt-1">Above average</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Response Rate</h3>
                            <MessageSquare className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">64.2%</div>
                        <p className="text-sm text-gray-500 mt-1">Good engagement</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                            <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">23</div>
                        <p className="text-sm text-gray-500 mt-1">Awaiting response</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Compose Message Section */}
                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Compose Message</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Program (optional)</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={selectedProgram}
                                    onChange={e => setSelectedProgram(e.target.value)}
                                >
                                    <option value="">-- Select Program --</option>
                                    {programs.map(prog => (
                                        <option key={prog} value={prog}>{prog}</option>
                                    ))}
                                </select>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Message subject..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    placeholder="Type your message here..."
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    className="bg-[#026892] text-white px-6 py-2 rounded-lg hover:bg-[#025b7f] transition-colors flex items-center"
                                    onClick={handleSend}
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Messages Section */}
                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {recentMessages.map((msg) => (
                                <div key={msg.id} className="p-4 hover:bg-white transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 truncate">{msg.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {msg.recipients} recipients • {msg.date}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <span className={`text-sm font-medium ${getStatusColor(msg.status)}`}>
                                                {msg.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Templates Section */}
                <div className="mt-8 bg-white rounded-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Message Templates</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {messageTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
                                    onClick={() => handleTemplateSelect(template)}
                                >
                                    <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
                                    <button className="text-blue-600 text-sm mt-2 hover:text-blue-800">
                                        Use Template
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Existing Communications Section */}
                <div className="mt-8 bg-white rounded-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Communication History</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {communicationData.map((comm) => (
                            <div key={comm.id} className="p-4 hover:bg-white transition-colors">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-[#026892]">{comm.subject}</span>
                                    <span className="text-xs text-gray-500">{comm.date}</span>
                                </div>
                                <div className="text-sm text-gray-700 mb-1">{comm.message}</div>
                                <div className="text-xs text-gray-400">From: {comm.sender}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </RegistrarLayout>
    );
};

// Mock communication data
const communicationData = [
    {
        id: 1,
        subject: "Welcome to the Admission Process",
        message: "Welcome to our university admission process. We're excited to have you as a potential student.",
        sender: "Admissions Office",
        date: "2024-01-15"
    },
    {
        id: 2,
        subject: "Document Verification Complete",
        message: "Your submitted documents have been verified successfully.",
        sender: "Document Verification Team",
        date: "2024-01-14"
    },
    {
        id: 3,
        subject: "Interview Schedule",
        message: "Your interview has been scheduled for next week.",
        sender: "Interview Committee",
        date: "2024-01-13"
    }
];

export default RegistrarAdmissionCommunications;