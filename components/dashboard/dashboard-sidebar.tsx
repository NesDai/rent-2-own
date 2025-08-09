"use client"

import { LayoutDashboard, Package, Calendar, Trophy, ShoppingCart, Plus, TrendingUp, Users, Wallet, Coins } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "listings", label: "My Listings", icon: Package },
  { id: "rentals", label: "My Rentals", icon: Calendar },
  { id: "minting", label: "Mint NFTs", icon: Coins },
  { id: "rankings", label: "Rankings", icon: Trophy },
  { id: "resell", label: "Resell Market", icon: ShoppingCart },
  { id: "create", label: "Create Listing", icon: Plus },
]

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  return (
    <aside className="w-64 bg-card/30 backdrop-blur-sm border-r border-border h-[calc(100vh-80px)] sticky top-20">
      <div className="p-6">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Progress</span>
              <span className="text-primary font-semibold">67.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">SUI Earned</span>
              <span className="text-secondary font-semibold">245.8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rank</span>
              <span className="text-foreground font-semibold">#12</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
