"use client"

import { useWallet } from '@suiet/wallet-kit'
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface WalletButtonProps {
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export function WalletButton({ className, size = "icon" }: WalletButtonProps) {
  const { connected, connecting, disconnect, select, configuredWallets, account } = useWallet()
  const [showWallets, setShowWallets] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowWallets(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleConnect = () => {
    if (connected) {
      disconnect()
    } else {
      setShowWallets(!showWallets)
    }
  }

  const handleWalletSelect = (walletName: string) => {
    select(walletName)
    setShowWallets(false)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (size === "icon") {
    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          size="icon"
          onClick={handleConnect}
          disabled={connecting}
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
            connected 
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-secondary/25" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25"
          } ${className}`}
        >
          {connecting ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : connected ? (
            <LogOut className="w-5 h-5" />
          ) : (
            <Wallet className="w-5 h-5" />
          )}
        </Button>

        {/* Wallet Selection Dropdown */}
        {showWallets && !connected && (
          <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-xl p-4 min-w-[240px] z-50 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3">Connect Wallet</h3>
            <div className="space-y-2">
              {configuredWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletSelect(wallet.name)}
                  disabled={connecting}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left border border-transparent hover:border-border/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {wallet.iconUrl ? (
                    <img 
                      src={wallet.iconUrl || "/placeholder.svg"} 
                      alt={wallet.name} 
                      className="w-6 h-6 rounded-full" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <Wallet className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <span className="text-sm text-foreground font-medium">{wallet.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowWallets(false)}
              className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center py-1"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={handleConnect}
        disabled={connecting}
        className={`rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
          connected 
            ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" 
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        } ${className}`}
        size={size}
      >
        {connecting ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Connecting...
          </>
        ) : connected ? (
          <>
            <LogOut className="w-4 h-4" />
            {account?.address ? formatAddress(account.address) : "Disconnect"}
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            Connect Wallet
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </Button>

      {/* Wallet Selection Dropdown for full-size button */}
      {showWallets && !connected && (
        <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-xl p-4 min-w-[240px] z-50 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-foreground mb-3">Connect Wallet</h3>
          <div className="space-y-2">
            {configuredWallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleWalletSelect(wallet.name)}
                disabled={connecting}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left border border-transparent hover:border-border/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {wallet.iconUrl ? (
                  <img 
                    src={wallet.iconUrl || "/placeholder.svg"} 
                    alt={wallet.name} 
                    className="w-6 h-6 rounded-full" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <Wallet className="w-3 h-3 text-primary" />
                  </div>
                )}
                <span className="text-sm text-foreground font-medium">{wallet.name}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowWallets(false)}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center py-1"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
