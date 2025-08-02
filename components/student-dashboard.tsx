"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, TrendingUp, Target, Trophy } from "lucide-react"
import { ProgressChart } from "@/components/progress-chart"
import { AssessmentChart } from "@/components/assessment-chart"

// Mock data for demo
const mockProfile = {
  id: "1",
  name: "John Doe",
  student_id: "CS2021001",
  department: "Computer Science",
  year: 4,
  cgpa: 8.5,
  placement_status: "placed",
  skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "AWS"],
}

const mockCodingStats = [
  { platform: "leetcode", problems_solved: 450, contest_rating: 1650 },
  { platform: "codeforces", problems_solved: 280, contest_rating: 1420 },
  { platform: "codechef", problems_solved: 320, contest_rating: 1580 },
]

const mockAssessments = [
  {
    id: "1",
    title: "Data Structures & Algorithms Test 1",
    score: 85,
    total_marks: 100,
    rank: 2,
    completed_at: "2024-01-15",
  },
  {
    id: "2",
    title: "System Design Assessment",
    score: 78,
    total_marks: 100,
    rank: 3,
    completed_at: "2024-01-22",
  },
  {
    id: "3",
    title: "Programming Fundamentals",
    score: 92,
    total_marks: 100,
    rank: 1,
    completed_at: "2024-01-08",
  },
]

export function StudentDashboard() {
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

  const leetcodeStats = mockCodingStats.find((s) => s.platform === "leetcode")
  const codeforcesStats = mockCodingStats.find((s) => s.platform === "codeforces")
  const codechefStats = mockCodingStats.find((s) => s.platform === "codechef")

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {mockProfile.name}!</h1>
          <p className="text-muted-foreground">
            {mockProfile.student_id} • {mockProfile.department} • Year {mockProfile.year}
          </p>
        </div>
        {getStatusBadge(mockProfile.placement_status)}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CGPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProfile.cgpa}</div>
            <Progress value={(mockProfile.cgpa / 10) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LeetCode</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leetcodeStats?.problems_solved || 0}</div>
            <p className="text-xs text-muted-foreground">Problems solved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Codeforces</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{codeforcesStats?.contest_rating || 0}</div>
            <p className="text-xs text-muted-foreground">Contest rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CodeChef</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{codechefStats?.contest_rating || 0}</div>
            <p className="text-xs text-muted-foreground">Contest rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssessments.length}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Coding Progress</CardTitle>
                <CardDescription>Your problem-solving journey</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Your technical expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockProfile.skills?.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Problems solved over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Platform Stats</CardTitle>
                <CardDescription>Your coding platform statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCodingStats.map((stat) => (
                  <div key={stat.platform} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">{stat.platform}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.problems_solved} problems • Rating: {stat.contest_rating}
                      </p>
                    </div>
                    <Badge variant="outline">{stat.problems_solved}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance</CardTitle>
                <CardDescription>Your test scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <AssessmentChart />
              </CardContent>
            </Card>
            <div className="grid gap-4">
              {mockAssessments.map((assessment) => (
                <Card key={assessment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{assessment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Completed on {new Date(assessment.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {assessment.score}/{assessment.total_marks}
                        </div>
                        <p className="text-sm text-muted-foreground">Rank: {assessment.rank}</p>
                      </div>
                    </div>
                    <Progress value={(assessment.score / assessment.total_marks) * 100} className="mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
