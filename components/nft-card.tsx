import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Timer, Users, Zap } from 'lucide-react'

interface NFTCardProps {
nft: {
  id: number
  name: string
  image: string
  priceToOwn: string
  minRent: string
  currentProgress: number
  timeLeft: string
  competitors: number
  category: string
}
onRentNowClick: (nft: any) => void // Callback for rent button
}

export function NFTCard({ nft, onRentNowClick }: NFTCardProps) {
return (
  <div className="group bg-card/30 backdrop-blur-sm rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105">
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
          className={`${
            nft.currentProgress >= 80 ? "border-red-500 text-red-500" : "border-primary text-primary"
          } bg-background/80 backdrop-blur-sm`}
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
          <p className="text-muted-foreground">Min Rent</p>
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
      <Button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold flex items-center gap-2 group/btn"
        onClick={() => onRentNowClick(nft)}
      >
        <Zap className="w-4 h-4 group-hover/btn:animate-pulse" />
        Rent Now
      </Button>
    </div>
  </div>
)
}
