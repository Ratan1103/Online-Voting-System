"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Minimize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your VoteSecure assistant. I can help you with voter registration, election schedules, voting procedures, and answer any questions about our platform. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickQuestions = [
    "How do I register to vote?",
    "What documents do I need?",
    "When is the next election?",
    "How does biometric verification work?",
    "How do I check my registration status?",
  ]

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("register") || message.includes("registration")) {
      return 'To register to vote, click on "Register to Vote" on the homepage. You\'ll need to provide your full name, date of birth, address, and upload a valid ID document. After submission, an administrator will review and verify your registration within 2-3 business days.'
    }

    if (message.includes("document") || message.includes("id")) {
      return "You need a valid government-issued photo ID such as a driver's license, passport, or national ID card. The document should be clear, not expired, and match the information you provide in your registration form."
    }

    if (message.includes("biometric") || message.includes("retina") || message.includes("scan")) {
      return "Our biometric verification uses retina scanning technology for secure voter authentication. On voting day, you'll be prompted to look into the scanner for 2-3 seconds. This ensures only verified voters can cast ballots and prevents duplicate voting."
    }

    if (message.includes("election") || message.includes("when") || message.includes("date")) {
      return "The next major election is the Presidential Election scheduled for November 5, 2024. Local Council Elections are scheduled for August 15, 2024. You can view all upcoming elections and their schedules on our homepage."
    }

    if (message.includes("status") || message.includes("check")) {
      return 'You can check your registration status by logging into your voter account. Your status will show as "Pending" (under review), "Verified" (approved for voting), or "Rejected" (needs correction). You\'ll also receive email notifications about status changes.'
    }

    if (message.includes("vote") || message.includes("voting") || message.includes("cast")) {
      return "To vote, log in to your verified voter account during the scheduled voting period. Complete the biometric verification, then you'll see the ballot with all candidates. Select your choices and confirm your vote. You can only vote once per election."
    }

    if (message.includes("admin") || message.includes("administrator")) {
      return "Administrators are booth officers who manage the voting process. They review voter registrations, verify identities, register candidates, set voting schedules, and publish results. Only authorized personnel have admin access."
    }

    if (message.includes("secure") || message.includes("security") || message.includes("safe")) {
      return "VoteSecure uses multiple security layers: JWT authentication, biometric verification, encrypted data transmission, immutable vote records, and regular security audits. Your vote is completely anonymous and cannot be traced back to you."
    }

    if (message.includes("help") || message.includes("support")) {
      return "I'm here to help! You can ask me about voter registration, election schedules, voting procedures, security features, or any technical issues. For complex problems, you can also contact our support team through the Help Center."
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Welcome to VoteSecure. I'm here to help you with any questions about voting, registration, or our platform. What would you like to know?"
    }

    return "I understand you're asking about voting or elections. Could you please be more specific? I can help with voter registration, election schedules, voting procedures, security features, or technical support. Try asking one of the quick questions below!"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage()
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-96 shadow-xl z-50 transition-all duration-300 ${
        isMinimized ? "h-16" : "h-[500px]"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <CardTitle className="text-sm">VoteSecure Assistant</CardTitle>
          <Badge variant="secondary" className="text-xs bg-blue-500 text-white">
            Online
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-blue-700"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(500px-64px)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2 bg-transparent"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about voting..."
                className="text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
