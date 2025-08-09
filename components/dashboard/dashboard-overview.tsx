"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Wallet, Plus, Trophy, Calendar, Package, ShoppingCart, Zap, Target, Timer, Coins } from 'lucide-react'

const mockStats = [
  {
    title: "Total Earnings",
    value: "1,247.8 SUI",
    change: "+12.5%",
    icon: Wallet,
    color: "text-green-500"
  },
  {
    title: "Active Rentals",
    value: "8",
    change: "+2",
    icon: Calendar,
    color: "text-blue-500"
  },
  {
    title: "NFTs Owned",
    value: "23",
    change: "+5",
    icon: Package,
    color: "text-purple-500"
  },
  {
    title: "Rank",
    value: "#12",
    change: "+3",
    icon: Trophy,
    color: "text-orange-500"
  }
]

const mockRecentActivity = [
  {
    id: 1,
    type: "mint",
    title: "Minted Cosmic Warrior #1337",
    description: "Reached 100% progress and minted original NFT",
    time: "2 hours ago",
    icon: Coins,
    color: "text-green-500"
  },
  {
    id: 2,
    type: "rental",
    title: "Started renting Digital Dreamscape",
    description: "Clone #7 - Progress: 15%",
    time: "1 day ago",
    icon: Calendar,
    color: "text-blue-500"
  },
  {
    id: 3,
    type: "progress",
    title: "Quantum Crystal progress update",
    description: "Reached 85% completion",
    time: "2 days ago",
    icon: Target,
    color: "text-purple-500"
  },
  {
    id: 4,
    type: "listing",
    title: "Created new listing",
    description: "Space Explorer NFT - Multi-renter enabled",
    time: "3 days ago",
    icon: Plus,
    color: "text-orange-500"
  }
]

const mockActiveRentals = [
  {
    id: 1,
    name: "Digital Dreamscape",
    image: "/digital-dreamscape.png",
    progress: 85,
    cloneId: "Clone #7",
    timeLeft: "5 days",
    suiSpent: 45
  },
  {
    id: 2,
    name: "Space Explorer",
    image: "/space-explorer-nft.png",
    progress: 62,
    cloneId: "Clone #2",
    timeLeft: "12 days",
    suiSpent: 28
  },
  {
    id: 3,
    name: "Cyberpunk Avatar",
    image: "/cyberpunk-avatar-nft.png",
    progress: 34,
    cloneId: "Clone #5",
    timeLeft: "18 days",
    suiSpent: 15
  }
]

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your Race2Own journey.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {mockStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className={`text-xs ${stat.color} mt-1`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Rentals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Active Rentals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActiveRentals.map((rental, index) => (
                <motion.div
                  key={rental.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border/50"
                >
                  <img
                    src={rental.image || "/placeholder.svg"}
                    alt={rental.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{rental.name}</h4>
                    <p className="text-sm text-muted-foreground">{rental.cloneId}</p>
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-semibold text-primary">{rental.progress}%</span>
                      </div>
                      <Progress value={rental.progress} className="h-1.5" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{rental.suiSpent} SUI</p>
                    <p className="text-xs text-muted-foreground">{rental.timeLeft} left</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-background/30 rounded-lg border border-border/30"
                  >
                    <div className={`p-2 rounded-full bg-background/50 ${activity.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                    </div>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-6 h-6" />
                <span className="font-semibold">Create New Listing</span>
                <span className="text-xs opacity-80">List your NFT for rent</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <ShoppingCart className="w-6 h-6" />
                <span className="font-semibold">Browse Marketplace</span>
                <span className="text-xs opacity-80">Find NFTs to rent</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                <Coins className="w-6 h-6" />
                <span className="font-semibold">Mint Ready NFTs</span>
                <span className="text-xs opacity-80">Claim your earned NFTs</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
