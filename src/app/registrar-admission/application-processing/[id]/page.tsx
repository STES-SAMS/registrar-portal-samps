"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { RegistrarLayout } from "@/components/registrar";

// Expanded mock data for demonstration (Rwandan names, locations, motives)
const applications = [
  { id: 'APP001', name: 'Jean Bosco Niyonzima', age: 19, sex: 'Male', parentName: 'Anastase Niyonzima', location: 'Kigali', secondarySchool: 'Groupe Scolaire Sainte Famille', marks: 89, program: 'Computer Science', gpa: '3.8', priority: 'High', status: 'New Applications', date: '2024-01-15', cv: 'jean_bosco_cv.pdf', motive: 'I am passionate about technology and want to contribute to Rwanda\'s digital transformation.' },
  { id: 'APP002', name: 'Aline Uwimana', age: 18, sex: 'Female', parentName: 'Marie Uwimana', location: 'Huye', secondarySchool: 'Ecole des Sciences de Huye', marks: 91, program: 'Engineering', gpa: '3.6', priority: 'Medium', status: 'Pending Documents', date: '2024-01-14', cv: 'aline_uwimana_cv.pdf', motive: 'I want to become an engineer to help build Rwanda\'s infrastructure and empower my community.' },
  { id: 'APP003', name: 'Eric Mugisha', age: 20, sex: 'Male', parentName: 'Joseph Mugisha', location: 'Musanze', secondarySchool: 'Groupe Scolaire Musanze', marks: 87, program: 'Business', gpa: '3.9', priority: 'High', status: 'Interview Scheduled', date: '2024-01-13', cv: 'eric_mugisha_cv.pdf', motive: 'My goal is to start a business that creates jobs for youth in Rwanda.' },
  { id: 'APP004', name: 'Clarisse Ingabire', age: 18, sex: 'Female', parentName: 'Bernadette Ingabire', location: 'Rubavu', secondarySchool: 'Ecole Secondaire Rubavu', marks: 92, program: 'Medicine', gpa: '3.7', priority: 'Low', status: 'Under Review', date: '2024-01-12', cv: 'clarisse_ingabire_cv.pdf', motive: 'I want to become a doctor to improve healthcare access in rural Rwanda.' },
  { id: 'APP005', name: 'Pacifique Habimana', age: 21, sex: 'Male', parentName: 'Celestin Habimana', location: 'Rwamagana', secondarySchool: 'Groupe Scolaire Rwamagana', marks: 85, program: 'Law', gpa: '3.5', priority: 'Medium', status: 'Decision Pending', date: '2024-01-11', cv: 'pacifique_habimana_cv.pdf', motive: 'I want to study law to promote justice and human rights in Rwanda.' },
  { id: 'APP006', name: 'Chantal Mukamana', age: 19, sex: 'Female', parentName: 'Beatrice Mukamana', location: 'Gicumbi', secondarySchool: 'Ecole Secondaire Gicumbi', marks: 88, program: 'Arts', gpa: '3.2', priority: 'Low', status: 'New Applications', date: '2024-01-10', cv: 'chantal_mukamana_cv.pdf', motive: 'Art inspires me to express Rwandan culture and history.' },
  { id: 'APP007', name: 'Emmanuel Nshimiyimana', age: 20, sex: 'Male', parentName: 'Jean Nshimiyimana', location: 'Nyagatare', secondarySchool: 'Groupe Scolaire Nyagatare', marks: 90, program: 'Commerce', gpa: '3.4', priority: 'High', status: 'Batch Processing', date: '2024-01-09', cv: 'emmanuel_nshimiyimana_cv.pdf', motive: 'I want to help Rwandan businesses grow and succeed.' },
  { id: 'APP008', name: 'Josiane Uwase', age: 18, sex: 'Female', parentName: 'Solange Uwase', location: 'Karongi', secondarySchool: 'Ecole Secondaire Karongi', marks: 86, program: 'Science', gpa: '3.6', priority: 'Medium', status: 'Pending Documents', date: '2024-01-08', cv: 'josiane_uwase_cv.pdf', motive: 'Science will help me solve real problems in Rwanda.' },
  { id: 'APP009', name: 'Patrick Nkurunziza', age: 19, sex: 'Male', parentName: 'Alphonse Nkurunziza', location: 'Rusizi', secondarySchool: 'Groupe Scolaire Rusizi', marks: 93, program: 'Engineering', gpa: '3.9', priority: 'High', status: 'Interview Scheduled', date: '2024-01-07', cv: 'patrick_nkurunziza_cv.pdf', motive: 'I want to design solutions for Rwanda\'s infrastructure.' },
  { id: 'APP010', name: 'Diane Umutoni', age: 18, sex: 'Female', parentName: 'Claudine Umutoni', location: 'Bugesera', secondarySchool: 'Ecole Secondaire Bugesera', marks: 90, program: 'Medicine', gpa: '3.8', priority: 'Low', status: 'Under Review', date: '2024-01-06', cv: 'diane_umutoni_cv.pdf', motive: 'I want to become a doctor to serve my community.' }
];

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const app = applications.find(a => a.id === params.id);

  if (!app) {
    return (
      <RegistrarLayout role="registrar-admission" title="Application Detail">
        <div className="p-8">
          <h1 className="text-xl font-bold mb-4">Application Not Found</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => router.back()}>
            Back
          </button>
        </div>
      </RegistrarLayout>
    );
  }

  return (
    <RegistrarLayout role="registrar-admission" title="Application Detail">
      <div className="p-8 max-w-2xl mx-auto bg-white rounded shadow">
        <button className="mb-4 px-4 py-2 bg-[#026892] text-white rounded" onClick={() => router.back()}>
          Back to Application Procssing
        </button>
        <h1 className="text-2xl font-bold mb-2">{app.name}</h1>
        <div className="text-gray-500 mb-4">Application ID: {app.id}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><strong>Age:</strong> {app.age}</div>
          <div><strong>Sex:</strong> {app.sex}</div>
          <div><strong>Parent Name:</strong> {app.parentName}</div>
          <div><strong>Location:</strong> {app.location}</div>
          <div><strong>Secondary School:</strong> {app.secondarySchool}</div>
          <div><strong>Marks Obtained:</strong> {app.marks}</div>
          <div><strong>Program Applied:</strong> {app.program}</div>
          <div><strong>GPA:</strong> {app.gpa}</div>
          <div><strong>Priority:</strong> {app.priority}</div>
          <div><strong>Status:</strong> {app.status}</div>
          <div><strong>Date Applied:</strong> {app.date}</div>
          <div><strong>CV:</strong> <a href={`/${app.cv}`} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Download</a></div>
        </div>
        <div className="mb-4 p-4 bg-white rounded">
          <strong>Why did you apply for this program?</strong>
          <p className="mt-2 text-gray-700">{app.motive}</p>
        </div>
      </div>
    </RegistrarLayout>
  );
}
