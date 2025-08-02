"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/app/ClientLayout"
import { BookOpen, Calendar, Clock, Trophy, Search } from "lucide-react"
import { useState } from "react"

// Mock data for assessments
const mockAssessments = [
  {
    id: "1",
    title: "Data Structures & Algorithms Test 1",
    description: "Basic DSA concepts, arrays, linked lists, and sorting algorithms",
    type: "Technical",
    duration: 120,
    totalMarks: 100,
    date: "2024-01-15",
    status: "completed",
    score: 85,
    rank: 2,
    totalStudents: 45,
  },
  {
    id: "2",
    title: "System Design Assessment",
    description: "Design scalable systems and architecture patterns",
    type: "Technical",
    duration: 180,
    totalMarks: 100,
    date: "2024-01-22",
    status: "completed",
    score: 78,
    rank: 8,
    totalStudents: 42,
  },
  {
    id: "3",
    title: "Programming Fundamentals",
    description: "Core programming concepts and problem-solving",
    type: "Technical",
    duration: 90,
    totalMarks: 100,
    date: "2024-01-08",
    status: "completed",
    score: 92,
    rank: 1,
    totalStudents: 48,
  },
  {
    id: "4",
    title: "Aptitude & Reasoning Test",
    description: "Quantitative aptitude and logical reasoning",
    type: "Aptitude",
    duration: 60,
    totalMarks: 100,
    date: "2024-02-05",
    status: "upcoming",
    score: null,
    rank: null,
    totalStudents: 50,
  },
  {
    id: "5",
    title: "Mock Interview Round 1",
    description: "Technical interview simulation with coding questions",
    type: "Interview",
    duration: 45,
    totalMarks: 100,
    date: "2024-02-12",
    status: "upcoming",
    score: null,
    rank: null,
    totalStudents: 30,
  },
]

export default function AssessmentsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Upcoming</Badge>
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">In Progress</Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Technical":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Aptitude":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Interview":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredAssessments = mockAssessments.filter((assessment) => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assessment.status === statusFilter
    const matchesType = typeFilter === "all" || assessment.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const completedAssessments = mockAssessments.filter((a) => a.status === "completed")
  const averageScore =
    completedAssessments.length > 0
      ? Math.round(completedAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / completedAssessments.length)
      : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">Track your test performance and upcoming assessments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssessments.length}</div>
            <p className="text-xs text-muted-foreground">{completedAssessments.length} completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">Across {completedAssessments.length} tests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.min(...completedAssessments.map((a) => a.rank || Number.POSITIVE_INFINITY))}
            </div>
            <p className="text-xs text-muted-foreground">Highest achievement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssessments.filter((a) => a.status === "upcoming").length}</div>
            <p className="text-xs text-muted-foreground">Tests scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Aptitude">Aptitude</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assessments List */}
          <div className="grid gap-4">
            {filteredAssessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg">{assessment.title}</h3>
                        {getStatusBadge(assessment.status)}
                        <Badge className={getTypeColor(assessment.type)} variant="outline">
                          {assessment.type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{assessment.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(assessment.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {assessment.duration} mins
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          {assessment.totalMarks} marks
                        </div>
                      </div>
                      {assessment.status === "completed" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              Score: {assessment.score}/{assessment.totalMarks}
                            </span>
                            <span>
                              Rank: {assessment.rank}/{assessment.totalStudents}
                            </span>
                          </div>
                          <Progress value={(assessment.score! / assessment.totalMarks) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {assessment.status === "completed" ? (
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                      ) : (
                        <Button size="sm">{assessment.status === "upcoming" ? "Start Test" : "Continue"}</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {filteredAssessments
              .filter((a) => a.status === "completed")
              .map((assessment) => (
                <Card key={assessment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{assessment.title}</h3>
                          <Badge className={getTypeColor(assessment.type)} variant="outline">
                            {assessment.type}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            Score: {assessment.score}/{assessment.totalMarks}
                          </span>
                          <span>
                            Rank: {assessment.rank}/{assessment.totalStudents}
                          </span>
                        </div>
                        <Progress value={(assessment.score! / assessment.totalMarks) * 100} className="h-2" />
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {filteredAssessments
              .filter((a) => a.status === "upcoming")
              .map((assessment) => (
                <Card key={assessment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{assessment.title}</h3>
                          <Badge className={getTypeColor(assessment.type)} variant="outline">
                            {assessment.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{assessment.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(assessment.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {assessment.duration} mins
                          </div>
                        </div>
                      </div>
                      <Button size="sm">Start Test</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
