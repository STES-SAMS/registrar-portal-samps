"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStudent } from "@/lib/api-student";
import { RegistrarLayout } from "@/components/registrar";

interface AddStudentFormProps {
    isOpen: boolean;
    onClose: () => void;
}

function AddStudentForm({ isOpen, onClose }: AddStudentFormProps) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        phoneNumber: "",
        userType: "STUDENT",
        password: "",
        roleIds: ["d4d5c4c1-d9d7-4642-8d41-972f6159ac0b"], // STUDENT role ID
        attributes: { STUDENT_NUMBER: "" },
        sendWelcomeEmail: false,
        requirePasswordChange: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "STUDENT_NUMBER") {
            setForm(f => ({ ...f, attributes: { STUDENT_NUMBER: value } }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await createStudent(form);
            setSuccess("Student created successfully!");
            setForm({
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                middleName: "",
                phoneNumber: "",
                userType: "STUDENT",
                password: "",
                roleIds: ["d4d5c4c1-d9d7-4642-8d41-972f6159ac0b"], // STUDENT role ID
                attributes: { STUDENT_NUMBER: "" },
                sendWelcomeEmail: false,
                requirePasswordChange: false,
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegistrarLayout role="registrar" title="Add Student">
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border mb-8">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Fill in the information below to create a new student account
                            </p>
                        </div>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="px-6 py-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information Section */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                                First Name *
                                            </Label>
                                            <Input
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                                placeholder="Enter first name"
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="middleName" className="text-sm font-medium text-gray-700">
                                                Middle Name
                                            </Label>
                                            <Input
                                                name="middleName"
                                                value={form.middleName}
                                                onChange={handleChange}
                                                placeholder="Enter middle name"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                                Last Name *
                                            </Label>
                                            <Input
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                placeholder="Enter last name"
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Account Information Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Account Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                                                Username *
                                            </Label>
                                            <Input
                                                name="username"
                                                value={form.username}
                                                onChange={handleChange}
                                                placeholder="Enter username"
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                                Password *
                                            </Label>
                                            <Input
                                                name="password"
                                                type="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="Enter password"
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                Email Address *
                                            </Label>
                                            <Input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="Enter email address"
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="STUDENT_NUMBER" className="text-sm font-medium text-gray-700">
                                                Student Number *
                                            </Label>
                                            <Input
                                                name="STUDENT_NUMBER"
                                                value={form.attributes.STUDENT_NUMBER}
                                                onChange={handleChange}
                                                placeholder="Enter student number"
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                                Phone Number *
                                            </Label>
                                            <Input
                                                name="phoneNumber"
                                                value={form.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                required
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Status Messages */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                        <div className="text-red-800 text-sm font-medium">{error}</div>
                                    </div>
                                )}
                                {success && (
                                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                                        <div className="text-green-800 text-sm font-medium">{success}</div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={onClose}
                                            className="w-full sm:w-auto px-8 py-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full sm:w-auto px-8 py-2 bg-[#026892] hover:bg-[#0284c7] text-white font-medium"
                                        >
                                            {loading ? "Creating Student..." : "Create Student"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </RegistrarLayout>
    );
}

export default function AddStudentPage() {
    return <AddStudentForm isOpen={true} onClose={() => {}} />;
}