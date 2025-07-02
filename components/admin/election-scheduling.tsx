"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Plus, Edit, Trash2, Clock, MapPin, Users } from "lucide-react"

interface Election {
  id: string
  title: string
  description: string
  type: "presidential" | "congressional" | "local" | "referendum"
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  region: string
  status: "scheduled" | "active" | "completed" | "cancelled"
  eligibleVoters: number
  registeredCandidates: number
  createdDate: string
}

export function ElectionScheduling() {
  const [elections, setElections] = useState<Election[]>([])
  const [showAddElection, setShowAddElection] = useState(false)
  const [editingElection, setEditingElection] = useState<Election | null>(null)
  const [loading, setLoading] = useState(true)

  const [electionForm, setElectionForm] = useState({
    title: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    startTime: "08:00",
    endTime: "20:00",
    region: "",
  })

  useEffect(() => {
    // Simulate loading election data
    const mockElections: Election[] = [
      {
        id: "1",
        title: "Presidential Election 2024",
        description: "National presidential election to elect the next President and Vice President",
        type: "presidential",
        startDate: "2024-11-05",
        endDate: "2024-11-05",
        startTime: "06:00",
        endTime: "21:00",
        region: "National",
        status: "scheduled",
        eligibleVoters: 15847,
        registeredCandidates: 4,
        createdDate: "2024-01-15",
      },
      {
        id: "2",
        title: "Local Council Elections",
        description: "Municipal council elections for city representatives",
        type: "local",
        startDate: "2024-08-15",
        endDate: "2024-08-15",
        startTime: "08:00",
        endTime: "18:00",
        region: "City Districts 1-5",
        status: "scheduled",
        eligibleVoters: 8234,
        registeredCandidates: 12,
        createdDate: "2024-01-10",
      },
      {
        id: "3",
        title: "School Board Election",
        description: "Election for school board members",
        type: "local",
        startDate: "2024-06-20",
        endDate: "2024-06-20",
        startTime: "09:00",
        endTime: "17:00",
        region: "School District 12",
        status: "completed",
        eligibleVoters: 3456,
        registeredCandidates: 8,
        createdDate: "2024-01-05",
      },
    ]

    setTimeout(() => {
      setElections(mockElections)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddElection = () => {
    const newElection: Election = {
      id: Date.now().toString(),
      ...electionForm,
      status: "scheduled",
      eligibleVoters: 0,
      registeredCandidates: 0,
      createdDate: new Date().toISOString().split("T")[0],
    }
    setElections((prev) => [...prev, newElection])
    setElectionForm({
      title: "",
      description: "",
      type: "",
      startDate: "",
      endDate: "",
      startTime: "08:00",
      endTime: "20:00",
      region: "",
    })
    setShowAddElection(false)
  }

  const handleDeleteElection = (id: string) => {
    setElections((prev) => prev.filter((e) => e.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Scheduled
          </Badge>
        )
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      presidential: "bg-purple-100 text-purple-800",
      congressional: "bg-blue-100 text-blue-800",
      local: "bg-green-100 text-green-800",
      referendum: "bg-orange-100 text-orange-800",
    }
    return (
      <Badge variant="secondary" className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }

  const statusCounts = {
    total: elections.length,
    scheduled: elections.filter((e) => e.status === "scheduled").length,
    active: elections.filter((e) => e.status === "active").length,
    completed: elections.filter((e) => e.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.total}</p>
              <p className="text-sm text-gray-600">Total Elections</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{statusCounts.scheduled}</p>
              <p className="text-sm text-gray-600">Scheduled</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{statusCounts.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Election Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Election Management</h3>
          <p className="text-sm text-gray-600">Schedule and manage elections</p>
        </div>
        <Dialog open={showAddElection} onOpenChange={setShowAddElection}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Election
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Election</DialogTitle>
              <DialogDescription>Create a new election event with date, time, and regional settings</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Election Title</Label>
                <Input
                  id="title"
                  value={electionForm.title}
                  onChange={(e) => setElectionForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter election title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={electionForm.description}
                  onChange={(e) => setElectionForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the election"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Election Type</Label>
                  <Select
                    value={electionForm.type}
                    onValueChange={(value) => setElectionForm((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presidential">Presidential</SelectItem>
                      <SelectItem value="congressional">Congressional</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="referendum">Referendum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={electionForm.region}
                    onChange={(e) => setElectionForm((prev) => ({ ...prev, region: e.target.value }))}
                    placeholder="Election region/district"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={electionForm.startDate}
                    onChange={(e) => setElectionForm((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={electionForm.endDate}
                    onChange={(e) => setElectionForm((prev) => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={electionForm.startTime}
                    onChange={(e) => setElectionForm((prev) => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={electionForm.endTime}
                    onChange={(e) => setElectionForm((prev) => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddElection(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddElection}>Schedule Election</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Elections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Elections</CardTitle>
          <CardDescription>Manage election schedules and settings</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p>Loading elections...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Election</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {elections.map((election) => (
                  <TableRow key={election.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{election.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{election.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(election.type)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(election.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="h-3 w-3" />
                          {election.startTime} - {election.endTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {election.region}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(election.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {election.eligibleVoters.toLocaleString()} voters
                        </div>
                        <div className="text-gray-600">{election.registeredCandidates} candidates</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteElection(election.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
