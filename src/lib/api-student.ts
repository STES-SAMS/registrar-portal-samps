// src/lib/api-student.ts
// API utility for student creation
import { getToken } from "./api-auth";

export async function createStudent(student: any) {
  // Try both token storage methods to ensure we get the token
  const token = getToken() || localStorage.getItem("token");
  
  console.log('Creating student with token:', token ? 'Present' : 'Missing');
  console.log('Token value:', token ? `${token.substring(0, 20)}...` : 'No token');
  console.log('Student data:', student);
  
  const res = await fetch("/api/students/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(student),
  });
  
  console.log('Student creation response status:', res.status);
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
    console.error('Student creation failed:', errorData);
    throw new Error(errorData.error || "Failed to create student");
  }
  
  const result = await res.json();
  console.log('Student creation successful:', result);
  return result;
}
