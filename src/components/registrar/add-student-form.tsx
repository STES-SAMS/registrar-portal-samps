import React, { useState } from "react";
import { roles, getRoleByName } from "../../lib/roles";
import { createStudent } from "../../lib/api-student";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddStudentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStudentForm({ isOpen, onClose }: AddStudentFormProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input name="middleName" value={form.middleName} onChange={handleChange} placeholder="Middle Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="STUDENT_NUMBER">Student Number</Label>
            <Input name="STUDENT_NUMBER" value={form.attributes.STUDENT_NUMBER} onChange={handleChange} placeholder="Student Number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1 bg-[#026892] hover:bg-[#0284c7]">
              {loading ? "Creating..." : "Create Student"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
