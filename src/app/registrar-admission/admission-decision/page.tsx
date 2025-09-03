"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Send, Bell, User, ChevronDown } from 'lucide-react';
import { RegistrarLayout } from '@/components/registrar';

const AdmissionDecisions = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        { label: 'Accepted', value: '1,234', color: 'text-green-600' },
        { label: 'Rejected', value: '567', color: 'text-red-600' },
        { label: 'Waitlisted', value: '89', color: 'text-yellow-600' },
        { label: 'Pending', value: '234', color: 'text-blue-600' },
    ];

    const recentDecisions = [
        {
            id: 'DEC001',
            name: 'John Doe',
            program: 'Computer Science',
            decision: 'Accepted',
            status: 'Notified',
            date: '2024-01-15',
            decisionColor: 'bg-green-100 text-green-800',
            statusColor: 'bg-blue-100 text-blue-800'
        },
        {
            id: 'DEC002',
            name: 'Jane Smith',
            program: 'Engineering',
            decision: 'Waitlisted',
            status: 'Pending',
            date: '2024-01-14',
            decisionColor: 'bg-yellow-100 text-yellow-800',
            statusColor: 'bg-white text-gray-800'
        },
        {
            id: 'DEC003',
            name: 'Bob Johnson',
            program: 'Business',
            decision: 'Accepted',
            status: 'Notified',
            date: '2024-01-13',
            decisionColor: 'bg-green-100 text-green-800',
            statusColor: 'bg-blue-100 text-blue-800'
        },
        {
            id: 'DEC004',
            name: 'Alice Brown',
            program: 'Medicine',
            decision: 'Rejected',
            status: 'Pending',
            date: '2024-01-12',
            decisionColor: 'bg-red-100 text-red-800',
            statusColor: 'bg-white text-gray-800'
        },
    ];

    const filteredDecisions = recentDecisions.filter(decision =>
        decision.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        decision.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        decision.program.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <RegistrarLayout role="registrar-admission" title="Admission Decisions">
        <div className="bg-white p-6">
            <div className="max-w-9xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Admission Decisions</h1>
                    <p className="text-gray-600">Make and communicate admission decisions</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Decisions Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Decisions</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {filteredDecisions.map((decision) => (
                            <div key={decision.id} className="p-4 hover:bg-white transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="font-medium text-gray-900">{decision.name}</h3>
                                            <span className="text-sm text-gray-500">{decision.id}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span>• {decision.program}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Decision Badge */}
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${decision.decisionColor}`}>
                                            {decision.decision}
                                        </span>
                                        {/* Status Badge */}
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${decision.statusColor}`}>
                                            {decision.status}
                                        </span>
                                        {/* Date */}
                                        <span className="text-sm text-gray-500 min-w-[80px]">
                                            {decision.date}
                                        </span>
                                        {/* Send Button - navigates to notify page */}
                                        <Link href={`/registrar-admission/admission-decision/notify?applicant=${encodeURIComponent(decision.id)}`} passHref legacyBehavior>
                                            <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Send Notification">
                                                <Send className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredDecisions.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-gray-500">No decisions found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
            </RegistrarLayout >
    );
};

export default AdmissionDecisions;