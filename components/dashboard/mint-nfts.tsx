"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Coins, Trophy, Timer, Target, Zap, AlertCircle, CheckCircle, Clock, Sparkles, ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const mockMintableNFTs = [
  {
    id: 1,
    name: "Cosmic Warrior #1337",
    image: "/cosmic-warrior-nft.png",
    progress: 100,
    canMint: true,
    cloneId: "Clone #3",
    originalSupplyLeft: 8,
    maxSupply: 10,
    mintPrice: 0, // Free since they reached 100%
    category: "Gaming",
    completedAt: "2024-01-28T10:30:00Z",
    suiSpent: 84,
    timeToComplete: "2 weeks"
  },
  {
    id: 2,
    name: "Digital Dreamscape",
    image: "/digital-dreamscape.png",
    progress: 85,
    canMint: false,
    cloneId: "Clone #7",
    originalSupplyLeft: 3,
    maxSupply: 5,
    mintPrice: 15, // Early mint fee
    category: "Art",
    suiSpent: 45,
    timeToComplete: "1.5 weeks"
  },
  {
    id: 3,
    name: "Quantum Crystal",
    image: "/quantum-crystal-nft.png",
    progress: 100,
    canMint: true,
    cloneId: "Clone #1",
    originalSupplyLeft: 2,
    maxSupply: 3,
    mintPrice: 0,
    category: "Collectible",
    completedAt: "2024-01-25T14:20:00Z",
    suiSpent: 126,
    timeToComplete: "3 weeks"
  }
]

export function MintNFTs() {
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [mintQuantity, setMintQuantity] = useState(1)
  const [customPrice, setCustomPrice] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const readyToMint = mockMintableNFTs.filter(nft => nft.canMint)
  const inProgress = mockMintableNFTs.filter(nft => !nft.canMint)

  const handleMint = (nft: any) => {
    if (!nft) {
      console.error("No NFT selected for minting")
      return
    }
    
    // Simulate minting process
    console.log(`Minting ${mintQuantity} of ${nft.name}`)
    setIsDialogOpen(false)
    setSelectedNFT(null)
    setMintQuantity(1)
  }

  const openMintDialog = (nft: any) => {
    setSelectedNFT(nft)
    setIsDialogOpen(true)
  }

  const closeMintDialog = () => {
    setIsDialogOpen(false)
    setSelectedNFT(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Mint NFTs</h1>
        <p className="text-muted-foreground">Mint your earned NFTs and manage your collection</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ready to Mint</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{readyToMint.length}</div>
            <p className="text-xs text-muted-foreground mt-1">NFTs at 100% progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{inProgress.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Still renting</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Minted</CardTitle>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7</div>
            <p className="text-xs text-muted-foreground mt-1">Original NFTs owned</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ready to Mint Section */}
      {readyToMint.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h2 className="text-2xl font-bold text-foreground">Ready to Mint</h2>
            <Badge variant="outline" className="border-green-500 text-green-500">
              {readyToMint.length} Available
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readyToMint.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-green-500/50 transition-all duration-300 group">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
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
                      <Badge className="bg-green-500 text-white">
                        <Trophy className="w-3 h-3 mr-1" />
                        Complete
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between text-white text-sm">
                        <span>{nft.cloneId}</span>
                        <span>{nft.originalSupplyLeft}/{nft.maxSupply} left</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{nft.name}</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-semibold text-green-500">{nft.progress}%</span>
                      </div>
                      <Progress value={nft.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">SUI Spent</p>
                        <p className="font-semibold text-foreground">{nft.suiSpent}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time Taken</p>
                        <p className="font-semibold text-foreground">{nft.timeToComplete}</p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">Ready to Mint!</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Completed on {new Date(nft.completedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-green-500 text-white hover:bg-green-600"
                      onClick={() => openMintDialog(nft)}
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      Mint Original NFT
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* In Progress Section */}
      {inProgress.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-orange-500" />
            <h2 className="text-2xl font-bold text-foreground">In Progress</h2>
            <Badge variant="outline" className="border-orange-500 text-orange-500">
              {inProgress.length} Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgress.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-orange-500/50 transition-all duration-300 group">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
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
                      <Badge variant="outline" className="border-orange-500 text-orange-500 bg-background/80 backdrop-blur-sm">
                        {nft.progress}%
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between text-white text-sm">
                        <span>{nft.cloneId}</span>
                        <span>{nft.originalSupplyLeft}/{nft.maxSupply} left</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{nft.name}</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-semibold text-orange-500">{nft.progress}%</span>
                      </div>
                      <Progress value={nft.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">SUI Spent</p>
                        <p className="font-semibold text-foreground">{nft.suiSpent}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Early Mint</p>
                        <p className="font-semibold text-foreground">{nft.mintPrice} SUI</p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Timer className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-500">Still Renting</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {100 - nft.progress}% remaining to complete
                      </p>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      disabled
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Continue Renting
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {mockMintableNFTs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coins className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No NFTs to mint</h3>
          <p className="text-muted-foreground mb-6">
            Start renting NFTs to earn the right to mint original copies.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Browse Available NFTs
          </Button>
        </motion.div>
      )}

      {/* Mint Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mint Original NFT</DialogTitle>
            <DialogDescription>
              You've reached 100% progress! Mint your original NFT now.
            </DialogDescription>
          </DialogHeader>
          
          {selectedNFT && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedNFT.image || "/placeholder.svg"}
                  alt={selectedNFT.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold">{selectedNFT.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedNFT.cloneId}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Supply Remaining:</span>
                  <span className="text-sm font-semibold">{selectedNFT.originalSupplyLeft}/{selectedNFT.maxSupply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Mint Cost:</span>
                  <span className="text-sm font-semibold text-green-500">FREE</span>
                </div>
              </div>

              <div className="p-3 bg-green-500/10 rounded-lg">
                <p className="text-sm text-green-600">
                  🎉 Congratulations! You've earned this NFT by reaching 100% progress.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeMintDialog}>
              Cancel
            </Button>
            <Button 
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={() => handleMint(selectedNFT)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Mint Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
