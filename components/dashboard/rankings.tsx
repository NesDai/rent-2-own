"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreVertical, Trophy, TrendingUp, DollarSign, Medal, Crown, Star, ShoppingCart, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockRankings = [
  {
    rank: 1,
    wallet: "0x1234...5678",
    avatar: "/images/avatars/annette-black.png",
    username: "CryptoKing",
    totalProgress: 245.5,
    suiAccumulated: 1250.8,
    activeRentals: 5,
    completedRaces: 3,
    isCurrentUser: false
  },
  {
    rank: 2,
    wallet: "0x2345...6789",
    avatar: "/images/avatars/dianne-russell.png",
    username: "NFTQueen",
    totalProgress: 198.2,
    suiAccumulated: 980.4,
    activeRentals: 4,
    completedRaces: 2,
    isCurrentUser: false
  },
  {
    rank: 3,
    wallet: "0x3456...7890",
    avatar: "/images/avatars/cameron-williamson.png",
    username: "DigitalNomad",
    totalProgress: 167.8,
    suiAccumulated: 845.6,
    activeRentals: 3,
    completedRaces: 1,
    isCurrentUser: false
  },
  {
    rank: 12,
    wallet: "0x9876...5432",
    avatar: "/images/avatars/robert-fox.png",
    username: "You",
    totalProgress: 67.5,
    suiAccumulated: 245.8,
    activeRentals: 3,
    completedRaces: 0,
    isCurrentUser: true
  },
]

const mockLeaderboard = Array.from({ length: 50 }, (_, i) => ({
  rank: i + 1,
  wallet: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
  username: `User${i + 1}`,
  totalProgress: Math.random() * 300,
  suiAccumulated: Math.random() * 2000,
  activeRentals: Math.floor(Math.random() * 10),
  completedRaces: Math.floor(Math.random() * 5),
  isCurrentUser: i === 11
}))

export function Rankings() {
  const [view, setView] = useState("top") // "top" or "full"
  
  const currentUser = mockRankings.find(user => user.isCurrentUser)
  const topUsers = mockRankings.filter(user => !user.isCurrentUser).slice(0, 3)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <Trophy className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Rankings</h1>
          <p className="text-muted-foreground">See how you stack up against other Race2Own competitors</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === "top" ? "default" : "outline"}
            onClick={() => setView("top")}
            className={view === "top" ? "bg-primary text-primary-foreground" : ""}
          >
            Top Players
          </Button>
          <Button
            variant={view === "full" ? "default" : "outline"}
            onClick={() => setView("full")}
            className={view === "full" ? "bg-primary text-primary-foreground" : ""}
          >
            Full Leaderboard
          </Button>
        </div>
      </motion.div>

      {view === "top" ? (
        <>
          {/* Your Rank Card */}
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Your Current Rank
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(currentUser.rank)}
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRankBadgeColor(currentUser.rank)}`}>
                          #{currentUser.rank}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{currentUser.username}</p>
                        <p className="text-sm text-muted-foreground">{currentUser.wallet}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{currentUser.totalProgress}%</p>
                      <p className="text-sm text-muted-foreground">{currentUser.suiAccumulated} SUI</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Top 3 Podium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {topUsers.map((user, index) => (
              <Card 
                key={user.rank} 
                className={`bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 ${
                  user.rank === 1 ? 'ring-2 ring-yellow-500/50' : ''
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-bold mb-4 ${getRankBadgeColor(user.rank)}`}>
                    #{user.rank}
                  </div>
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-foreground mb-1">{user.username}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{user.wallet}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-primary">{user.totalProgress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SUI</span>
                      <span className="font-semibold text-secondary">{user.suiAccumulated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Races Won</span>
                      <span className="font-semibold text-foreground">{user.completedRaces}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <MoreVertical className="w-4 h-4 mr-2" />
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Buy Progress%
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Players</CardTitle>
                <Trophy className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">1,247</div>
                <p className="text-xs text-muted-foreground mt-1">+12% this week</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total SUI Volume</CardTitle>
                <DollarSign className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">45.2K</div>
                <p className="text-xs text-muted-foreground mt-1">Across all races</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">34.7%</div>
                <p className="text-xs text-muted-foreground mt-1">Per active player</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed Races</CardTitle>
                <Medal className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">156</div>
                <p className="text-xs text-muted-foreground mt-1">NFTs won</p>
              </CardContent>
            </Card>
          </motion.div>
        </>
      ) : (
        /* Full Leaderboard */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Full Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockLeaderboard.slice(0, 20).map((user, index) => (
                  <div 
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      user.isCurrentUser 
                        ? 'bg-primary/10 border border-primary/50' 
                        : 'bg-muted/20 hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}
                        <span className={`px-2 py-1 rounded text-sm font-bold ${getRankBadgeColor(user.rank)}`}>
                          #{user.rank}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {user.isCurrentUser ? 'You' : user.username}
                        </p>
                        <p className="text-sm text-muted-foreground">{user.wallet}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-primary">{user.totalProgress.toFixed(1)}%</p>
                        <p className="text-muted-foreground">Progress</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-secondary">{user.suiAccumulated.toFixed(1)}</p>
                        <p className="text-muted-foreground">SUI</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">{user.completedRaces}</p>
                        <p className="text-muted-foreground">Won</p>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Buy Progress%
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Sell Progress%
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Load More Rankings
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
