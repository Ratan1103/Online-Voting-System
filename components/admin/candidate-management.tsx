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
import { Plus, Edit, Trash2, Users } from "lucide-react"

interface Candidate {
  id: string
  name: string
  party: string
  position: string
  biography: string
  experience: string
  platform: string
  imageUrl: string
  status: "active" | "inactive"
  registrationDate: string
}

interface Party {
  id: string
  name: string
  abbreviation: string
  color: string
  logo: string
}

export function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [parties, setParties] = useState<Party[]>([])
  const [showAddCandidate, setShowAddCandidate] = useState(false)
  const [showAddParty, setShowAddParty] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)

  const [candidateForm, setCandidateForm] = useState({
    name: "",
    party: "",
    position: "",
    biography: "",
    experience: "",
    platform: "",
    imageUrl: "",
  })

  const [partyForm, setPartyForm] = useState({
    name: "",
    abbreviation: "",
    color: "#3B82F6",
    logo: "",
  })

  useEffect(() => {
    // Simulate loading data
    const mockParties: Party[] = [
      {
        id: "1",
        name: "Democratic Party",
        abbreviation: "DEM",
        color: "#3B82F6",
        logo: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        name: "Republican Party",
        abbreviation: "REP",
        color: "#EF4444",
        logo: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "3",
        name: "Independent",
        abbreviation: "IND",
        color: "#10B981",
        logo: "/placeholder.svg?height=40&width=40",
      },
    ]

    const mockCandidates: Candidate[] = [
      {
        id: "1",
        name: "Alice Johnson",
        party: "Democratic Party",
        position: "President",
        biography: "Former Senator with 15 years of public service experience.",
        experience: "Senator (2008-2023), State Representative (2004-2008)",
        platform: "Healthcare reform, climate action, economic equality",
        imageUrl: "/placeholder.svg?height=100&width=100",
        status: "active",
        registrationDate: "2024-01-05",
      },
      {
        id: "2",
        name: "Robert Smith",
        party: "Republican Party",
        position: "President",
        biography: "Business leader and former Governor with proven leadership.",
        experience: "Governor (2016-2024), CEO Tech Corp (2010-2016)",
        platform: "Economic growth, national security, traditional values",
        imageUrl: "/placeholder.svg?height=100&width=100",
        status: "active",
        registrationDate: "2024-01-06",
      },
      {
        id: "3",
        name: "Maria Garcia",
        party: "Independent",
        position: "Mayor",
        biography: "Community organizer and environmental advocate.",
        experience: "City Council (2018-2024), Environmental Lawyer (2012-2018)",
        platform: "Sustainable development, community engagement, transparency",
        imageUrl: "/placeholder.svg?height=100&width=100",
        status: "active",
        registrationDate: "2024-01-07",
      },
    ]

    setTimeout(() => {
      setParties(mockParties)
      setCandidates(mockCandidates)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddCandidate = () => {
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      ...candidateForm,
      status: "active",
      registrationDate: new Date().toISOString().split("T")[0],
    }
    setCandidates((prev) => [...prev, newCandidate])
    setCandidateForm({
      name: "",
      party: "",
      position: "",
      biography: "",
      experience: "",
      platform: "",
      imageUrl: "",
    })
    setShowAddCandidate(false)
  }

  const handleAddParty = () => {
    const newParty: Party = {
      id: Date.now().toString(),
      ...partyForm,
      logo: partyForm.logo || "/placeholder.svg?height=40&width=40",
    }
    setParties((prev) => [...prev, newParty])
    setPartyForm({
      name: "",
      abbreviation: "",
      color: "#3B82F6",
      logo: "",
    })
    setShowAddParty(false)
  }

  const handleDeleteCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id))
  }

  const getPartyColor = (partyName: string) => {
    const party = parties.find((p) => p.name === partyName)
    return party?.color || "#6B7280"
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{candidates.length}</p>
              <p className="text-sm text-gray-600">Total Candidates</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{parties.length}</p>
              <p className="text-sm text-gray-600">Political Parties</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {candidates.filter((c) => c.status === "active").length}
              </p>
              <p className="text-sm text-gray-600">Active Candidates</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Dialog open={showAddCandidate} onOpenChange={setShowAddCandidate}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>Register a new candidate for the upcoming election</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={candidateForm.name}
                    onChange={(e) => setCandidateForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter candidate's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select
                    value={candidateForm.position}
                    onValueChange={(value) => setCandidateForm((prev) => ({ ...prev, position: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="President">President</SelectItem>
                      <SelectItem value="Vice President">Vice President</SelectItem>
                      <SelectItem value="Senator">Senator</SelectItem>
                      <SelectItem value="Governor">Governor</SelectItem>
                      <SelectItem value="Mayor">Mayor</SelectItem>
                      <SelectItem value="City Council">City Council</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="party">Political Party</Label>
                <Select
                  value={candidateForm.party}
                  onValueChange={(value) => setCandidateForm((prev) => ({ ...prev, party: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select party" />
                  </SelectTrigger>
                  <SelectContent>
                    {parties.map((party) => (
                      <SelectItem key={party.id} value={party.name}>
                        {party.name} ({party.abbreviation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="biography">Biography</Label>
                <Textarea
                  id="biography"
                  value={candidateForm.biography}
                  onChange={(e) => setCandidateForm((prev) => ({ ...prev, biography: e.target.value }))}
                  placeholder="Brief biography of the candidate"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Textarea
                  id="experience"
                  value={candidateForm.experience}
                  onChange={(e) => setCandidateForm((prev) => ({ ...prev, experience: e.target.value }))}
                  placeholder="Professional and political experience"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Textarea
                  id="platform"
                  value={candidateForm.platform}
                  onChange={(e) => setCandidateForm((prev) => ({ ...prev, platform: e.target.value }))}
                  placeholder="Key policy positions and campaign platform"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddCandidate(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCandidate}>Add Candidate</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddParty} onOpenChange={setShowAddParty}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add Party
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Political Party</DialogTitle>
              <DialogDescription>Register a new political party</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="partyName">Party Name</Label>
                <Input
                  id="partyName"
                  value={partyForm.name}
                  onChange={(e) => setPartyForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter party name"
                />
              </div>
              <div>
                <Label htmlFor="abbreviation">Abbreviation</Label>
                <Input
                  id="abbreviation"
                  value={partyForm.abbreviation}
                  onChange={(e) => setPartyForm((prev) => ({ ...prev, abbreviation: e.target.value }))}
                  placeholder="Enter party abbreviation"
                />
              </div>
              <div>
                <Label htmlFor="color">Party Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={partyForm.color}
                  onChange={(e) => setPartyForm((prev) => ({ ...prev, color: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddParty(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddParty}>Add Party</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Candidates</CardTitle>
          <CardDescription>Manage candidate registrations and information</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p>Loading candidates...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={candidate.imageUrl || "/placeholder.svg"}
                          alt={candidate.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-gray-600">{candidate.position}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          backgroundColor: getPartyColor(candidate.party) + "20",
                          color: getPartyColor(candidate.party),
                        }}
                      >
                        {candidate.party}
                      </Badge>
                    </TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>{new Date(candidate.registrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={candidate.status === "active" ? "default" : "secondary"}>
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteCandidate(candidate.id)}>
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

      {/* Political Parties */}
      <Card>
        <CardHeader>
          <CardTitle>Political Parties</CardTitle>
          <CardDescription>Registered political parties in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parties.map((party) => (
              <Card key={party.id} className="border-2" style={{ borderColor: party.color + "40" }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: party.color }}
                    >
                      {party.abbreviation}
                    </div>
                    <div>
                      <p className="font-medium">{party.name}</p>
                      <p className="text-sm text-gray-600">{party.abbreviation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
