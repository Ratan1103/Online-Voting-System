"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Users, Vote, Calendar, MapPin } from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [loading, setLoading] = useState(true)

  // Mock data for charts
  const registrationData = [
    { date: "2024-01-01", registrations: 45 },
    { date: "2024-01-02", registrations: 52 },
    { date: "2024-01-03", registrations: 38 },
    { date: "2024-01-04", registrations: 67 },
    { date: "2024-01-05", registrations: 89 },
    { date: "2024-01-06", registrations: 76 },
    { date: "2024-01-07", registrations: 94 },
    { date: "2024-01-08", registrations: 112 },
    { date: "2024-01-09", registrations: 98 },
    { date: "2024-01-10", registrations: 134 },
  ]

  const verificationStatusData = [
    { name: "Verified", value: 14891, color: "#10B981" },
    { name: "Pending", value: 234, color: "#F59E0B" },
    { name: "Rejected", value: 722, color: "#EF4444" },
  ]

  const demographicsData = [
    { ageGroup: "18-25", male: 2340, female: 2890 },
    { ageGroup: "26-35", male: 3210, female: 3456 },
    { ageGroup: "36-45", male: 2890, female: 2654 },
    { ageGroup: "46-55", male: 2123, female: 2345 },
    { ageGroup: "56-65", male: 1876, female: 1987 },
    { ageGroup: "65+", male: 1234, female: 1456 },
  ]

  const regionData = [
    { region: "District 1", voters: 3456, turnout: 78 },
    { region: "District 2", voters: 2890, turnout: 82 },
    { region: "District 3", voters: 4123, turnout: 75 },
    { region: "District 4", voters: 2345, turnout: 88 },
    { region: "District 5", voters: 3678, turnout: 71 },
  ]

  const candidatePopularityData = [
    { candidate: "Alice Johnson", votes: 4567, percentage: 35.2 },
    { candidate: "Robert Smith", votes: 3890, percentage: 30.0 },
    { candidate: "Maria Garcia", votes: 2345, percentage: 18.1 },
    { candidate: "David Wilson", votes: 2167, percentage: 16.7 },
  ]

  const deviceUsageData = [
    { device: "Desktop", users: 8934, percentage: 56.4 },
    { device: "Mobile", users: 5678, percentage: 35.8 },
    { device: "Tablet", users: 1234, percentage: 7.8 },
  ]

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
          <p className="text-sm text-gray-600">Strategic insights and voting trends</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Registrations</p>
                <p className="text-2xl font-bold">15,847</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="h-3 w-3" />
                  +12.5%
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verification Rate</p>
                <p className="text-2xl font-bold">93.8%</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="h-3 w-3" />
                  +2.1%
                </div>
              </div>
              <Vote className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Elections</p>
                <p className="text-2xl font-bold">2</p>
                <div className="flex items-center gap-1 text-blue-600 text-sm">
                  <Calendar className="h-3 w-3" />
                  Ongoing
                </div>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Turnout</p>
                <p className="text-2xl font-bold">78.9%</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="h-3 w-3" />
                  +5.2%
                </div>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Registration Trend
            </CardTitle>
            <CardDescription>Daily voter registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis />
                <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                <Area type="monotone" dataKey="registrations" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Verification Status
            </CardTitle>
            <CardDescription>Current status of voter registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={verificationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {verificationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Age & Gender Demographics
            </CardTitle>
            <CardDescription>Voter distribution by age group and gender</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demographicsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="male" fill="#3B82F6" name="Male" />
                <Bar dataKey="female" fill="#EC4899" name="Female" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Turnout */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Regional Turnout
            </CardTitle>
            <CardDescription>Voting turnout by district</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="turnout" fill="#10B981" name="Turnout %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Popularity */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Performance</CardTitle>
            <CardDescription>Current vote distribution among candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidatePopularityData.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{candidate.candidate}</span>
                      <span className="text-sm text-gray-600">{candidate.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${candidate.percentage}%` }}></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-600">{candidate.votes.toLocaleString()} votes</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Device Analytics</CardTitle>
            <CardDescription>Platform usage for voter registration and voting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceUsageData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-sm font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{device.users.toLocaleString()}</span>
                    <Badge variant="secondary">{device.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Insights</CardTitle>
          <CardDescription>AI-powered recommendations for election management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">High Registration Activity</h4>
              <p className="text-sm text-blue-700">
                Registration rates are 12.5% higher than last period. Consider extending outreach to maintain momentum.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Strong Verification Rate</h4>
              <p className="text-sm text-green-700">
                93.8% verification rate indicates effective document validation processes.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Mobile Usage Growth</h4>
              <p className="text-sm text-orange-700">
                35.8% of users access via mobile. Consider mobile-first optimizations for better UX.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
