"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/app/ClientLayout"
import { Code, Target, TrendingUp, Award, BookOpen, Trophy } from "lucide-react"
import { ProgressChart } from "@/components/progress-chart"
import { AssessmentChart } from "@/components/assessment-chart"

// Mock data for progress tracking
const mockProgressData = {
  codingStats: {
    leetcode: {
      totalSolved: 450,
      easy: 180,
      medium: 220,
      hard: 50,
      contestRating: 1650,
      globalRank: 25000,
      weeklyGoal: 20,
      weeklyProgress: 15,
    },
    codeforces: {
      totalSolved: 280,
      contestRating: 1420,
      globalRank: 45000,
      maxRating: 1580,
      contests: 25,
    },
    codechef: {
      totalSolved: 320,
      contestRating: 1580,
      globalRank: 35000,
      maxRating: 1720,
      contests: 18,
      longChallenges: 12,
      cookOffs: 8,
    },
    github: {
      totalRepos: 15,
      contributions: 245,
      streak: 12,
      languages: ["JavaScript", "Python", "Java", "TypeScript"],
    },
  },
  skillProgress: [
    { skill: "Data Structures", progress: 85, level: "Advanced" },
    { skill: "Algorithms", progress: 78, level: "Intermediate" },
    { skill: "System Design", progress: 65, level: "Intermediate" },
    { skill: "Database Design", progress: 72, level: "Intermediate" },
    { skill: "Web Development", progress: 90, level: "Advanced" },
    { skill: "Machine Learning", progress: 45, level: "Beginner" },
  ],
  monthlyGoals: [
    { goal: "Solve 100 LeetCode problems", progress: 75, target: 100, current: 75 },
    { goal: "Complete System Design course", progress: 60, target: 100, current: 60 },
    { goal: "Build 2 projects", progress: 50, target: 2, current: 1 },
    { goal: "Participate in 4 contests", progress: 75, target: 4, current: 3 },
    { goal: "Improve CodeChef rating to 1600+", progress: 90, target: 1600, current: 1580 },
  ],
  achievements: [
    { title: "LeetCode 400+ Problems", date: "2024-01-15", type: "coding" },
    { title: "Contest Rating 1600+", date: "2024-01-20", type: "contest" },
    { title: "GitHub 200+ Contributions", date: "2024-01-10", type: "github" },
    { title: "Top 10 in DSA Assessment", date: "2024-01-22", type: "assessment" },
    { title: "CodeChef 3-Star Rating", date: "2024-01-25", type: "codechef" },
  ],
}

export default function ProgressPage() {
  const { user } = useAuth()

  const getSkillLevel = (progress: number) => {
    if (progress >= 80) return { level: "Advanced", color: "bg-green-500" }
    if (progress >= 60) return { level: "Intermediate", color: "bg-yellow-500" }
    return { level: "Beginner", color: "bg-red-500" }
  }

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "coding":
        return <Code className="h-4 w-4" />
      case "contest":
        return <Target className="h-4 w-4" />
      case "github":
        return <BookOpen className="h-4 w-4" />
      case "assessment":
        return <Award className="h-4 w-4" />
      case "codechef":
        return <Trophy className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your coding journey and skill development</p>
        </div>
      </div>

      {/* Coding Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LeetCode Solved</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgressData.codingStats.leetcode.totalSolved}</div>
            <p className="text-xs text-muted-foreground">
              Rating: {mockProgressData.codingStats.leetcode.contestRating}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Codeforces Rating</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgressData.codingStats.codeforces.contestRating}</div>
            <p className="text-xs text-muted-foreground">Max: {mockProgressData.codingStats.codeforces.maxRating}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CodeChef Rating</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgressData.codingStats.codechef.contestRating}</div>
            <p className="text-xs text-muted-foreground">Max: {mockProgressData.codingStats.codechef.maxRating}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GitHub Contributions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgressData.codingStats.github.contributions}</div>
            <p className="text-xs text-muted-foreground">{mockProgressData.codingStats.github.streak} day streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProgressData.codingStats.leetcode.weeklyProgress}/{mockProgressData.codingStats.leetcode.weeklyGoal}
            </div>
            <Progress
              value={
                (mockProgressData.codingStats.leetcode.weeklyProgress /
                  mockProgressData.codingStats.leetcode.weeklyGoal) *
                100
              }
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Coding Progress</CardTitle>
                <CardDescription>Problems solved over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance</CardTitle>
                <CardDescription>Test scores trend</CardDescription>
              </CardHeader>
              <CardContent>
                <AssessmentChart />
              </CardContent>
            </Card>
          </div>

          {/* Platform Breakdown */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>LeetCode Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Easy</span>
                    <span>{mockProgressData.codingStats.leetcode.easy}</span>
                  </div>
                  <Progress
                    value={
                      (mockProgressData.codingStats.leetcode.easy / mockProgressData.codingStats.leetcode.totalSolved) *
                      100
                    }
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Medium</span>
                    <span>{mockProgressData.codingStats.leetcode.medium}</span>
                  </div>
                  <Progress
                    value={
                      (mockProgressData.codingStats.leetcode.medium /
                        mockProgressData.codingStats.leetcode.totalSolved) *
                      100
                    }
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hard</span>
                    <span>{mockProgressData.codingStats.leetcode.hard}</span>
                  </div>
                  <Progress
                    value={
                      (mockProgressData.codingStats.leetcode.hard / mockProgressData.codingStats.leetcode.totalSolved) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CodeChef Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{mockProgressData.codingStats.codechef.totalSolved}</div>
                    <p className="text-sm text-muted-foreground">Problems</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{mockProgressData.codingStats.codechef.contests}</div>
                    <p className="text-sm text-muted-foreground">Contests</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Long Challenges</span>
                    <span>{mockProgressData.codingStats.codechef.longChallenges}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cook-Offs</span>
                    <span>{mockProgressData.codingStats.codechef.cookOffs}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GitHub Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{mockProgressData.codingStats.github.totalRepos}</div>
                    <p className="text-sm text-muted-foreground">Repositories</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{mockProgressData.codingStats.github.streak}</div>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Top Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {mockProgressData.codingStats.github.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4">
            {mockProgressData.skillProgress.map((skill, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{skill.skill}</h3>
                    <Badge variant="outline" className={getSkillLevel(skill.progress).color}>
                      {skill.level}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4">
            {mockProgressData.monthlyGoals.map((goal, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{goal.goal}</h3>
                      <Badge variant={goal.progress >= 100 ? "default" : "secondary"}>
                        {goal.progress >= 100 ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        Progress: {goal.current}/{goal.target}
                      </span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4">
            {mockProgressData.achievements.map((achievement, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                      {getAchievementIcon(achievement.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Achieved on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Award className="h-5 w-5 text-yellow-600" />
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
