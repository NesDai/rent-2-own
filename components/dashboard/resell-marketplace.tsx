"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart, DollarSign, TrendingUp, Package, Filter, Search, Plus, Percent } from 'lucide-react'
import { Input } from "@/components/ui/input"

const mockResellNFTs = [
  {
    id: 1,
    originalItem: "Cosmic Warrior #1337",
    image: "/cosmic-warrior-nft.png",
    seller: "0x1234...5678",
    sellerUsername: "CryptoKing",
    progressPercent: 25,
    price: 18.5, // 80% of accumulated SUI (23.125 * 0.8)
    originalAccumulated: 23.125,
    discount: 20, // 20% discount
    category: "Gaming",
    timeLeft: "2d 4h",
    isHot: true
  },
  {
    id: 2,
    originalItem: "Digital Dreamscape",
    image: "/digital-dreamscape.png",
    seller: "0x2345...6789",
    sellerUsername: "NFTQueen",
    progressPercent: 15,
    price: 9.6, // 80% of accumulated SUI (12 * 0.8)
    originalAccumulated: 12,
    discount: 20,
    category: "Art",
    timeLeft: "5d 12h",
    isHot: false
  },
  {
    id: 3,
    originalItem: "Cyber Punk Avatar",
    image: "/cyberpunk-avatar-nft.png",
    seller: "0x3456...7890",
    sellerUsername: "DigitalNomad",
    progressPercent: 35,
    price: 28, // 80% of accumulated SUI (35 * 0.8)
    originalAccumulated: 35,
    discount: 20,
    category: "Avatar",
    timeLeft: "1d 8h",
    isHot: true
  },
  {
    id: 4,
    originalItem: "Quantum Crystal",
    image: "/quantum-crystal-nft.png",
    seller: "0x4567...8901",
    sellerUsername: "CrystalMiner",
    progressPercent: 10,
    price: 12, // 80% of accumulated SUI (15 * 0.8)
    originalAccumulated: 15,
    discount: 20,
    category: "Collectible",
    timeLeft: "3d 16h",
    isHot: false
  },
]

const mockMyResellNFTs = [
  {
    id: 1,
    originalItem: "Space Explorer",
    image: "/space-explorer-nft.png",
    progressPercent: 20,
    price: 16, // 80% of accumulated SUI (20 * 0.8)
    originalAccumulated: 20,
    listedDate: "2024-01-25",
    status: "active",
    views: 12,
    category: "Gaming"
  },
  {
    id: 2,
    originalItem: "Neon Warrior",
    image: "/cosmic-warrior-nft.png",
    progressPercent: 30,
    price: 24, // 80% of accumulated SUI (30 * 0.8)
    originalAccumulated: 30,
    listedDate: "2024-01-23",
    status: "sold",
    views: 28,
    category: "Gaming"
  },
]

export function ResellMarketplace() {
  const [activeTab, setActiveTab] = useState("marketplace") // "marketplace" or "my-listings"
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNFTs = mockResellNFTs.filter(nft => {
    const matchesCategory = filter === "all" || nft.category.toLowerCase() === filter.toLowerCase()
    const matchesSearch = nft.originalItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.sellerUsername.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalVolume = mockResellNFTs.reduce((sum, nft) => sum + nft.price, 0)
  const avgDiscount = 20 // Fixed 20% discount
  const activeListings = mockResellNFTs.length

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Progress% Resell Market</h1>
          <p className="text-muted-foreground">Buy and sell NFT ownership progress at discounted rates</p>
        </div>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Plus className="w-4 h-4 mr-2" />
          List Progress%
        </Button>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex gap-2"
      >
        <Button
          variant={activeTab === "marketplace" ? "default" : "outline"}
          onClick={() => setActiveTab("marketplace")}
          className={activeTab === "marketplace" ? "bg-primary text-primary-foreground" : ""}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Marketplace
        </Button>
        <Button
          variant={activeTab === "my-listings" ? "default" : "outline"}
          onClick={() => setActiveTab("my-listings")}
          className={activeTab === "my-listings" ? "bg-primary text-primary-foreground" : ""}
        >
          <Package className="w-4 h-4 mr-2" />
          My Listings
        </Button>
      </motion.div>

      {activeTab === "marketplace" ? (
        <>
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Volume</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalVolume} SUI</div>
                <p className="text-xs text-muted-foreground mt-1">Available for purchase</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Discount</CardTitle>
                <Percent className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{avgDiscount}%</div>
                <p className="text-xs text-muted-foreground mt-1">Below market value</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{activeListings}</div>
                <p className="text-xs text-muted-foreground mt-1">Progress% NFTs</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by NFT name or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "gaming", "art", "avatar", "collectible"].map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className={`capitalize ${
                    filter === category 
                      ? "bg-primary text-primary-foreground" 
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* NFT Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-secondary/50 transition-all duration-300 group">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.originalItem}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {nft.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      {nft.isHot && (
                        <Badge variant="outline" className="border-red-500 text-red-500 bg-background/80 backdrop-blur-sm">
                          Hot!
                        </Badge>
                      )}
                      <Badge variant="outline" className="border-secondary text-secondary bg-background/80 backdrop-blur-sm">
                        -{nft.discount}%
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors mb-2">
                      {nft.originalItem}
                    </h3>

                    {/* Seller Info */}
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <span className="text-muted-foreground">Seller:</span>
                      <span className="font-medium text-foreground">{nft.sellerUsername}</span>
                      <span className="text-muted-foreground">({nft.seller})</span>
                    </div>

                    {/* Progress Info */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Progress% for Sale</span>
                        <span className="text-lg font-bold text-secondary">{nft.progressPercent}%</span>
                      </div>
                      <Progress value={nft.progressPercent} className="h-2" />
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sale Price</p>
                        <p className="font-bold text-secondary text-lg">{nft.price} SUI</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Original Value</p>
                        <p className="font-semibold text-foreground line-through">{nft.originalAccumulated} SUI</p>
                      </div>
                    </div>

                    {/* Savings Highlight */}
                    <div className="bg-secondary/10 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">You Save:</span>
                        <span className="font-bold text-secondary">
                          {(nft.originalAccumulated - nft.price).toFixed(1)} SUI ({nft.discount}%)
                        </span>
                      </div>
                    </div>

                    {/* Time Left */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-muted-foreground">Original Race Ends:</span>
                      <span className="font-medium text-foreground">{nft.timeLeft}</span>
                    </div>

                    {/* Purchase Button */}
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full font-semibold flex items-center gap-2 group">
                      <ShoppingCart className="w-4 h-4 group-hover:animate-pulse" />
                      Buy Progress% - {nft.price} SUI
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-secondary" />
                  How Progress% Reselling Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">20% Discount</h4>
                    <p className="text-muted-foreground">All Progress% NFTs are sold at 80% of their accumulated SUI value, giving buyers a 20% discount.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Instant Progress</h4>
                    <p className="text-muted-foreground">When you buy, the progress% is immediately transferred to your ranking, boosting your position.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Split Payout</h4>
                    <p className="text-muted-foreground">Seller gets 20% of accumulated SUI, original lister gets 60%, and 20% is burned from the system.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      ) : (
        /* My Listings Tab */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* My Listings Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {mockMyResellNFTs.filter(nft => nft.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Progress% NFTs listed</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {mockMyResellNFTs.reduce((sum, nft) => sum + nft.price, 0)} SUI
                </div>
                <p className="text-xs text-muted-foreground mt-1">Listed for sale</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {mockMyResellNFTs.reduce((sum, nft) => sum + nft.views, 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Across all listings</p>
              </CardContent>
            </Card>
          </div>

          {/* My Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMyResellNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.originalItem}
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
                        className={`${
                          nft.status === 'active' ? 'border-green-500 text-green-500' :
                          nft.status === 'sold' ? 'border-blue-500 text-blue-500' :
                          'border-gray-500 text-gray-500'
                        } bg-background/80 backdrop-blur-sm`}
                      >
                        {nft.status}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {nft.originalItem}
                    </h3>

                    {/* Progress Info */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Progress% Listed</span>
                        <span className="text-lg font-bold text-primary">{nft.progressPercent}%</span>
                      </div>
                      <Progress value={nft.progressPercent} className="h-2" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Listed Price</p>
                        <p className="font-bold text-primary">{nft.price} SUI</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-semibold text-foreground">{nft.views}</p>
                      </div>
                    </div>

                    {/* Listing Info */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-muted-foreground">Listed:</span>
                      <span className="font-medium text-foreground">
                        {new Date(nft.listedDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {nft.status === 'active' ? (
                        <>
                          <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            Edit Listing
                          </Button>
                          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            Remove
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" className="w-full border-border text-muted-foreground" disabled>
                          {nft.status === 'sold' ? 'Sold' : 'Inactive'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {mockMyResellNFTs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Progress% NFTs Listed</h3>
              <p className="text-muted-foreground mb-6">
                You haven't listed any progress% for resale yet.
              </p>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Plus className="w-4 h-4 mr-2" />
                List Your First Progress%
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
