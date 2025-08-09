import { KioskClient, Network } from "@mysten/kiosk";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { createContext, useContext, useMemo } from "react";

// Create a context for KioskClient
const KioskClientContext = createContext<KioskClient | null>(null);

// Provider component to initialize KioskClient
export function KioskClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useMemo(
    () =>
      new SuiClient({
        url: getFullnodeUrl("testnet"),
      }),
    []
  );

  const kioskClient = useMemo(
    () =>
      new KioskClient({
        client,
        network: Network.TESTNET,
      }),
    [client]
  );

  return (
    <KioskClientContext.Provider value={kioskClient}>
      {children}
    </KioskClientContext.Provider>
  );
}

// Hook to access KioskClient
export function useKioskClient() {
  const context = useContext(KioskClientContext);
  if (!context) {
    throw new Error("useKioskClient must be used within a KioskClientProvider");
  }
  return context;
}
