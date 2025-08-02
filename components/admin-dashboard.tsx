"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, GraduationCap, TrendingUp, Users, Search } from "lucide-react"
import { PlacementChart } from "@/components/placement-chart"
import { DepartmentChart } from "@/components/department-chart"
import { useState } from "react"

// Mock data for demo
const mockStats = {
  totalStudents: 150,
  placedStudents: 85,
  inProcessStudents: 25,
  averagePackage: 8.5,
}

const mockStudents = [
  {
    id: "1",
    name: "John Doe",
    student_id: "CS2021001",
    department: "Computer Science",
    year: 4,
    cgpa: 8.5,
    placement_status: "placed",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    codechef_username: "johndoe_cc",
  },
  {
    id: "2",
    name: "Jane Smith",
    student_id: "CS2021002",
    department: "Computer Science",
    year: 4,
    cgpa: 9.2,
    placement_status: "in_process",
    skills: ["Java", "Spring Boot", "MySQL", "AWS"],
    codechef_username: "janesmith_cc",
  },
  {
    id: "3",
    name: "Alex Johnson",
    student_id: "IT2021003",
    department: "Information Technology",
    year: 3,
    cgpa: 7.8,
    placement_status: "not_placed",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    codechef_username: "alexjohnson_cc",
  },
]

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "placed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Placed</Badge>
      case "in_process":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">In Process</Badge>
        )
      default:
        return <Badge variant="secondary">Not Placed</Badge>
    }
  }

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter
    const matchesStatus = statusFilter === "all" || student.placement_status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.placedStudents}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockStats.placedStudents / mockStats.totalStudents) * 100)}% placement rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Process</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.inProcessStudents}</div>
            <p className="text-xs text-muted-foreground">Interview ongoing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Package</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockStats.averagePackage}L</div>
            <p className="text-xs text-muted-foreground">Per annum</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Placement Trends</CardTitle>
                <CardDescription>Monthly placement statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <PlacementChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Students by department</CardDescription>
              </CardHeader>
              <CardContent>
                <DepartmentChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="placed">Placed</SelectItem>
                <SelectItem value="in_process">In Process</SelectItem>
                <SelectItem value="not_placed">Not Placed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Students List */}
          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{student.name}</h3>
                        {getStatusBadge(student.placement_status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {student.student_id} • {student.department} • Year {student.year}
                      </p>
                      <p className="text-sm">CGPA: {student.cgpa}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {student.skills?.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {student.skills?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <PlacementChart />
            <DepartmentChart />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
