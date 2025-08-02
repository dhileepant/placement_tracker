"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/app/ClientLayout"
import { Building2, Calendar, CheckCircle, Clock, MapPin, DollarSign, Users, Briefcase } from "lucide-react"

// Mock data for placement status
const mockPlacementData = {
  status: "placed", // placed, in_process, not_placed
  currentOffer: {
    company: "TechCorp Solutions",
    position: "Software Engineer",
    package: 12.5,
    location: "Bangalore, India",
    offerDate: "2024-02-01",
    joiningDate: "2024-07-15",
    type: "Full-time",
  },
  interviewHistory: [
    {
      id: "1",
      company: "TechCorp Solutions",
      position: "Software Engineer",
      status: "selected",
      stages: [
        { name: "Online Test", status: "completed", date: "2024-01-10", score: "85%" },
        { name: "Technical Round 1", status: "completed", date: "2024-01-15", feedback: "Good problem-solving skills" },
        {
          name: "Technical Round 2",
          status: "completed",
          date: "2024-01-18",
          feedback: "Excellent system design knowledge",
        },
        { name: "HR Round", status: "completed", date: "2024-01-22", feedback: "Great cultural fit" },
        { name: "Offer", status: "completed", date: "2024-02-01", feedback: "Congratulations!" },
      ],
    },
    {
      id: "2",
      company: "DataFlow Inc",
      position: "Backend Developer",
      status: "rejected",
      stages: [
        { name: "Online Test", status: "completed", date: "2024-01-05", score: "78%" },
        {
          name: "Technical Round 1",
          status: "completed",
          date: "2024-01-08",
          feedback: "Need improvement in algorithms",
        },
        {
          name: "Technical Round 2",
          status: "rejected",
          date: "2024-01-12",
          feedback: "Insufficient experience with microservices",
        },
      ],
    },
    {
      id: "3",
      company: "CloudTech Systems",
      position: "Full Stack Developer",
      status: "in_progress",
      stages: [
        { name: "Online Test", status: "completed", date: "2024-01-20", score: "92%" },
        { name: "Technical Round 1", status: "completed", date: "2024-01-25", feedback: "Excellent coding skills" },
        { name: "Technical Round 2", status: "scheduled", date: "2024-02-10", feedback: "" },
      ],
    },
  ],
  applications: [
    { company: "TechCorp Solutions", position: "Software Engineer", appliedDate: "2024-01-05", status: "selected" },
    { company: "DataFlow Inc", position: "Backend Developer", appliedDate: "2024-01-03", status: "rejected" },
    {
      company: "CloudTech Systems",
      position: "Full Stack Developer",
      appliedDate: "2024-01-18",
      status: "in_progress",
    },
    { company: "InnovateLabs", position: "Frontend Developer", appliedDate: "2024-01-25", status: "applied" },
    { company: "NextGen Solutions", position: "DevOps Engineer", appliedDate: "2024-01-28", status: "applied" },
  ],
}

export default function PlacementStatusPage() {
  const { user } = useAuth()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "selected":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Selected</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Rejected</Badge>
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">In Progress</Badge>
        )
      case "applied":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Applied</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStageStatus = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "rejected":
        return <div className="h-4 w-4 rounded-full bg-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Placement Status</h1>
          <p className="text-muted-foreground">Track your job applications and interview progress</p>
        </div>
        {mockPlacementData.status === "placed" && (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-lg px-4 py-2">
            🎉 Placed!
          </Badge>
        )}
      </div>

      {/* Current Offer Card */}
      {mockPlacementData.status === "placed" && mockPlacementData.currentOffer && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Current Offer
            </CardTitle>
            <CardDescription>Congratulations on your placement!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg">{mockPlacementData.currentOffer.company}</h3>
                <p className="text-muted-foreground">{mockPlacementData.currentOffer.position}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>₹{mockPlacementData.currentOffer.package} LPA</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{mockPlacementData.currentOffer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joining: {new Date(mockPlacementData.currentOffer.joiningDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{mockPlacementData.currentOffer.type}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPlacementData.applications.length}</div>
            <p className="text-xs text-muted-foreground">Companies applied to</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPlacementData.applications.filter((app) => app.status === "in_progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Active processes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPlacementData.applications.filter((app) => app.status === "selected").length}
            </div>
            <p className="text-xs text-muted-foreground">Successful applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (mockPlacementData.applications.filter((app) => app.status === "selected").length /
                  mockPlacementData.applications.length) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Selection percentage</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interview History</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid gap-4">
            {mockPlacementData.applications.map((application, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{application.company}</h3>
                        {getStatusBadge(application.status)}
                      </div>
                      <p className="text-muted-foreground">{application.position}</p>
                      <p className="text-sm text-muted-foreground">
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
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

        <TabsContent value="interviews" className="space-y-4">
          <div className="grid gap-6">
            {mockPlacementData.interviewHistory.map((interview) => (
              <Card key={interview.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{interview.company}</CardTitle>
                      <CardDescription>{interview.position}</CardDescription>
                    </div>
                    {getStatusBadge(interview.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interview.stages.map((stage, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          {getStageStatus(stage.status)}
                          {index < interview.stages.length - 1 && (
                            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{stage.name}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(stage.date).toLocaleDateString()}
                            </span>
                          </div>
                          {stage.score && <p className="text-sm text-muted-foreground">Score: {stage.score}</p>}
                          {stage.feedback && <p className="text-sm text-muted-foreground">{stage.feedback}</p>}
                        </div>
                      </div>
                    ))}
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
