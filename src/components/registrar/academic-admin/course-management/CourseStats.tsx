"use client"

import React from "react"
import { Module } from "./types"

interface CourseStatsProps {
  modules: Module[]
}

export function CourseStats({ modules }: CourseStatsProps) {
  const totalCourses = modules.length
  const activeCourses = modules.filter(m => m.isActive).length
  const coreCourses = modules.filter(m => m.isCore).length
  const electiveCourses = modules.filter(m => m.isElective).length

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-[#026892]">{totalCourses}</div>
        <div className="text-sm text-gray-600">Total Courses</div>
      </div>
      <div className="bg-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-green-600">{activeCourses}</div>
        <div className="text-sm text-gray-600">Active Courses</div>
      </div>
      <div className="bg-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-blue-600">{coreCourses}</div>
        <div className="text-sm text-gray-600">Core Courses</div>
      </div>
      <div className="bg-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-purple-600">{electiveCourses}</div>
        <div className="text-sm text-gray-600">Elective Courses</div>
      </div>
    </div>
  )
}
