import React, { useEffect } from "react";

// Utility functions
const URUtils = {
  formatDate(dateString?: string | null) {
    if (!dateString) return "Pending";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  },
  generateReportId() {
    return `UR-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9)}`;
  },
  validateRegNumber(regNumber: string) {
    const pattern = /^\d{9}$/;
    return pattern.test(regNumber);
  },
};

// Main results data
const results = {
  year: 2023,
  programme: "BSc (Hons) in ENERGY ENGINEERING",
  department: "MECHANICAL AND ENERGY ENGINEERING",
  retakers: {
    year3: {
      female: 1,
      male: 4,
      total: 5,
      passed: 5,
      failed: 0,
      absconded: 0,
    },
    year2: {
      female: 0,
      male: 1,
      total: 1,
      passed: 1,
      failed: 0,
      absconded: 0,
    },
  },
  approvals: [
    { board: "DEPARTMENT COUNCIL", date: "2024-06-14" },
    { board: "SCHOOL COUNCIL", date: "2024-06-25" },
    { board: "COLLEGE ACADEMIC COUNCIL", date: null },
  ],
  signatures: [
    {
      name: "Dr. MUNYAZIKWIYE B. Bernard",
      title: "HEAD OF THE DEPARTMENT",
    },
    {
      name: "Assoc.Prof. Leopold MBEREYAHO",
      title: "DEAN OF SCHOOL OF ENGINEERING",
    },
  ],
};

function calculateTotalStats() {
  const year3 = results.retakers.year3;
  const year2 = results.retakers.year2;
  const totalStudents = year3.total + year2.total;
  const totalPassed = year3.passed + year2.passed;
  const totalFailed = year3.failed + year2.failed;
  const totalAbsconded = year3.absconded + year2.absconded;
  const passRate = totalStudents > 0 ? ((totalPassed / totalStudents) * 100).toFixed(1) : "0";
  return { totalStudents, totalPassed, totalFailed, totalAbsconded, passRate };
}

function generateSummary() {
  const stats = calculateTotalStats();
  return {
    programme: results.programme,
    year: results.year,
    department: results.department,
    statistics: stats,
    performance: {
      excellent: Number(stats.passRate) >= 90,
      good: Number(stats.passRate) >= 75 && Number(stats.passRate) < 90,
      satisfactory: Number(stats.passRate) >= 60 && Number(stats.passRate) < 75,
      needsImprovement: Number(stats.passRate) < 60,
    },
  };
}

function validateApprovals() {
  const approvals = results.approvals;
  const validation = {
    departmentApproved: !!approvals[0].date,
    schoolApproved: !!approvals[1].date,
    collegeApproved: !!approvals[2].date,
    fullyApproved: false,
  };
  validation.fullyApproved = validation.departmentApproved && validation.schoolApproved && validation.collegeApproved;
  return validation;
}

export default function URResultsHandler() {
  const summary = generateSummary();
  const approvals = validateApprovals();

  useEffect(() => {
    // Optionally, add hover effects or print logic here
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#fff'}}>
      <div style={{ borderBottom: '2px solid #0077b6', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/logo.png" alt="UR Logo" style={{ height: 48 }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0077b6', margin: 0 }}>
            COLLEGE OF SCIENCE AND TECHNOLOGY
          </h1>
        </div>
      </div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontWeight: 700 }}>SCHOOL OF ENGINEERING</div>
        <div>DEPARTMENT OF MECHANICAL AND ENERGY ENGINEERING</div>
        <div>PROGRAMME: BSc (Hons) in ENERGY ENGINEERING</div>
        <div>PROVISIONAL EXAMINATION RESULTS: ACADEMIC YEAR 2023</div>
        <div style={{ fontWeight: 700 }}>YEAR 4 RETAKING FAILED MODULES</div>
      </div>
      <div style={{ margin: '24px 0 8px 0', fontWeight: 700 }}>A. YEAR 4 RETAKING FAILED MODULES</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #222', background: '#eee', padding: 4 }}></th>
              <th colSpan={3} style={{ border: '1px solid #222', background: '#eee', padding: 4 }}>YEAR 3</th>
              <th colSpan={3} style={{ border: '1px solid #222', background: '#eee', padding: 4 }}>YEAR 2</th>
            </tr>
            <tr>
              <th style={{ border: '1px solid #222', background: '#eee', padding: 4 }}></th>
              <th style={{ border: '1px solid #222', background: '#eee', padding: 4 }}>F</th>
              <th style={{ border: '1px solid #222', background: '#eee', padding: 4 }}>M</th>
              <th style={{ border: '1px solid #222', background: '#eee', padding: 4 }}>TOT</th>
              <th style={{ border: '1px solid #222', background: '#eee', padding: 4 }}>F</th>
              <th style={{ border: '1px solid #222', background: '#eee', padding: 4 }}>M</th>
              <th style={{ border: '1px solid #222', background: '#eee', padding: 4 }}>TOT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #222', padding: 4 }}>TOTAL NUMBER OF STUDENTS</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.female}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.male}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.total}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.female}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.male}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.total}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #222', padding: 4 }}>Total number of students who passed</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.passed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.passed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.passed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.passed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.passed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.passed}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #222', padding: 4 }}>Total number of students who failed</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.failed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.failed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.failed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.failed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.failed}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.failed}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #222', padding: 4 }}>Total number of students absconded</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.absconded}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.absconded}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year3.absconded}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.absconded}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.absconded}</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>{results.retakers.year2.absconded}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ margin: '32px 0 8px 0', fontWeight: 700 }}>APPROVAL DETAILS</div>
      <div style={{ maxWidth: 400 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #222', background: '#e6f3d7', padding: 4 }}>BOARD</th>
              <th style={{ border: '1px solid #222', background: '#e6f3d7', padding: 4 }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #222', padding: 4 }}>DEPARTMENT COUNCIL</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>14-Jun-24</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #222', padding: 4 }}>SCHOOL COUNCIL</td>
              <td style={{ border: '1px solid #222', padding: 4 }}>25-Jun-24</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #222', padding: 4 }}>COLLEGE ACADEMIC COUNCIL</td>
              <td style={{ border: '1px solid #222', padding: 4 }}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        <div>
          <div style={{ fontWeight: 700 }}>SIGNED:</div>
          <div style={{ marginTop: 16 }}>
            Dr. MUNYAZIKWIYE B. Bernard<br />
            <span style={{ fontWeight: 400 }}>HEAD OF THE DEPARTMENT</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: 16 }}>
          <div style={{ fontWeight: 700 }}>&nbsp;</div>
          <div>
            Assoc.Prof. Leopold MBEREYAHO<br />
            <span style={{ fontWeight: 400 }}>DEAN OF SCHOOL OF ENGINEERING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
