"use client"
import React from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { RegistrarLayout } from "@/components/registrar";

const capacityData = [
  {
    program: "Computer Science",
    current: 756,
    capacity: 800,
    utilization: 94.5
  },
  {
    program: "Engineering",
    current: 834,
    capacity: 1000,
    utilization: 83.4
  },
  {
    program: "Business",
    current: 967,
    capacity: 1200,
    utilization: 80.6
  },
  {
    program: "Medicine",
    current: 478,
    capacity: 500,
    utilization: 95.6
  },
  {
    program: "Arts & Sciences",
    current: 1212,
    capacity: 1500,
    utilization: 80.8
  }
];

const CapacityPlanningPage: React.FC = () => {
  // Recommendations logic
  const recommendations: string[] = [];
  capacityData.forEach(row => {
    if (row.utilization >= 90) {
      recommendations.push(`${row.program} is at critical capacity. Consider expanding capacity or limiting new admissions.`);
    } else if (row.utilization >= 80) {
      recommendations.push(`${row.program} is approaching high utilization. Monitor closely and plan for future growth.`);
    } else {
      recommendations.push(`${row.program} is within safe capacity limits.`);
    }
  });
  // Summary values based on screenshot
  const totalCapacity = 5000;
  const currentEnrollment = 4247;
  const projectedGrowth = 8.5;
  const availableSpots = 753;
  const percentUtilized = ((currentEnrollment / totalCapacity) * 100).toFixed(1);

  // Projections
  const projections = [
    { label: "Next Semester", value: 4456, description: "Projected enrollment" },
    { label: "Next Academic Year", value: 4608, description: "Projected enrollment" },
    { label: "5-Year Projection", value: 5234, description: "Capacity expansion needed" }
  ];

  // Status helpers
  const getStatus = (utilization: number) => {
    if (utilization >= 90) return { label: "Critical", color: "bg-red-100 text-red-700", bar: "bg-red-500" };
    if (utilization >= 80) return { label: "Good", color: "bg-yellow-100 text-yellow-700", bar: "bg-yellow-400" };
    return { label: "Good", color: "bg-green-100 text-green-700", bar: "bg-green-500" };
  };

  return (
    <RegistrarLayout role="registrar-admission" title="Capacity Planning">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-9xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Capacity Planning</h1>
          <p className="text-gray-600 mb-8">Monitor and plan institutional capacity</p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col items-start">
              <div className="text-sm text-gray-500 mb-1">Total Capacity</div>
              <div className="text-2xl font-bold text-gray-900">{totalCapacity.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-1">Maximum students</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col items-start">
              <div className="text-sm text-gray-500 mb-1">Current Enrollment</div>
              <div className="text-2xl font-bold text-gray-900">{currentEnrollment.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-1">{percentUtilized}% utilized</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col items-start">
              <div className="text-sm text-gray-500 mb-1">Projected Growth</div>
              <div className="text-2xl font-bold text-gray-900">+{projectedGrowth}%</div>
              <div className="text-xs text-gray-400 mt-1">Next academic year</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col items-start">
              <div className="text-sm text-gray-500 mb-1">Available Spots</div>
              <div className="text-2xl font-bold text-gray-900">{availableSpots.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-1">Remaining capacity</div>
            </div>
          </div>

          {/* Capacity by Department */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-lg font-bold mb-6">Capacity by Department</h2>
            <div className="space-y-6">
              {capacityData.map((row, idx) => {
                const status = getStatus(row.utilization);
                return (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                    <div>
                      <div className="font-semibold text-gray-900">{row.program}</div>
                      <div className="text-sm text-gray-500">{row.current} / {row.capacity} students</div>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <div className="flex items-center mr-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div className={`${status.bar} h-2 rounded-full`} style={{ width: `${row.utilization}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{row.utilization}%</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>{status.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capacity Projections */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-lg font-bold mb-6">Capacity Projections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projections.map((proj, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6 text-center border">
                  <div className="text-2xl font-bold text-blue-700 mb-2">{proj.value.toLocaleString()}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{proj.label}</div>
                  <div className="text-xs text-gray-500">{proj.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, idx) => {
                const isCritical = rec.includes('critical capacity');
                const isApproaching = rec.includes('approaching high utilization');
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 rounded-lg p-4 border ${isCritical ? 'border-red-200 bg-red-50' : isApproaching ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}`}
                  >
                    <span className={`mt-1`}>{isCritical ? <AlertTriangle className="w-6 h-6 text-red-500" /> : isApproaching ? <Info className="w-6 h-6 text-yellow-500" /> : <CheckCircle2 className="w-6 h-6 text-green-500" />}</span>
                    <span className="text-gray-800 text-sm leading-relaxed">{rec}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </RegistrarLayout>
  );
};

export default CapacityPlanningPage;
