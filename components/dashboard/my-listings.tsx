"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, Edit, Pause, Play, Trash2, Eye, Users, Timer, DollarSign, Package } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockListings = [
  {
    id: 1,
    name: "Cosmic Warrior #1337",
    image: "/cosmic-warrior-nft.png",
    price: "100 SUI",
    minRent: "10 SUI/week",
    currentProgress: 85,
    status: "active",
    competitors: 4,
    timeLeft: "2d 4h",
    allowResell: true,
    totalEarned: "85 SUI",
    category: "Gaming",
    // New multi-renter fields
    enableMultiRenter: true,
    maxConcurrentRenters: 5,
    currentRenters: 3,
    maxSupply: 10,
    mintedSupply: 2,
    isLimitedEdition: true
  },
  {
    id: 2,
    name: "Digital Dreamscape",
    image: "/digital-dreamscape.png",
    price: "75 SUI",
    minRent: "8 SUI/week",
    currentProgress: 62,
    status: "active",
    competitors: 6,
    timeLeft: "5d 12h",
    allowResell: false,
    totalEarned: "46.5 SUI",
    category: "Art",
    enableMultiRenter: false,
    maxConcurrentRenters: 1,
    currentRenters: 1,
    maxSupply: 1,
    mintedSupply: 0,
    isLimitedEdition: false
  },
  {
    id: 3,
    name: "Cyber Punk Avatar",
    image: "/cyberpunk-avatar-nft.png",
    price: "120 SUI",
    minRent: "15 SUI/week",
    currentProgress: 25,
    status: "paused",
    competitors: 2,
    timeLeft: "6d 20h",
    allowResell: true,
    totalEarned: "30 SUI",
    category: "Avatar",
    enableMultiRenter: true,
    maxConcurrentRenters: 3,
    currentRenters: 0,
    maxSupply: 5,
    mintedSupply: 0,
    isLimitedEdition: true
  },
]

export function MyListings() {
  const [filter, setFilter] = useState("all")

  const filteredListings = filter === "all" 
    ? mockListings 
    : mockListings.filter(listing => listing.status === filter)

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
          <h1 className="text-3xl font-bold text-foreground mb-2">My Listings</h1>
          <p className="text-muted-foreground">Manage your NFT listings and track their performance</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Create New Listing
        </Button>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex gap-2"
      >
        {["all", "active", "paused", "completed"].map((status) => (
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

      {/* Listings Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredListings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {listing.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge
                    variant="outline"
                    className={`${
                      listing.status === 'active' ? 'border-green-500 text-green-500' :
                      listing.status === 'paused' ? 'border-yellow-500 text-yellow-500' :
                      'border-gray-500 text-gray-500'
                    } bg-background/80 backdrop-blur-sm`}
                  >
                    {listing.status}
                  </Badge>
                  {listing.allowResell && (
                    <Badge variant="outline" className="border-secondary text-secondary bg-background/80 backdrop-blur-sm">
                      Resellable
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {listing.name}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Listing
                      </DropdownMenuItem>
                      {listing.status === 'active' ? (
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Listing
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Resume Listing
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Listing
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Price to Own</p>
                    <p className="font-semibold text-foreground">{listing.price}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Rent</p>
                    <p className="font-semibold text-foreground">{listing.minRent}</p>
                  </div>
                </div>

                {/* Multi-Renter Info */}
                {listing.enableMultiRenter && (
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Multi-Renter Mode</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Active Renters:</span>
                        <span className="font-semibold text-foreground ml-1">
                          {listing.currentRenters}/{listing.maxConcurrentRenters}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Minted:</span>
                        <span className="font-semibold text-foreground ml-1">
                          {listing.mintedSupply}{listing.isLimitedEdition ? `/${listing.maxSupply}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Ownership Progress</span>
                    <span className="text-sm font-semibold text-foreground">{listing.currentProgress}%</span>
                  </div>
                  <Progress value={listing.currentProgress} className="h-2" />
                </div>

                {/* Race Info */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Timer className="w-3 h-3" />
                    <span>{listing.timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{listing.competitors}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span>{listing.totalEarned}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No listings found</h3>
          <p className="text-muted-foreground mb-6">
            {filter === "all" 
              ? "You haven't created any listings yet." 
              : `No ${filter} listings found.`}
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Create Your First Listing
          </Button>
        </motion.div>
      )}
    </div>
  )
}
