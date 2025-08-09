"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { MyListings } from "@/components/dashboard/my-listings"
import { MyRentals } from "@/components/dashboard/my-rentals"
import { MintNFTs } from "@/components/dashboard/mint-nfts"
import { Rankings } from "@/components/dashboard/rankings"
import { ResellMarketplace } from "@/components/dashboard/resell-marketplace"
import { CreateListing } from "@/components/dashboard/create-listing"
import { WalletButton } from "@/components/wallet-button"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "listings":
        return <MyListings />
      case "rentals":
        return <MyRentals />
      case "minting":
        return <MintNFTs />
      case "rankings":
        return <Rankings />
      case "resell":
        return <ResellMarketplace />
      case "create":
        return <CreateListing />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Dashboard
            </Button>
          </Link>
          <div className="hidden md:block">
            <WalletButton />
          </div>
        </div>
      </Header>
      
      <div className="flex pt-20">
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
