"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, MessageSquare, Users, FileText } from "lucide-react"
import { RegistrarLayout } from "@/components/registrar"

export default function AdmissionDashboard() {
    return (
        <RegistrarLayout role="registrar-admission" title="Admission Management">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Admission Management</h1>
                        <p className="text-muted-foreground">
                            Registrar Admission Officer Dashboard · Application Processing & Enrollment
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/registrar-admission/students">
                            <Button variant="outline">Add Student</Button>
                        </Link>
                        <Button className="text-white bg-[#026892] ">Process Applications</Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { label: "Total Applications", value: "2,341" },
                        { label: "Under Review", value: "456" },
                        { label: "Approved", value: "1,678" },
                        { label: "Enrolled", value: "1,234" },
                        { label: "Rejected", value: "207" },
                    ].map((stat, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <CardTitle className="text-lg">{stat.value}</CardTitle>
                                <CardDescription>{stat.label}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-6 lg:col-span-2">
                        {/* Application Pipeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Pipeline</CardTitle>
                                <CardDescription>Track the progress of applications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { stage: "Document Verification", count: 456, progress: 45 },
                                    { stage: "Academic Review", count: 234, progress: 30 },
                                    { stage: "Final Approval", count: 158, progress: 20 },
                                    { stage: "Enrollment Confirmation", count: 89, progress: 10 },
                                ].map((step, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span>{step.stage}</span>
                                            <span>{step.count} applications</span>
                                        </div>
                                        <Progress value={step.progress} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Program Capacity */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Program Capacity Status</CardTitle>
                                <CardDescription>Remaining seats per program</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { program: "Computer Science", remaining: 0 },
                                    { program: "Business Admin", remaining: 2 },
                                    { program: "Engineering", remaining: 33 },
                                    { program: "Medicine", remaining: 0 },
                                    { program: "Law", remaining: 12 },
                                    { program: "Arts & Sciences", remaining: 44 },
                                ].map((p, i) => (
                                    <div key={i} className="border rounded-lg p-3 flex justify-between items-center">
                                        <span>{p.program}</span>
                                        {p.remaining === 0 ? (
                                            <Badge variant="destructive">Full</Badge>
                                        ) : (
                                            <Badge variant={p.remaining < 5 ? "secondary" : "default"}>
                                                {p.remaining} remaining
                                            </Badge>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Priority Tasks */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Priority Tasks</CardTitle>
                                <CardDescription>Important actions needing attention</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>Urgent Reviews</span>
                                    <Badge variant="secondary">234</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Document Verification</span>
                                    <Badge variant="destructive">196</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Enrollment Confirmations</span>
                                    <Badge variant="default">89</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Communication Center */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Communication Center</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span>Messages Sent Today</span>
                                    <Badge>234</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Admission Letters Sent</span>
                                    <Badge variant="default">89</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Follow-ups Required</span>
                                    <Badge variant="secondary">45</Badge>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[
                                    { label: "Review Applications", icon: FileText, link: "/registrar-admission/review-applications" },
                                    { label: "Approve Admissions", icon: CheckCircle, link: "/registrar-admission/approve-admissions" },
                                    { label: "Send Communication", icon: MessageSquare, link: "/registrar-admission/communication" },
                                    { label: "Capacity Planning", icon: Users, link: "/registrar-admission/capacity-planning" },
                                    { label: "Students", icon: Users, link: "/registrar-admission/students" },
                                ].map((action, i) => (
                                    action.link ? (
                                        <Link href={action.link} key={i} passHref legacyBehavior>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start gap-2 hover:bg-[#026892]/10"
                                            >
                                                <action.icon className="h-4 w-4 text-[#026892]" />
                                                <span className="text-[#026892]">{action.label}</span>
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            key={i}
                                            variant="outline"
                                            className="w-full justify-start gap-2 hover:bg-[#026892]/10"
                                        >
                                            <action.icon className="h-4 w-4 text-[#026892]" />
                                            <span className="text-[#026892]">{action.label}</span>
                                        </Button>
                                    )
                                ))}
                            </CardContent>
                        </Card>
                        {/* Recent Activities */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activities</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>456 applications approved</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>Admission letters sent to 89 students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                                    <span>Document verification completed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-600" />
                                    <span>Capacity planning updated</span>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </RegistrarLayout>
    )
}
