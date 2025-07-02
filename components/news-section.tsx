"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, ExternalLink, Clock } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  description: string
  publishedAt: string
  source: string
  url: string
  category: "election" | "politics" | "voting"
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching news from API
    const fetchNews = async () => {
      setLoading(true)
      // Mock news data - in real implementation, this would fetch from NewsAPI or RSS
      const mockNews: NewsItem[] = [
        {
          id: "1",
          title: "New Biometric Voting Technology Deployed Nationwide",
          description:
            "Advanced retina scanning technology has been successfully implemented across all voting centers to enhance security and prevent fraud.",
          publishedAt: "2024-01-15T10:30:00Z",
          source: "Election Commission",
          url: "#",
          category: "voting",
        },
        {
          id: "2",
          title: "Voter Registration Deadline Extended by Two Weeks",
          description:
            "Due to high demand, the voter registration deadline has been extended to accommodate more citizens in the democratic process.",
          publishedAt: "2024-01-14T14:20:00Z",
          source: "Government News",
          url: "#",
          category: "election",
        },
        {
          id: "3",
          title: "Digital Voting Platform Passes Security Audit",
          description:
            "Independent cybersecurity experts have certified the online voting platform as secure and ready for the upcoming elections.",
          publishedAt: "2024-01-13T09:15:00Z",
          source: "Tech Security Today",
          url: "#",
          category: "voting",
        },
        {
          id: "4",
          title: "Record Number of Young Voters Register Online",
          description:
            "The new online registration system has attracted unprecedented participation from voters aged 18-25.",
          publishedAt: "2024-01-12T16:45:00Z",
          source: "Democracy Watch",
          url: "#",
          category: "politics",
        },
      ]

      setTimeout(() => {
        setNews(mockNews)
        setLoading(false)
      }, 1000)
    }

    fetchNews()
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "election":
        return "bg-blue-100 text-blue-800"
      case "politics":
        return "bg-purple-100 text-purple-800"
      case "voting":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 mb-12">
          <Newspaper className="h-8 w-8 text-blue-600" />
          <h3 className="text-3xl font-bold text-center">Latest Election News</h3>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={getCategoryColor(item.category)} variant="secondary">
                      {item.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeAgo(item.publishedAt)}
                    </div>
                  </div>
                  <CardTitle className="text-sm leading-tight line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="text-xs text-gray-600">{item.source}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">{item.description}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                    Read more
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline">
            View All News
            <Newspaper className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
