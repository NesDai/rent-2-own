"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, Timer, TrendingUp, DollarSign, Calendar, Target, Zap, Trophy } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockRentals = [
  {
    id: 1,
    name: "Cosmic Warrior #1337",
    image: "/cosmic-warrior-nft.png",
    myProgress: 45,
    totalProgress: 85,
    rentRate: "12 SUI/week",
    timeLeft: "2d 4h",
    status: "active",
    suiSpent: 54,
    startDate: "2024-01-15",
    endDate: "2024-01-29",
    canResell: true,
    category: "Gaming",
    // New fields
    isClone: true,
    cloneId: "Clone #3",
    originalSupplyLeft: 8,
    maxSupply: 10,
    canMintOriginal: false // Will be true when reaches 100%
  },
  {
    id: 2,
    name: "Digital Dreamscape",
    image: "/digital-dreamscape.png",
    myProgress: 30,
    totalProgress: 62,
    rentRate: "10 SUI/week",
    timeLeft: "5d 12h",
    status: "active",
    suiSpent: 30,
    startDate: "2024-01-20",
    endDate: "2024-02-03",
    canResell: false,
    category: "Art",
    isClone: false,
    cloneId: null,
    originalSupplyLeft: 1,
    maxSupply: 1,
    canMintOriginal: false
  },
  {
    id: 3,
    name: "Quantum Crystal",
    image: "/quantum-crystal-nft.png",
    myProgress: 15,
    totalProgress: 25,
    rentRate: "18 SUI/week",
    timeLeft: "6d 20h",
    status: "queued",
    suiSpent: 0,
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    canResell: true,
    category: "Collectible",
    isClone: true,
    cloneId: "Clone #1",
    originalSupplyLeft: 5,
    maxSupply: 5,
    canMintOriginal: false
  },
]

export function MyRentals() {
  const [filter, setFilter] = useState("all")

  const filteredRentals = filter === "all" 
    ? mockRentals 
    : mockRentals.filter(rental => rental.status === filter)

  const totalSpent = mockRentals.reduce((sum, rental) => sum + rental.suiSpent, 0)
  const totalProgress = mockRentals.reduce((sum, rental) => sum + rental.myProgress, 0)
  const activeRentals = mockRentals.filter(rental => rental.status === 'active').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">My Rentals</h1>
        <p className="text-muted-foreground">Track your rental progress and manage your NFT competitions</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total SUI Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalSpent}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all rentals</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalProgress}%</div>
            <p className="text-xs text-muted-foreground mt-1">Combined ownership</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeRentals}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently renting</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-2"
      >
        {["all", "active", "queued", "completed"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
            className={`capitalize ${
              filter === status 
                ? "bg-primary text-primary-foreground" 
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {status}
          </Button>
        ))}
      </motion.div>

      {/* Rentals Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredRentals.map((rental, index) => (
          <motion.div
            key={rental.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={rental.image || "/placeholder.svg"}
                  alt={rental.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {rental.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge
                    variant="outline"
                    className={`${
                      rental.status === 'active' ? 'border-green-500 text-green-500' :
                      rental.status === 'queued' ? 'border-yellow-500 text-yellow-500' :
                      'border-gray-500 text-gray-500'
                    } bg-background/80 backdrop-blur-sm`}
                  >
                    {rental.status}
                  </Badge>
                  {rental.canResell && (
                    <Badge variant="outline" className="border-secondary text-secondary bg-background/80 backdrop-blur-sm">
                      Resellable
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {rental.name}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Target className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {rental.canResell && rental.myProgress > 0 && (
                        <DropdownMenuItem>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Resell Progress
                        </DropdownMenuItem>
                      )}
                      {rental.status === 'active' && (
                        <DropdownMenuItem>
                          <Zap className="mr-2 h-4 w-4" />
                          Extend Rental
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Clone Information */}
                {rental.isClone && (
                  <div className="mb-4 p-3 bg-secondary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-secondary text-secondary">
                        {rental.cloneId}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Temporary Clone</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>• Clone will self-destruct when race ends</p>
                      <p>• {rental.originalSupplyLeft} original NFTs still available</p>
                      {rental.myProgress >= 100 && (
                        <p className="text-primary font-medium">• Ready to mint original NFT!</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Progress Bars */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">My Progress</span>
                      <span className="text-sm font-semibold text-primary">{rental.myProgress}%</span>
                    </div>
                    <Progress value={rental.myProgress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Total Progress</span>
                      <span className="text-sm font-semibold text-foreground">{rental.totalProgress}%</span>
                    </div>
                    <Progress value={rental.totalProgress} className="h-2 opacity-60" />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Rent Rate</p>
                    <p className="font-semibold text-foreground">{rental.rentRate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">SUI Spent</p>
                    <p className="font-semibold text-foreground">{rental.suiSpent}</p>
                  </div>
                </div>

                {/* Time Info */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Timer className="w-4 h-4" />
                    <span>{rental.timeLeft}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {rental.status === 'active' ? 'Ends' : 'Starts'}: {new Date(rental.endDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Mint Original Button */}
                {rental.canMintOriginal && rental.myProgress >= 100 && (
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 mb-2">
                    <Trophy className="w-4 h-4 mr-2" />
                    Mint Original NFT
                  </Button>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    View Details
                  </Button>
                  {rental.canResell && rental.myProgress > 0 && (
                    <Button 
                      variant="outline" 
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      Resell
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredRentals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No rentals found</h3>
          <p className="text-muted-foreground mb-6">
            {filter === "all" 
              ? "You haven't rented any NFTs yet." 
              : `No ${filter} rentals found.`}
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Browse Available NFTs
          </Button>
        </motion.div>
      )}
    </div>
  )
}
