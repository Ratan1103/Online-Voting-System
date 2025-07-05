"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function VoterRegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    region: ""
  })

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors((prev) => ({ ...prev, [e.target.name]: [] })) // Clear field error on change
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age)
        })
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Registration successful! Awaiting admin verification.")
        router.push("/voter/login")
      } else {
        setErrors(data)
        toast.error("Please fix the form errors.")
      }
    } catch (err) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const renderError = (field: string) =>
    errors[field]?.length ? (
      <p className="text-sm text-red-500 mt-1">{errors[field][0]}</p>
    ) : null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-100 to-purple-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Voter Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Username</Label>
              <Input name="username" value={formData.username} onChange={handleChange} required />
              {renderError("username")}
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
              {renderError("email")}
            </div>
            <div>
              <Label>Password</Label>
              <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
              {renderError("password")}
            </div>
            <div>
              <Label>Age</Label>
              <Input name="age" type="number" value={formData.age} onChange={handleChange} required />
              {renderError("age")}
            </div>
            <div>
              <Label>Gender</Label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {renderError("gender")}
            </div>
            <div>
              <Label>Region</Label>
              <Input name="region" value={formData.region} onChange={handleChange} required />
              {renderError("region")}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
