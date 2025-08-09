import React, { useState, useEffect } from "react"
import Image from "next/image"
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
DialogDescription,
DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Calendar, Info, Zap } from 'lucide-react'
import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from "@/components/ui/tooltip"

interface RentModalProps {
isOpen: boolean
onClose: () => void
nft: {
  id: number
  name: string
  image: string
  priceToOwn: string // e.g., "100 USDT"
  minRent: string // e.g., "1.5 USDT/day"
  currentProgress: number
} | null
}

export function RentModal({ isOpen, onClose, nft }: RentModalProps) {
const parsedPriceToOwn = nft ? parseFloat(nft.priceToOwn.split(" ")[0]) : 0
const parsedMinRentPerDay = nft ? parseFloat(nft.minRent.split(" ")[0]) : 0

const [rentRatePerDay, setRentRatePerDay] = useState(parsedMinRentPerDay)
const [rentalDurationDays, setRentalDurationDays] = useState(7) // Default to 7 days

useEffect(() => {
  if (isOpen && nft) {
    setRentRatePerDay(parsedMinRentPerDay)
    setRentalDurationDays(7)
  }
}, [isOpen, nft, parsedMinRentPerDay])

const handleRentRateChange = (value: number | number[]) => {
  const newRate = Array.isArray(value) ? value[0] : value
  setRentRatePerDay(newRate)
}

const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value)
  setRentalDurationDays(isNaN(value) ? 0 : Math.max(1, Math.min(30, value))) // Duration 1-30 days
}

const estimatedDaysToOwn =
  rentRatePerDay > 0 && parsedPriceToOwn > 0
    ? (parsedPriceToOwn / rentRatePerDay).toFixed(1)
    : "N/A"

const totalRentCost = (rentRatePerDay * rentalDurationDays).toFixed(2)

const isConfirmDisabled =
  !nft || rentRatePerDay <= 0 || rentalDurationDays <= 0 || isNaN(rentRatePerDay) || isNaN(rentalDurationDays)

const maxRentRate = Math.min(20, parsedMinRentPerDay * 5 > 0 ? parsedMinRentPerDay * 5 : 10); // Cap max at 20, or 10 if min is very small

return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px] bg-muted border-border text-foreground">
      <DialogHeader>
        <DialogTitle className="text-foreground text-2xl">Rent NFT — {nft?.name}</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Set your terms and start competing for ownership.
        </DialogDescription>
      </DialogHeader>

      {nft && (
        <div className="grid gap-6 py-4">
          {/* NFT Preview */}
          <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border">
            <Image
              src={nft.image || "/placeholder.svg"}
              alt={nft.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-foreground">{nft.name}</h4>
              <p className="text-sm text-muted-foreground">Full Price: {nft.priceToOwn}</p>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Current Progress</span>
                  <span className="text-xs font-semibold text-primary">{nft.currentProgress}%</span>
                </div>
                <Progress value={nft.currentProgress} className="h-1.5" />
              </div>
            </div>
          </div>

          {/* Rent Rate Selection */}
          <div className="space-y-4">
            <Label htmlFor="rent-rate" className="text-base text-foreground flex items-center gap-2">
              Set Your Rent Rate Per Day (SUI)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      Offering a higher rent rate increases your speed toward ownership.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="rent-rate"
                type="number"
                step="0.1"
                min={parsedMinRentPerDay}
                max={maxRentRate}
                value={rentRatePerDay}
                onChange={(e) => handleRentRateChange(parseFloat(e.target.value))}
                className="w-24 text-foreground bg-background/50 border-border"
              />
              <Slider
                min={parsedMinRentPerDay}
                max={maxRentRate}
                step={0.1}
                value={[rentRatePerDay]}
                onValueChange={handleRentRateChange}
                className="flex-1"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Estimated Days to Own: <span className="font-semibold text-primary">{estimatedDaysToOwn} days</span>
            </p>
          </div>

          {/* Rental Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-base text-foreground">
              Select Rental Duration (Days)
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="30"
              value={rentalDurationDays}
              onChange={handleDurationChange}
              className="w-full text-foreground bg-background/50 border-border"
            />
            <p className="text-sm text-muted-foreground">Duration can be between 1 and 30 days.</p>
          </div>

          {/* Payment Summary */}
          <div className="space-y-2 p-4 bg-background/50 rounded-lg border border-border">
            <h5 className="text-base font-semibold text-foreground">Payment Summary</h5>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Rent Rate per Day:</span>
              <span className="font-medium text-foreground">{rentRatePerDay.toFixed(2)} SUI</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Duration:</span>
              <span className="font-medium text-foreground">{rentalDurationDays} days</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border/50">
              <span>Total Rent Payment:</span>
              <span className="text-primary">{totalRentCost} SUI</span>
            </div>
            <p className="text-xs text-muted-foreground text-right">Wallet Balance: 150.00 SUI</p> {/* Dummy balance */}
          </div>
        </div>
      )}

      <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
        <Button variant="ghost" onClick={onClose} className="text-muted-foreground hover:text-foreground hover:underline">
          Cancel
        </Button>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold flex items-center gap-2 animate-glow-pulse"
          disabled={isConfirmDisabled}
          onClick={() => {
            // Handle confirm logic here
            console.log("Confirming rental:", {
              nftId: nft?.id,
              rentRatePerDay,
              rentalDurationDays,
              totalRentCost,
            })
            onClose()
          }}
        >
          <Zap className="w-4 h-4" />
          Confirm Rental
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
}
