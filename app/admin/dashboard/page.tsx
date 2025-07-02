"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, Vote, BarChart3, Calendar, LogOut, Shield, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { VoterManagement } from "@/components/admin/voter-management"
import { CandidateManagement } from "@/components/admin/candidate-management"
import { ElectionScheduling } from "@/components/admin/election-scheduling"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVoters: 0,
    pendingRegistrations: 0,
    verifiedVoters: 0,
    rejectedApplications: 0,
    totalCandidates: 0,
    activeElections: 0,
    completedElections: 0,
    totalVotesCast: 0,
  })
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }

    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalVoters: 15847,
        pendingRegistrations: 234,
        verifiedVoters: 14891,
        rejectedApplications: 722,
        totalCandidates: 45,
        activeElections: 2,
        completedElections: 8,
        totalVotesCast: 12456,
      })
    }, 1000)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  const statCards = [
    {
      title: "Total Voters",
      value: stats.totalVoters.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Registrations",
      value: stats.pendingRegistrations.toLocaleString(),
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Verified Voters",
      value: stats.verifiedVoters.toLocaleString(),
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Elections",
      value: stats.activeElections.toLocaleString(),
      icon: Vote,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Election Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                System Online
              </Badge>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                <UserCheck className="h-6 w-6" />
                <span>Review Registrations</span>
                <Badge variant="secondary">{stats.pendingRegistrations} pending</Badge>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Add Candidate</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Calendar className="h-6 w-6" />
                <span>Schedule Election</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="voters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="voters" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Voter Management
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center gap-2">
              <Vote className="h-4 w-4" />
              Candidates
            </TabsTrigger>
            <TabsTrigger value="elections" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Elections
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voters">
            <VoterManagement />
          </TabsContent>

          <TabsContent value="candidates">
            <CandidateManagement />
          </TabsContent>

          <TabsContent value="elections">
            <ElectionScheduling />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
