// src/lib/api-auth.ts
// API utility for login and token management

export async function login({ usernameOrEmail, password }: { usernameOrEmail: string; password: string }) {
  console.log("Login request:", {
    url: "https://ursmartmonitoring.ur.ac.rw/api/v1/auth/login",
    payload: { usernameOrEmail, password }
  });
  try {
    const res = await fetch("https://ursmartmonitoring.ur.ac.rw/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    console.log("Login response status:", res.status);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Login failed response:", errorText);
      throw new Error("Login failed: " + errorText);
    }
    const data = await res.json();
    console.log("Login response data:", data);
    // Store accessToken in localStorage if present
    if (data?.data?.accessToken) {
      localStorage.setItem("accessToken", data.data.accessToken);
    }
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

export function getToken() {
  return localStorage.getItem("accessToken");
}
