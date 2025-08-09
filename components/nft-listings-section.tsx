"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Timer, Users, Zap } from "lucide-react"

const mockNFTs = [
  {
    id: 1,
    name: "Cosmic Warrior #1337",
    image: "/cosmic-warrior-nft.png",
    priceToOwn: "50 SUI",
    minRent: "2.5 SUI",
    currentProgress: 35,
    timeLeft: "5d 12h",
    competitors: 3,
    category: "Gaming",
  },
  {
    id: 2,
    name: "Digital Dreamscape",
    image: "/digital-dreamscape.png",
    priceToOwn: "75 SUI",
    minRent: "3.8 SUI",
    currentProgress: 62,
    timeLeft: "2d 8h",
    competitors: 5,
    category: "Art",
  },
  {
    id: 3,
    name: "Cyber Punk Avatar",
    image: "/cyberpunk-avatar-nft.png",
    priceToOwn: "30 SUI",
    minRent: "1.5 SUI",
    currentProgress: 18,
    timeLeft: "7d 3h",
    competitors: 2,
    category: "Avatar",
  },
  {
    id: 4,
    name: "Quantum Crystal",
    image: "/quantum-crystal-nft.png",
    priceToOwn: "120 SUI",
    minRent: "6.0 SUI",
    currentProgress: 89,
    timeLeft: "1d 4h",
    competitors: 8,
    category: "Collectible",
  },
  {
    id: 5,
    name: "Space Explorer",
    image: "/space-explorer-nft.png",
    priceToOwn: "45 SUI",
    minRent: "2.2 SUI",
    currentProgress: 43,
    timeLeft: "4d 16h",
    competitors: 4,
    category: "Gaming",
  },
]

export function NFTListingsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState("All")

  const categories = ["All", "Gaming", "Art", "Avatar", "Collectible"]

  const filteredNFTs = filter === "All" ? mockNFTs : mockNFTs.filter((nft) => nft.category === filter)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredNFTs.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredNFTs.length) % filteredNFTs.length)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-red-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <section id="nft-listings" className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-none mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Live NFT Races</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join the competition and start building ownership of premium NFTs
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={`rounded-full ${
                  filter === category
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredNFTs.slice(0, 6).map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {filteredNFTs.map((nft) => (
                  <div key={nft.id} className="w-full flex-shrink-0 px-2">
                    <NFTCard nft={nft} />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {filteredNFTs.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-semibold text-lg">
            View All NFTs
          </Button>
        </div>
      </div>
    </section>
  )
}

function NFTCard({ nft }: { nft: (typeof mockNFTs)[0] }) {
  return (
    <div className="group bg-card/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={nft.image || "/placeholder.svg"}
          alt={nft.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {nft.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className={`${nft.currentProgress >= 80 ? "border-red-500 text-red-500" : "border-primary text-primary"} bg-background/80 backdrop-blur-sm`}
          >
            {nft.currentProgress >= 80 ? "Hot!" : "Active"}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {nft.name}
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-muted-foreground">Price to Own</p>
            <p className="font-semibold text-foreground">{nft.priceToOwn}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Min Rent/Week</p>
            <p className="font-semibold text-foreground">{nft.minRent}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Ownership Progress</span>
            <span className="text-sm font-semibold text-foreground">{nft.currentProgress}%</span>
          </div>
          <Progress value={nft.currentProgress} className="h-2" />
        </div>

        {/* Race Info */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Timer className="w-4 h-4" />
            <span>{nft.timeLeft}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{nft.competitors} competing</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold flex items-center gap-2 group">
          <Zap className="w-4 h-4 group-hover:animate-pulse" />
          Rent Now
        </Button>
      </div>
    </div>
  )
}
