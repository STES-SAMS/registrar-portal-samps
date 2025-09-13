// src/lib/roles.ts
// Utility to store all roles for easy access

export const roles = [
  {
    id: "92ef6953-7130-4b14-931d-3615f113df6c",
    name: "SUPERADMIN",
    displayName: "Super Administrator",
    description: "Super Administrator with full system access",
    isActive: true,
    isSystemRole: true,
    priority: 1
  },
  {
    id: "bb18300a-df89-4cd2-ba77-f5f55d9f7cfa",
    name: "SYSTEM_ADMIN",
    displayName: "System Administrator",
    description: "System Administrator with technical access",
    isActive: true,
    isSystemRole: true,
    priority: 2
  },
  {
    id: "ec923038-624e-4934-a0e3-a8372193d3f8",
    name: "CHANCELLOR",
    displayName: "Chancellor",
    description: "University Chancellor - highest executive authority",
    isActive: true,
    isSystemRole: false,
    priority: 10
  },
  // ...add all other roles here (truncated for brevity)...
  {
    id: "f7ed2606-19bd-4191-a3d8-138da095d237",
    name: "REGISTRAR",
    displayName: "Registrar",
    description: "Registrar - chief academic administrative officer",
    isActive: true,
    isSystemRole: false,
    priority: 40
  },
  {
    id: "d4d5c4c1-d9d7-4642-8d41-972f6159ac0b",
    name: "STUDENT",
    displayName: "Student",
    description: "Student - enrolled in academic programs",
    isActive: true,
    isSystemRole: false,
    priority: 61
  }
];

export const getRoleByName = (name: string) => roles.find(r => r.name === name);
export const getRoleById = (id: string) => roles.find(r => r.id === id);
