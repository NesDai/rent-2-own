"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Upload, DollarSign, Calendar, Settings, Info, CheckCircle, AlertCircle, Percent, Users, TrendingUp } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CreateListing() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    minRentRate: "",
    allowResell: true,
    biddingCriteria: "highest_rate",
    image: null as File | null,
    // New multi-renter fields
    enableMultiRenter: false,
    maxConcurrentRenters: 1,
    maxSupply: 1,
    isLimitedEdition: false
  })

  const [step, setStep] = useState(1) // 1: Basic Info, 2: Pricing, 3: Settings, 4: Review

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateProgressPerDay = () => {
    if (!formData.price || !formData.minRentRate) return 0
    const price = parseFloat(formData.price)
    const rentRate = parseFloat(formData.minRentRate)
    return ((rentRate / 7) / price * 100).toFixed(2) // Daily progress percentage
  }

  const estimatedDaysToComplete = () => {
    const progressPerDay = parseFloat(calculateProgressPerDay())
    if (progressPerDay === 0) return "∞"
    return Math.ceil(100 / progressPerDay)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Basic Information</h3>
              <p className="text-muted-foreground mb-6">Tell us about your NFT and what makes it special.</p>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">NFT Image</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Drag and drop your NFT image here, or click to browse</p>
                <Button variant="outline">Choose File</Button>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">NFT Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Cosmic Warrior #1337"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your NFT, its rarity, utility, or any special features..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="avatar">Avatar</SelectItem>
                  <SelectItem value="collectible">Collectible</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Pricing & Economics</h3>
              <p className="text-muted-foreground mb-6">Set your NFT's value and rental terms.</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Total Price (SUI) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  placeholder="100"
                  className="pl-10"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">The total value renters need to accumulate to win your NFT</p>
            </div>

            {/* Min Rent Rate */}
            <div className="space-y-2">
              <Label htmlFor="minRentRate">Minimum Rent Rate (SUI/week) *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="minRentRate"
                  type="number"
                  placeholder="10"
                  className="pl-10"
                  value={formData.minRentRate}
                  onChange={(e) => handleInputChange("minRentRate", e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">The minimum weekly rent renters must pay</p>
            </div>

            {/* Economics Preview */}
            {formData.price && formData.minRentRate && (
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Economics Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{calculateProgressPerDay()}%</div>
                      <p className="text-muted-foreground">Progress per day</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary mb-1">{estimatedDaysToComplete()}</div>
                      <p className="text-muted-foreground">Days to complete</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {((parseFloat(formData.price) / parseFloat(formData.minRentRate)) * parseFloat(formData.minRentRate)).toFixed(0)}
                      </div>
                      <p className="text-muted-foreground">Min total earnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Advanced Settings</h3>
              <p className="text-muted-foreground mb-6">Configure how your listing behaves and who can interact with it.</p>
            </div>

            {/* Allow Resell */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="allowResell" className="text-base font-medium">Allow Progress% Reselling</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-medium mb-2">Progress% Reselling</p>
                              <p className="text-sm mb-2"><strong>Pro:</strong> Faster item sale through redistribution of Progress% to more users.</p>
                              <p className="text-sm"><strong>Con:</strong> Slight compromise in final profit, though it will still exceed 100% of item value.</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Allow renters to tokenize and resell their accumulated progress as NFTs
                    </p>
                  </div>
                  <Switch
                    id="allowResell"
                    checked={formData.allowResell}
                    onCheckedChange={(checked) => handleInputChange("allowResell", checked)}
                  />
                </div>
                
                {formData.allowResell && (
                  <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-foreground">Reselling Enabled</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Renters can sell progress% at 80% of accumulated value</li>
                      <li>• You receive 60% of the resale price</li>
                      <li>• Seller gets 20%, 20% is burned from system</li>
                      <li>• Faster completion through more participants</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Multi-Renter Configuration */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="enableMultiRenter" className="text-base font-medium">Enable Multi-Renter Mode</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-medium mb-2">Multi-Renter Mode</p>
                              <p className="text-sm mb-2"><strong>Phase 1:</strong> Multiple renters can rent temporary clones simultaneously</p>
                              <p className="text-sm mb-2"><strong>Phase 2:</strong> When renters reach 100%, they get newly minted original NFTs</p>
                              <p className="text-sm"><strong>Benefit:</strong> Higher earnings potential with demand-driven minting</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Allow multiple renters to compete simultaneously for newly minted original NFTs
                    </p>
                  </div>
                  <Switch
                    id="enableMultiRenter"
                    checked={formData.enableMultiRenter}
                    onCheckedChange={(checked) => handleInputChange("enableMultiRenter", checked)}
                  />
                </div>
                
                {formData.enableMultiRenter && (
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Multi-Renter Configuration</span>
                      </div>
                      
                      {/* Max Concurrent Renters */}
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="maxConcurrentRenters">Max Concurrent Renters</Label>
                        <Input
                          id="maxConcurrentRenters"
                          type="number"
                          min="1"
                          max="50"
                          placeholder="5"
                          value={formData.maxConcurrentRenters}
                          onChange={(e) => handleInputChange("maxConcurrentRenters", parseInt(e.target.value) || 1)}
                        />
                        <p className="text-xs text-muted-foreground">
                          How many renters can rent temporary clones at the same time
                        </p>
                      </div>

                      {/* Limited Edition Toggle */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Label htmlFor="isLimitedEdition" className="text-sm font-medium">Limited Edition</Label>
                          <p className="text-xs text-muted-foreground">Limit how many original NFTs can be minted</p>
                        </div>
                        <Switch
                          id="isLimitedEdition"
                          checked={formData.isLimitedEdition}
                          onCheckedChange={(checked) => handleInputChange("isLimitedEdition", checked)}
                        />
                      </div>

                      {/* Max Supply */}
                      {formData.isLimitedEdition && (
                        <div className="space-y-2">
                          <Label htmlFor="maxSupply">Max Supply (Original NFTs)</Label>
                          <Input
                            id="maxSupply"
                            type="number"
                            min="1"
                            max="1000"
                            placeholder="10"
                            value={formData.maxSupply}
                            onChange={(e) => handleInputChange("maxSupply", parseInt(e.target.value) || 1)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Maximum number of original NFTs that can be minted (first {formData.maxSupply} renters to reach 100%)
                          </p>
                        </div>
                      )}

                      <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                        <h4 className="text-sm font-medium text-foreground mb-2">How it works:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• <strong>Phase 1:</strong> Up to {formData.maxConcurrentRenters} renters rent temporary clones</li>
                          <li>• <strong>Phase 2:</strong> When a renter reaches 100%, they get a newly minted original NFT</li>
                          <li>• <strong>Supply:</strong> {formData.isLimitedEdition ? `Limited to ${formData.maxSupply} original NFTs` : 'Unlimited original NFTs can be minted'}</li>
                          <li>• <strong>Earnings:</strong> You earn from multiple renters simultaneously</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bidding Criteria */}
            <div className="space-y-2">
              <Label htmlFor="biddingCriteria">Bidding Criteria</Label>
              <Select value={formData.biddingCriteria} onValueChange={(value) => handleInputChange("biddingCriteria", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest_rate">Highest Rent Rate</SelectItem>
                  <SelectItem value="shortest_duration">Shortest Duration</SelectItem>
                  <SelectItem value="longest_duration">Longest Duration</SelectItem>
                  <SelectItem value="first_come">First Come, First Served</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                How to choose the next renter when multiple people are queuing
              </p>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Review & Confirm</h3>
              <p className="text-muted-foreground mb-6">Double-check your listing details before publishing.</p>
            </div>

            {/* Summary Card */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Listing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">NFT Name</Label>
                    <p className="font-medium text-foreground">{formData.name || "Not specified"}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Category</Label>
                    <Badge variant="secondary" className="mt-1">
                      {formData.category || "Not selected"}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Total Price</Label>
                    <p className="font-medium text-foreground">{formData.price || "0"} SUI</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Min Rent Rate</Label>
                    <p className="font-medium text-foreground">{formData.minRentRate || "0"} SUI/week</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Progress% Reselling</Label>
                    <p className="font-medium text-foreground">
                      {formData.allowResell ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Bidding Criteria</Label>
                    <p className="font-medium text-foreground capitalize">
                      {formData.biddingCriteria.replace("_", " ")}
                    </p>
                  </div>
                </div>

                {formData.description && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Description</Label>
                    <p className="text-sm text-foreground mt-1">{formData.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Economics Summary */}
            {formData.price && formData.minRentRate && (
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-secondary" />
                    Expected Economics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">{calculateProgressPerDay()}%</div>
                      <p className="text-sm text-muted-foreground">Daily progress</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary mb-1">{estimatedDaysToComplete()}</div>
                      <p className="text-sm text-muted-foreground">Days to complete</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {(parseFloat(formData.price) * 1.2).toFixed(0)}
                      </div>
                      <p className="text-sm text-muted-foreground">Expected earnings</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {formData.allowResell ? "Higher" : "Standard"}
                      </div>
                      <p className="text-sm text-muted-foreground">Competition level</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Validation Warnings */}
            <div className="space-y-2">
              {!formData.name && (
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">NFT name is required</span>
                </div>
              )}
              {!formData.category && (
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Category selection is required</span>
                </div>
              )}
              {!formData.price && (
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Total price is required</span>
                </div>
              )}
              {!formData.minRentRate && (
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Minimum rent rate is required</span>
                </div>
              )}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name && formData.category
      case 2:
        return formData.price && formData.minRentRate
      case 3:
        return true
      case 4:
        return formData.name && formData.category && formData.price && formData.minRentRate
      default:
        return false
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Create New Listing</h1>
        <p className="text-muted-foreground">List your NFT for competitive renting and start earning immediately</p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-between mb-8"
      >
        {[
          { number: 1, title: "Basic Info", icon: Info },
          { number: 2, title: "Pricing", icon: DollarSign },
          { number: 3, title: "Settings", icon: Settings },
          { number: 4, title: "Review", icon: CheckCircle },
        ].map((stepItem, index) => {
          const Icon = stepItem.icon
          return (
            <div key={stepItem.number} className="flex items-center">
              <div className={`flex items-center gap-3 ${index < 3 ? 'flex-1' : ''}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepItem.number
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="hidden md:block">
                  <p className={`text-sm font-medium ${
                    step >= stepItem.number ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {stepItem.title}
                  </p>
                </div>
              </div>
              {index < 3 && (
                <div className={`hidden md:block flex-1 h-px mx-4 ${
                  step > stepItem.number ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          )
        })}
      </motion.div>

      {/* Form Content */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-between"
      >
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {step < 4 ? (
            <Button
              onClick={() => setStep(Math.min(4, step + 1))}
              disabled={!canProceed()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Handle form submission
                console.log("Creating listing:", formData)
              }}
              disabled={!canProceed()}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Create Listing
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
