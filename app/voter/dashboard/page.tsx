"use client"

import { useEffect, useState } from "react"
import { getVoterToken } from "@/utils/localStorage"
import { Badge } from "@/components/ui/badge"

export default function VoterDashboard() {
  const [status, setStatus] = useState<null | "pending" | "verified" | "rejected">(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStatus = async () => {
      const token = getVoterToken()
      if (!token) {
        setError("You are not logged in.")
        setLoading(false)
        return
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/accounts/voter/status/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error("Failed to fetch status")
        const data = await res.json()
        const isVerified = data.is_verified
        if (isVerified === null) setStatus("pending")
        else if (isVerified === true) setStatus("verified")
        else setStatus("rejected")
      } catch (err) {
        setError("Unable to fetch status.")
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4">
      <div className="bg-slate-950 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Voter Registration Status</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="text-center">
            {status === "pending" && (
              <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            )}
            {status === "verified" && (
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            )}
            {status === "rejected" && (
              <Badge className="bg-red-100 text-red-800">Rejected</Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
