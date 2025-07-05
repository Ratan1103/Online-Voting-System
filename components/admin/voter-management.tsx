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
import { getToken } from "@/utils/localStorage"

interface Voter {
  id: string
  username: string
  email: string
  age: number
  gender: string
  region: string
  is_verified: boolean | null
}

export function VoterManagement() {
  const [voters, setVoters] = useState<Voter[]>([])
  const [filteredVoters, setFilteredVoters] = useState<Voter[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "verified" | "rejected">("all")
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVoters = async () => {
      const token = getToken()
      if (!token) return
      try {
        const res = await fetch("http://127.0.0.1:8000/api/admin/voters/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        console.log(data)
        setVoters(data)
        setFilteredVoters(data)
      } catch (err) {
        console.error("Error fetching voters", err)
      } finally {
        setLoading(false)
      }
    }
    fetchVoters()
  }, [])

  useEffect(() => {
    let filtered = voters
    if (searchTerm) {
      filtered = filtered.filter(
        (voter) =>
          voter.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          voter.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((voter) => {
        if (statusFilter === "pending") return voter.is_verified === null
        if (statusFilter === "verified") return voter.is_verified === true
        if (statusFilter === "rejected") return voter.is_verified === false
      })
    }
    setFilteredVoters(filtered)
  }, [voters, searchTerm, statusFilter])

  const handleStatusChange = async (voterId: string, is_verified: boolean) => {
    const token = getToken()
    if (!token) return
    try {
      console.log("voterId",voterId)
      console.log("is_verified",is_verified)
      const res = await fetch(`http://127.0.0.1:8000/api/admin/voters/${voterId}/verify/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_verified }),  // ✅ Send proper JSON
      })
  
      if (res.ok) {
        setVoters((prev) =>
          prev.map((v) => (v.id === voterId ? { ...v, is_verified } : v))
        )
      } else {
        const data = await res.json()
        console.error("Failed to update status:", data)
      }
    } catch (err) {
      console.error("Error updating voter", err)
    }
  }
  

  const statusCounts = {
    all: voters?.length || 0,
    pending: voters?.filter((v) => v.is_verified === null).length || 0,
    verified: voters?.filter((v) => v.is_verified === true).length || 0,
    rejected: voters?.filter((v) => v.is_verified === false).length || 0,
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Voter Management</h2>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <Button onClick={() => setStatusFilter("all")}>All ({statusCounts.all})</Button>
        <Button onClick={() => setStatusFilter("pending")}>Pending ({statusCounts.pending})</Button>
        <Button onClick={() => setStatusFilter("verified")}>Verified ({statusCounts.verified})</Button>
        <Button onClick={() => setStatusFilter("rejected")}>Rejected ({statusCounts.rejected})</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVoters.map((voter) => (
              <TableRow key={voter.id}>
                <TableCell>{voter.username}</TableCell>
                <TableCell>{voter.email}</TableCell>
                <TableCell>{voter.age}</TableCell>
                <TableCell>{voter.gender}</TableCell>
                <TableCell>{voter.region}</TableCell>
                <TableCell>
                  {voter.is_verified === true && (
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  )}
                  {voter.is_verified === false && (
                    <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                  )}
                  {voter.is_verified === null && (
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {voter.is_verified === null && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleStatusChange(voter.id, true)}
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(voter.id, false)}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
