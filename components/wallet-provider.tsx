"use client"

import { WalletProvider } from '@suiet/wallet-kit'

export function SuietWalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  )
}
