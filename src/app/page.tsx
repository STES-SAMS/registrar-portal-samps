"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "@/lib/api";
import { useAuth } from "@/appContext/authcontext";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log("Login request:", {
        usernameOrEmail: userName,
        password: password,
        url: "/auth/login",
        baseURL: axios.defaults.baseURL
      });
      
      // Use the Next.js API route which will handle the external API call server-side
      console.log("Using Next.js API route for login...");
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          usernameOrEmail: userName,
          password: password
        })
      });
      
      console.log("API route response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API route error:", errorData);
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      console.log("API route response data:", responseData);
      
      // Extract user and token from response.data
      const { data } = responseData;
      const user = data?.user;
      const token = data?.accessToken;
      const refreshToken = data?.refreshToken;
      const permissions = data?.permissions;
      const roles = data?.roles;
      
      console.log("Extracted data:", { user, token, refreshToken, permissions, roles });
      
      if (user && token) {
        // Store token in both locations for compatibility
        localStorage.setItem("accessToken", token);
        localStorage.setItem("token", token);
        
        // Pass token to login so context and localStorage are always in sync
        login(user, token, refreshToken, permissions, roles);
        router.push("/registrar");
      } else {
        console.error("Missing user or token:", { user: !!user, token: !!token });
        setError("Login failed. Invalid response from server.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      console.error("Error response:", err?.response);
      console.error("Error data:", err?.response?.data);
      console.error("Error status:", err?.response?.status);
      console.error("Request URL:", err?.config?.url);
      console.error("Request method:", err?.config?.method);
      console.error("Request headers:", err?.config?.headers);
      
      // Check if it's a 403 error
      if (err?.response?.status === 403) {
        console.error("403 Forbidden - This could be:");
        console.error("1. CORS issue");
        console.error("2. Missing authentication");
        console.error("3. Server blocking the request");
        setError("Access forbidden. The server is blocking this request. Please contact system administrator.");
      } else if (!err?.response) {
        setError("Network error. Please check your connection and try again.");
      } else {
        // Use the server's error message if available
        const serverMessage = err?.response?.data?.message || err?.response?.data?.error || err?.message;
        setError(serverMessage || "Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-green-50 relative">
      <div className="flex flex-col items-center absolute top-12 left-0 right-0 mx-auto">
        <div className="w-20 h-20 mb-2 flex items-center justify-center bg-white rounded-full shadow mx-auto">
          <Image
            width={64}
            height={64}
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-[#026892]">SAMPS UR</h1>
        <p className="text-sm text-gray-600">Student Academic Management Platform</p>
        <p className="text-xs text-gray-400">University of Rwanda</p>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mt-40">
        <h2 className="text-xl font-bold mb-2 text-center text-black">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Sign in to access your registrar portal</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Username or Email</label>
            <input
              type="text"
              placeholder="Enter your username or email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="absolute right-3 top-2 text-gray-400 cursor-pointer">
                <Eye />
              </span>
            </div>
            <span className="text-xs text-gray-400">Password provided during registration.</span>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>
          <button type="submit" className="w-full py-2 bg-[#026892] text-white font-semibold rounded shadow hover:bg-[#035a6d] transition" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          <span>Need help?</span>
          <div className="flex justify-center gap-4 mt-1">
            <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
            <a href="#" className="text-blue-600 hover:underline">Help Center</a>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-xs text-gray-400 text-center">
        &copy; 2025 University of Rwanda. All rights reserved.<br />
        Secure student portal powered by SAMPS UR
      </footer>
    </main>
  );
}
