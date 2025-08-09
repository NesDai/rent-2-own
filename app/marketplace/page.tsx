"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ChevronDown } from 'lucide-react'
import { motion } from "framer-motion"
import { NFTCard } from "@/components/nft-card" // Import the new NFTCard
import { RentModal } from "@/components/rent-modal" // Import the new RentModal
import { ListModal } from "@/components/create-listing-modal"
import { mockNFTs } from "@/utils/mock_nfts" // Import the mock NFTs

const categories = ["All", "Gaming", "Art", "Avatar", "Collectible"]

export default function MarketplacePage() {
const [nfts, setNfts] = useState(mockNFTs);
const [filter, setFilter] = useState("All")
const [sortBy, setSortBy] = useState("featured")
const [selectedNft, setSelectedNft] = useState<typeof nfts[0] | null>(null)
const [isRentModalOpen, setIsRentModalOpen] = useState(false)
const [isCreateListingModalOpen, setIsCreateListingModalOpen] = useState(false)

const filteredNFTs =
  filter === "All" ? nfts : nfts.filter((nft) => nft.category === filter);

const sortedNFTs = [...filteredNFTs].sort((a, b) => {
  switch (sortBy) {
    case "progress":
      return b.currentProgress - a.currentProgress
    case "price-low":
      return parseFloat(a.priceToOwn) - parseFloat(b.priceToOwn)
    case "price-high":
      return parseFloat(b.priceToOwn) - parseFloat(a.priceToOwn)
    case "ending-soon":
      // This requires more complex parsing of timeLeft, for now, just return 0
      // In a real app, you'd convert "3d 14h" to a comparable number (e.g., total hours)
      return 0
    default:
      return 0
  }
})

const handleRentNowClick = (nft: typeof nfts[0]) => {
  setSelectedNft(nft)
  setIsRentModalOpen(true)
}

return (
  <div className="min-h-screen bg-background">
    {/* Persistent Header */}
    <Header />

    {/* Main Content */}
    <main className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="w-full py-16 px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Available NFTs for{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Competitive Renting
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your journey to NFT ownership. Rent, compete, and win your
              favorite digital assets.
            </p>
          </motion.div>

          {/* Filters and Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className={`rounded-full ${
                    filter === category
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>{" "}
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-card border border-border rounded-full px-4 py-2 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="progress">Highest Progress</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="ending-soon">Ending Soon</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </motion.div>
          <Button
            onClick={() => setIsCreateListingModalOpen(true)}
          >
            Add Listing
            </Button>
        </div>
      </section>

      {/* NFT Grid */}
      <section className="w-full px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NFTCard nft={nft} onRentNowClick={handleRentNowClick} />
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-full font-semibold text-lg bg-transparent"
            >
              Load More NFTs
            </Button>
          </motion.div>
        </div>
      </section>
    </main>

    {/* Rent Modal */}
    <RentModal
      isOpen={isRentModalOpen}
      onClose={() => setIsRentModalOpen(false)}
      nft={selectedNft}
    />

    <ListModal
      isOpen={isCreateListingModalOpen}
      onClose={() => setIsCreateListingModalOpen(false)}
      onCreateListing={(newNft) => {
        setNfts((prev) => [...prev, newNft]);
        setIsCreateListingModalOpen(false);
      }}
    />
  </div>
);
}
