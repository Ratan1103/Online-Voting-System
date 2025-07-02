"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, UserCheck, UserX, Eye, Download } from "lucide-react"

interface Voter {
  id: string
  name: string
  email: string
  dateOfBirth: string
  address: string
  idNumber: string
  registrationDate: string
  status: "pending" | "verified" | "rejected"
  documents: string[]
}

export function VoterManagement() {
  const [voters, setVoters] = useState<Voter[]>([])
  const [filteredVoters, setFilteredVoters] = useState<Voter[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "verified" | "rejected">("all")
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading voter data
    const mockVoters: Voter[] = [
      {
        id: "1",
        name: "John Smith",
        email: "john.smith@email.com",
        dateOfBirth: "1990-05-15",
        address: "123 Main St, City, State 12345",
        idNumber: "ID123456789",
        registrationDate: "2024-01-10",
        status: "pending",
        documents: ["drivers_license.jpg", "proof_of_address.pdf"],
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        dateOfBirth: "1985-08-22",
        address: "456 Oak Ave, City, State 12345",
        idNumber: "ID987654321",
        registrationDate: "2024-01-08",
        status: "verified",
        documents: ["passport.jpg", "utility_bill.pdf"],
      },
      {
        id: "3",
        name: "Michael Brown",
        email: "michael.brown@email.com",
        dateOfBirth: "1992-12-03",
        address: "789 Pine St, City, State 12345",
        idNumber: "ID456789123",
        registrationDate: "2024-01-12",
        status: "rejected",
        documents: ["id_card.jpg"],
      },
      {
        id: "4",
        name: "Emily Davis",
        email: "emily.davis@email.com",
        dateOfBirth: "1988-03-18",
        address: "321 Elm St, City, State 12345",
        idNumber: "ID789123456",
        registrationDate: "2024-01-09",
        status: "pending",
        documents: ["drivers_license.jpg", "bank_statement.pdf"],
      },
      {
        id: "5",
        name: "David Wilson",
        email: "david.wilson@email.com",
        dateOfBirth: "1995-07-11",
        address: "654 Maple Ave, City, State 12345",
        idNumber: "ID321654987",
        registrationDate: "2024-01-11",
        status: "verified",
        documents: ["passport.jpg", "lease_agreement.pdf"],
      },
    ]

    setTimeout(() => {
      setVoters(mockVoters)
      setFilteredVoters(mockVoters)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = voters

    if (searchTerm) {
      filtered = filtered.filter(
        (voter) =>
          voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          voter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          voter.idNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((voter) => voter.status === statusFilter)
    }

    setFilteredVoters(filtered)
  }, [voters, searchTerm, statusFilter])

  const handleStatusChange = (voterId: string, newStatus: "verified" | "rejected") => {
    setVoters((prev) => prev.map((voter) => (voter.id === voterId ? { ...voter, status: newStatus } : voter)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const statusCounts = {
    all: voters.length,
    pending: voters.filter((v) => v.status === "pending").length,
    verified: voters.filter((v) => v.status === "verified").length,
    rejected: voters.filter((v) => v.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.all}</p>
              <p className="text-sm text-gray-600">Total Registrations</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.verified}</p>
              <p className="text-sm text-gray-600">Verified</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Voter Registrations</CardTitle>
          <CardDescription>Review and manage voter registration applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or ID number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All ({statusCounts.all})
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                size="sm"
              >
                Pending ({statusCounts.pending})
              </Button>
              <Button
                variant={statusFilter === "verified" ? "default" : "outline"}
                onClick={() => setStatusFilter("verified")}
                size="sm"
              >
                Verified ({statusCounts.verified})
              </Button>
              <Button
                variant={statusFilter === "rejected" ? "default" : "outline"}
                onClick={() => setStatusFilter("rejected")}
                size="sm"
              >
                Rejected ({statusCounts.rejected})
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p>Loading voter registrations...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>ID Number</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVoters.map((voter) => (
                  <TableRow key={voter.id}>
                    <TableCell className="font-medium">{voter.name}</TableCell>
                    <TableCell>{voter.email}</TableCell>
                    <TableCell>{voter.idNumber}</TableCell>
                    <TableCell>{new Date(voter.registrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(voter.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedVoter(voter)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Voter Registration Details</DialogTitle>
                              <DialogDescription>Review voter information and documents</DialogDescription>
                            </DialogHeader>
                            {selectedVoter && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Full Name</label>
                                    <p className="text-sm text-gray-600">{selectedVoter.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <p className="text-sm text-gray-600">{selectedVoter.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Date of Birth</label>
                                    <p className="text-sm text-gray-600">
                                      {new Date(selectedVoter.dateOfBirth).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">ID Number</label>
                                    <p className="text-sm text-gray-600">{selectedVoter.idNumber}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Address</label>
                                  <p className="text-sm text-gray-600">{selectedVoter.address}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Documents</label>
                                  <div className="flex gap-2 mt-1">
                                    {selectedVoter.documents.map((doc, index) => (
                                      <Button key={index} variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        {doc}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                                {selectedVoter.status === "pending" && (
                                  <div className="flex gap-2 pt-4">
                                    <Button
                                      onClick={() => handleStatusChange(selectedVoter.id, "verified")}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleStatusChange(selectedVoter.id, "rejected")}
                                    >
                                      <UserX className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {voter.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(voter.id, "verified")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleStatusChange(voter.id, "rejected")}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
