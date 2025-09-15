"use client"
import React from "react";
import { RegistrarLayout } from "@/components/registrar";


interface Student {
  id: string;
  name: string;
}

interface StudentListPageProps {
  params: Promise<{ program: string }>;
  searchParams?: Promise<{ page?: string }>;
}

const studentData: Record<string, Student[]> = {
  "Computer Science": [
    { id: "120001", name: "Niyonzima Eric" },
    { id: "120002", name: "Uwimana Alice" },
    { id: "120003", name: "Mugisha Jean Paul" },
    { id: "120004", name: "Mukamana Chantal" },
    { id: "120005", name: "Habimana Claude" },
    { id: "120006", name: "Nshimiyimana Patrick" },
    { id: "120007", name: "Irakoze Ange" },
    { id: "120008", name: "Uwera Diane" },
    { id: "120009", name: "Twizeyimana Samuel" },
    { id: "120010", name: "Nkurunziza Josiane" },
    { id: "120011", name: "Munyaneza Jean Claude" },
    { id: "120012", name: "Mukeshimana Solange" },
    { id: "120013", name: "Nkurikiyinka Jean Pierre" },
    { id: "120014", name: "Uwase Liliane" },
    { id: "120015", name: "Niyomugabo Jean Baptiste" },
    { id: "120016", name: "Ndayisaba Emmanuel" },
    { id: "120017", name: "Mukamana Aline" },
    { id: "120018", name: "Niyonzima Jean Claude" },
    { id: "120019", name: "Uwizeye Carine" },
    { id: "120020", name: "Habineza Jean Paul" },
  ],
  "Engineering": [
    { id: "130001", name: "Maniraguha Yves" },
    { id: "130002", name: "Mukandayisenga Clarisse" },
    { id: "130003", name: "Nsengiyumva Jean Claude" },
    { id: "130004", name: "Niyitegeka Sandrine" },
    { id: "130005", name: "Hategekimana Eric" },
    { id: "130006", name: "Munyakazi Jean Bosco" },
    { id: "130007", name: "Mukandayisenga Alice" },
    { id: "130008", name: "Niyitegeka Eric" },
    { id: "130009", name: "Uwimana Chantal" },
    { id: "130010", name: "Nkurunziza Patrick" },
  ],
  "Business Administration": [
    { id: "140001", name: "Munyaneza Pascal" },
    { id: "140002", name: "Mukeshimana Solange" },
    { id: "140003", name: "Nkurikiyinka Jean Pierre" },
    { id: "140004", name: "Uwase Liliane" },
    { id: "140005", name: "Niyomugabo Jean Baptiste" },
    { id: "140006", name: "Ndayisaba Emmanuel" },
    { id: "140007", name: "Mukamana Aline" },
    { id: "140008", name: "Niyonzima Jean Claude" },
    { id: "140009", name: "Uwizeye Carine" },
    { id: "140010", name: "Habineza Jean Paul" },
  ],
  "Medicine": [
    { id: "150001", name: "Ndayisaba Emmanuel" },
    { id: "150002", name: "Mukamana Aline" },
    { id: "150003", name: "Niyonzima Jean Claude" },
    { id: "150004", name: "Uwizeye Carine" },
    { id: "150005", name: "Habineza Jean Paul" },
    { id: "150006", name: "Munyaneza Jean Claude" },
    { id: "150007", name: "Mukeshimana Solange" },
    { id: "150008", name: "Nkurikiyinka Jean Pierre" },
    { id: "150009", name: "Uwase Liliane" },
    { id: "150010", name: "Niyomugabo Jean Baptiste" },
  ],
  "Arts & Sciences": [
    { id: "160001", name: "Munyakazi Jean Bosco" },
    { id: "160002", name: "Mukandayisenga Alice" },
    { id: "160003", name: "Niyitegeka Eric" },
    { id: "160004", name: "Uwimana Chantal" },
    { id: "160005", name: "Nkurunziza Patrick" },
    { id: "160006", name: "Maniraguha Yves" },
    { id: "160007", name: "Mukandayisenga Clarisse" },
    { id: "160008", name: "Nsengiyumva Jean Claude" },
    { id: "160009", name: "Niyitegeka Sandrine" },
    { id: "160010", name: "Hategekimana Eric" },
  ],
};

const pageSize = 10;

const StudentListPage: React.FC<StudentListPageProps> = async ({ params, searchParams }) => {
  const { program } = await params;
  const searchParamsResolved = await searchParams;
  const programDecoded = decodeURIComponent(program);
  const page = parseInt(searchParamsResolved?.page || "1", 10);
  const students = studentData[programDecoded] || [];
  const totalPages = Math.ceil(students.length / pageSize);
  const paginatedStudents = students.slice((page - 1) * pageSize, page * pageSize);

  return (
    <RegistrarLayout role="registrar-admission" title={`${programDecoded} - Students`}>
      <div className="min-h-screen bg-white p-6">
        <div className="mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{programDecoded} - Students</h2>
            <a
              href="/registrar-admission/enrollment"
              className="text-red-500 hover:text-red-700 text-2xl font-bold ml-2"
              title="Close"
            >
              &times;
            </a>
          </div>
          <ul className="mb-4  overflow-y-auto">
            {paginatedStudents.map((student, idx) => (
              <li key={idx} className="py-2 border-b last:border-b-0 text-gray-800 flex justify-between">
                <span>{student.name}</span>
                <span className="text-gray-500 text-xs">ID: {student.id}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <a
              className={`px-3 py-1 bg-gray-200 rounded ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}
              href={`?page=${page - 1}`}
            >
              Previous
            </a>
            <span className="text-sm">Page {page} of {totalPages}</span>
            <a
              className={`px-3 py-1 bg-gray-200 rounded ${page >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
              href={`?page=${page + 1}`}
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </RegistrarLayout>
  );
};

export default StudentListPage;
