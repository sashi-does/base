"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Shield, Users, Zap, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#FF9900]/20 to-[#FFC107]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#FFC107]/15 to-[#FF9900]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#FFC107] to-[#FF9900] bg-clip-text text-transparent leading-tight">
            Connect Instantly,
            <br />
            Chat Seamlessly
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of real-time communication with our lightning-fast chat platform. Secure, private, and
            beautifully designed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="glass-button bg-gradient-to-r from-[#FFB347] to-[#FF9900] hover:from-[#FF9900] hover:to-[#FFB347] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF9900]/25">
              Start Chatting Now
            </Button>
            <Button
              variant="outline"
              className="glass-button-outline border-[#FF9900]/50 text-[#FF9900] hover:bg-[#FF9900]/10 hover:border-[#FF9900] px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFC107] to-[#FF9900] bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need for seamless real-time communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure Authentication",
                description: "End-to-end encryption with multi-factor authentication for ultimate security.",
              },
              {
                icon: Zap,
                title: "Real-time Messaging",
                description: "Lightning-fast message delivery with instant read receipts and typing indicators.",
              },
              {
                icon: Users,
                title: "Private Rooms",
                description: "Create exclusive chat rooms with custom permissions and member management.",
              },
              {
                icon: MessageCircle,
                title: "Rich Media Support",
                description: "Share images, videos, files, and voice messages with seamless integration.",
              },
            ].map((feature, index) => (
              <Card key={index} className="glass-card group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-gradient-to-r from-[#FF9900]/20 to-[#FFC107]/20 group-hover:from-[#FF9900]/30 group-hover:to-[#FFC107]/30 transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-[#FF9900] group-hover:text-[#FFC107] transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#FFC107] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFC107] to-[#FF9900] bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Flexible pricing for teams of all sizes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Regular",
                price: "Free",
                episodes: "100",
                features: ["Basic messaging", "5 chat rooms", "File sharing up to 10MB", "Community support"],
                popular: false,
              },
              {
                name: "Pro",
                price: "$0.99",
                episodes: "500",
                features: [
                  "Everything in Regular",
                  "Unlimited chat rooms",
                  "File sharing up to 100MB",
                  "Priority support",
                  "Custom themes",
                ],
                popular: false,
              },
              {
                name: "VIP",
                price: "$2.99",
                episodes: "Unlimited",
                features: [
                  "Everything in Pro",
                  "Advanced analytics",
                  "API access",
                  "White-label options",
                  "24/7 dedicated support",
                ],
                popular: true,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`glass-card relative ${plan.popular ? "vip-glow" : ""} group cursor-pointer`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#FFB347] to-[#FF9900] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#FFC107] transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#FF9900]">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-gray-400">/month</span>}
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-[#FFC107]">{plan.episodes}</span>
                    <span className="text-gray-400 block">messages/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-[#FF9900] mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-[#FFB347] to-[#FF9900] hover:from-[#FF9900] hover:to-[#FFB347]" : "glass-button-outline border-[#FF9900]/50 text-[#FF9900] hover:bg-[#FF9900]/10"} transition-all duration-300 transform hover:scale-105`}
                  >
                    {plan.price === "Free" ? "Get Started" : "Upgrade Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#FFC107] to-[#FF9900] bg-clip-text text-transparent">
            Ready to Transform Your Communication?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of teams already using our platform to stay connected and productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="glass-button bg-gradient-to-r from-[#FFB347] to-[#FF9900] hover:from-[#FF9900] hover:to-[#FFB347] text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF9900]/25">
              Try Now
            </Button>
            <Button
              variant="outline"
              className="glass-button-outline border-[#FF9900]/50 text-[#FF9900] hover:bg-[#FF9900]/10 hover:border-[#FF9900] px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Book Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
