// components/ClientProviders.tsx
"use client";

import { Theme } from "@radix-ui/themes";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KioskClientProvider } from "../providers/KioskProvider"; // Adjust path
import { networkConfig } from "../networkConfig"; // Adjust path
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";
import "../app/globals.css";

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            <KioskClientProvider>{children}</KioskClientProvider>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  );
}
