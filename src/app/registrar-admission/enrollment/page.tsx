"use client"
import React from 'react';
import { TrendingUp, Users, Target, Building } from 'lucide-react';
import { RegistrarLayout } from '@/components/registrar';

const EnrollmentDashboard = () => {
  const statsData = [
    {
      title: "Total Enrolled",
      value: "2,847",
      subtitle: "+12% from last year",
      icon: Users,
      trend: "up"
    },
    {
      title: "New Enrollments",
      value: "456",
      subtitle: "This semester",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Enrollment Rate",
      value: "87.3%",
      subtitle: "Above target",
      icon: Target,
      trend: "up"
    },
    {
      title: "Capacity",
      value: "3,200",
      subtitle: "Maximum capacity",
      icon: Building,
      trend: "neutral"
    }
  ];

  const programData = [
    {
      name: "Computer Science",
      enrolled: 456,
      capacity: 500,
      percentage: 91.2,
      level: "High"
    },
    {
      name: "Engineering",
      enrolled: 389,
      capacity: 450,
      percentage: 86.4,
      level: "Medium"
    },
    {
      name: "Business Administration",
      enrolled: 567,
      capacity: 600,
      percentage: 94.5,
      level: "High"
    },
    {
      name: "Medicine",
      enrolled: 234,
      capacity: 250,
      percentage: 93.6,
      level: "High"
    },
    {
      name: "Arts & Sciences",
      enrolled: 345,
      capacity: 400,
      percentage: 86.3,
      level: "Medium"
    }
  ];

  // Mock student data for each program
  const studentData: Record<string, string[]> = {
    "Computer Science": Array.from({ length: 42 }, (_, i) => `CS Student ${i + 1}`),
    "Engineering": Array.from({ length: 35 }, (_, i) => `Eng Student ${i + 1}`),
    "Business Administration": Array.from({ length: 50 }, (_, i) => `BA Student ${i + 1}`),
    "Medicine": Array.from({ length: 20 }, (_, i) => `Med Student ${i + 1}`),
    "Arts & Sciences": Array.from({ length: 30 }, (_, i) => `AS Student ${i + 1}`),
  };

  const [selectedProgram, setSelectedProgram] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const handleOpenModal = (programName: string) => {
    setSelectedProgram(programName);
    setPage(1);
  };
  const handleCloseModal = () => {
    setSelectedProgram(null);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-white text-gray-800';
    }
  };

  const getProgressColor = (percentage?: number) => {
    if (percentage && percentage >= 90) return 'bg-[#026892]';
    if (percentage && percentage >= 80) return 'bg-[#0284c7]';
    return 'bg-blue-400';
  };

  return (
    <RegistrarLayout role="registrar-admission" title="Enrollment Management">
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-9xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Enrollment Management</h1>
            <p className="text-gray-600">Track and manage student enrollment</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <IconComponent className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                    </div>
                    {stat.trend === 'up' && (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enrollment by Program */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Enrollment by Program</h2>

            <div className="space-y-6">
              {programData.map((program, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{program.name}</h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-gray-900">{program.percentage}%</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                          {program.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3 h-3">
                      <p className="text-sm text-gray-500">
                        {program.enrolled} / {program.capacity} students
                      </p>
                      <a
                        className="ml-4 px-3 py-1 bg-[#026892] text-white rounded text-xs hover:bg-[#026892] cursor-pointer"
                        href={`enrollment/students/${encodeURIComponent(program.name)}?page=1`}
                      >
                        View Students
                      </a>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(program.percentage)}`}
                        style={{ width: `${program.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </RegistrarLayout>
  );
};

export default EnrollmentDashboard;