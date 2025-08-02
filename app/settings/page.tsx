"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/app/ClientLayout"
import { useTheme } from "next-themes"
import { User, Bell, Shield, Palette, Download, Trash2 } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    assessments: true,
    placements: true,
    achievements: false,
  })

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@student.edu",
    phone: "+91 9876543210",
    github: "johndoe",
    leetcode: "john_doe_lc",
    codeforces: "johndoe_cf",
    codechef: "johndoe_cc",
    linkedin: "https://linkedin.com/in/johndoe",
  })

  const handleSaveProfile = () => {
    // In a real app, this would save to the database
    console.log("Saving profile:", profile)
  }

  const handleExportData = () => {
    // In a real app, this would generate and download user data
    console.log("Exporting user data...")
  }

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog and delete the account
    console.log("Delete account requested")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Username</Label>
                  <Input
                    id="github"
                    value={profile.github}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leetcode">LeetCode Username</Label>
                  <Input
                    id="leetcode"
                    value={profile.leetcode}
                    onChange={(e) => setProfile({ ...profile, leetcode: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codeforces">Codeforces Username</Label>
                  <Input
                    id="codeforces"
                    value={profile.codeforces}
                    onChange={(e) => setProfile({ ...profile, codeforces: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codechef">CodeChef Username</Label>
                  <Input
                    id="codechef"
                    value={profile.codechef}
                    onChange={(e) => setProfile({ ...profile, codechef: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <Input
                  id="linkedin"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                />
              </div>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Assessment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming assessments</p>
                  </div>
                  <Switch
                    checked={notifications.assessments}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, assessments: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Placement Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about placement opportunities</p>
                  </div>
                  <Switch
                    checked={notifications.placements}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, placements: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Achievement Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you unlock achievements</p>
                  </div>
                  <Switch
                    checked={notifications.achievements}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, achievements: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Manage your privacy settings and account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Data Export</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download a copy of all your data including assessments, progress, and profile information.
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export My Data
                  </Button>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium">Account Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign out of your account or permanently delete your account and all associated data.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={signOut}>
                      Sign Out
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
