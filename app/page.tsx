"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Vote, Users, Shield, BarChart3, Calendar, Globe, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ChatBot } from "@/components/chat-bot"
import { NewsSection } from "@/components/news-section"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: Vote,
      title: "Secure Voting",
      description: "Biometric-verified voting with end-to-end encryption",
    },
    {
      icon: Users,
      title: "Voter Management",
      description: "Streamlined registration and verification process",
    },
    {
      icon: Shield,
      title: "Admin Control",
      description: "Comprehensive administrative oversight and security",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live voting statistics and demographic insights",
    },
  ]

  const upcomingElections = [
    {
      title: "Presidential Election 2024",
      date: "2024-11-05",
      status: "upcoming",
      region: "National",
    },
    {
      title: "Local Council Elections",
      date: "2024-08-15",
      status: "registration-open",
      region: "Regional",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">VoteSecure</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/voter/register" className="text-gray-600 hover:text-blue-600 transition-colors">
                Register to Vote
              </Link>
              <Link href="/voter/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                Voter Login
              </Link>
              <Link href="/results" className="text-gray-600 hover:text-blue-600 transition-colors">
                Results
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Globe className="h-4 w-4 mr-2" />
            Secure • Transparent • Democratic
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            The Future of
            <span className="text-blue-600"> Digital Democracy</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience secure, transparent, and accessible online voting with biometric authentication, real-time
            results, and comprehensive administrative oversight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/voter/register">
              <Button size="lg" className="w-full sm:w-auto">
                Register to Vote
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/voter/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Cast Your Vote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Current Time & Status */}
      <section className="py-8 px-4 bg-white/50">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5" />
                Election Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-mono font-bold text-blue-600 mb-2">{currentTime.toLocaleString()}</div>
              <Badge variant="secondary">Voting Registration Open</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose VoteSecure?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Elections */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Upcoming Elections</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {upcomingElections.map((election, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{election.title}</CardTitle>
                      <CardDescription>{election.region}</CardDescription>
                    </div>
                    <Badge variant={election.status === "upcoming" ? "default" : "secondary"}>
                      {election.status === "upcoming" ? "Upcoming" : "Registration Open"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {new Date(election.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live News Section */}
      <NewsSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Vote className="h-6 w-6" />
                <span className="text-xl font-bold">VoteSecure</span>
              </div>
              <p className="text-gray-400">Empowering democracy through secure digital voting technology.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Voters</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/voter/register" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/voter/login" className="hover:text-white">
                    Vote
                  </Link>
                </li>
                <li>
                  <Link href="/results" className="hover:text-white">
                    Results
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Administration</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/admin/login" className="hover:text-white">
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link href="/admin/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 VoteSecure. All rights reserved. Built for secure democratic participation.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  )
}
