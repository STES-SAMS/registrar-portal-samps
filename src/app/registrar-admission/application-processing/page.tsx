"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, RotateCcw, X } from 'lucide-react';
import { RegistrarLayout } from '@/components/registrar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const statusTabs = [
    { key: 'new', label: 'New Applications' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'pending_docs', label: 'Pending Documents' },
    { key: 'interview', label: 'Interview Scheduled' },
    { key: 'decision', label: 'Decision Pending' },
];

const ApplicationProcessing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('new');
    const [selected, setSelected] = useState<string[]>([]);
    const [applications, setApplications] = useState([
        { id: 'APP001', name: 'Jean Bosco Niyonzima', location: 'Kigali', program: 'Computer Science', gpa: '3.8', priority: 'High', status: 'New Applications', date: '2024-01-15', priorityColor: 'bg-red-100 text-red-800', statusColor: 'bg-blue-100 text-blue-800' },
        { id: 'APP002', name: 'Aline Uwimana', location: 'Huye', program: 'Engineering', gpa: '3.6', priority: 'Medium', status: 'Pending Documents', date: '2024-01-14', priorityColor: 'bg-yellow-100 text-yellow-800', statusColor: 'bg-orange-100 text-orange-800' },
        { id: 'APP003', name: 'Eric Mugisha', location: 'Musanze', program: 'Business', gpa: '3.9', priority: 'High', status: 'Interview Scheduled', date: '2024-01-13', priorityColor: 'bg-red-100 text-red-800', statusColor: 'bg-purple-100 text-purple-800' },
        { id: 'APP004', name: 'Clarisse Ingabire', location: 'Rubavu', program: 'Medicine', gpa: '3.7', priority: 'Low', status: 'Under Review', date: '2024-01-12', priorityColor: 'bg-green-100 text-green-800', statusColor: 'bg-blue-100 text-blue-800' },
        { id: 'APP005', name: 'Pacifique Habimana', location: 'Rwamagana', program: 'Law', gpa: '3.5', priority: 'Medium', status: 'Decision Pending', date: '2024-01-11', priorityColor: 'bg-yellow-100 text-yellow-800', statusColor: 'bg-gray-100 text-gray-800' },
        { id: 'APP006', name: 'Chantal Mukamana', location: 'Gicumbi', program: 'Arts', gpa: '3.2', priority: 'Low', status: 'New Applications', date: '2024-01-10', priorityColor: 'bg-green-100 text-green-800', statusColor: 'bg-blue-100 text-blue-800' },
        { id: 'APP007', name: 'Emmanuel Nshimiyimana', location: 'Nyagatare', program: 'Commerce', gpa: '3.4', priority: 'High', status: 'Batch Processing', date: '2024-01-09', priorityColor: 'bg-red-100 text-red-800', statusColor: 'bg-indigo-100 text-indigo-800' },
        { id: 'APP008', name: 'Josiane Uwase', location: 'Karongi', program: 'Science', gpa: '3.6', priority: 'Medium', status: 'Pending Documents', date: '2024-01-08', priorityColor: 'bg-yellow-100 text-yellow-800', statusColor: 'bg-orange-100 text-orange-800' },
        { id: 'APP009', name: 'Patrick Nkurunziza', location: 'Rusizi', program: 'Engineering', gpa: '3.9', priority: 'High', status: 'Interview Scheduled', date: '2024-01-07', priorityColor: 'bg-red-100 text-red-800', statusColor: 'bg-purple-100 text-purple-800' },
        { id: 'APP010', name: 'Diane Umutoni', location: 'Bugesera', program: 'Medicine', gpa: '3.8', priority: 'Low', status: 'Under Review', date: '2024-01-06', priorityColor: 'bg-green-100 text-green-800', statusColor: 'bg-blue-100 text-blue-800' }
    ]);

    const filteredApplications = applications.filter(app =>
        (activeTab === 'new' ? app.status === 'New Applications' :
            activeTab === 'under_review' ? app.status === 'Under Review' :
                activeTab === 'pending_docs' ? app.status === 'Pending Documents' :
                    activeTab === 'interview' ? app.status === 'Interview Scheduled' :
                        activeTab === 'decision' ? app.status === 'Decision Pending' : true)
        && (
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.program.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <RegistrarLayout role="registrar-admission" title="Application Processing">
            <div className="bg-white ">
                <div className=" mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Processing</h1>
                        <p className="text-gray-600">Review and process student applications</p>
                    </div>

                    {/* Tabs for Application Statuses */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 bg-white">
                        <TabsList className="bg-white">
                            {statusTabs.map(tab => (
                                <TabsTrigger key={tab.key} value={tab.key}>
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    {/* Advanced Search and Filter Bar */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search by name, ID, or program..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                            <Filter className="h-4 w-4" />
                            <span>Advanced Filter</span>
                        </button>
                    </div>

                    {/* Application Analytics Section */}
                    <div className="mb-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex gap-8 justify-between">
                            <div>
                                <div className="text-sm text-gray-500">Total Applications</div>
                                <div className="text-2xl font-bold">{applications.length}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Batch Processing</div>
                                <button
                                    className="px-4 py-2 bg-[#026892] text-white rounded"
                                    disabled={selected.length === 0}
                                    onClick={() => {
                                        setApplications(apps =>
                                            apps.map(app =>
                                                selected.includes(app.id)
                                                    ? { ...app, status: 'Batch Processing' }
                                                    : app
                                            )
                                        );
                                        setSelected([]);
                                    }}
                                >
                                    Process Selected ({selected.length})
                                </button>
                            </div>
                            {/* Add more analytics/metrics here as needed */}
                        </div>
                    </div>

                    {/* Applications Section (filtered by tab/status) */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">{statusTabs.find(t => t.key === activeTab)?.label}</h2>
                            <span className="text-sm text-gray-500">{filteredApplications.length} found</span>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {filteredApplications.map((application) => (
                                <div key={application.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(application.id)}
                                                onChange={e => {
                                                    setSelected(sel =>
                                                        e.target.checked
                                                            ? [...sel, application.id]
                                                            : sel.filter(id => id !== application.id)
                                                    );
                                                }}
                                            />
                                            <div>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <h3 className="font-medium text-gray-900">{application.name}</h3>
                                                    <span className="text-sm text-gray-500">{application.id}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>{application.program}</span>
                                                    <span>•</span>
                                                    <span>GPA: {application.gpa}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {/* Priority Badge */}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${application.priorityColor}`}>
                                                {application.priority}
                                            </span>
                                            {/* Status Badge */}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${application.statusColor}`}>
                                                {application.status}
                                            </span>
                                            {/* Date */}
                                            <span className="text-sm text-gray-500 min-w-[80px]">
                                                {application.date}
                                            </span>
                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-1">
                                                <Link href={`/registrar-admission/application-processing/${application.id}`} passHref legacyBehavior>
                                                    <button
                                                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                        title="View Application"
                                                    >
                                                        <Eye className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                    title="Refresh Status"
                                                >
                                                    <RotateCcw className="h-4 w-4 text-gray-600" />
                                                </button>
                                                <button
                                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                    title="Remove from List"
                                                >
                                                    <X className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredApplications.length === 0 && (
                            <div className="p-8 text-center">
                                <p className="text-gray-500">No applications found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </RegistrarLayout>
    );
};

export default ApplicationProcessing;