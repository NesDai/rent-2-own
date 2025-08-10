"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useKioskClient } from "../providers/KioskProvider";
import { KioskTransaction } from "@mysten/kiosk";
import { useSuiClient } from "@mysten/dapp-kit";
import { getRentalStateObject } from "@/utils/suiHelpers";

interface ListModalProps {
  isOpen: boolean;
  onClose: () => void;
onCreateListing?: (newNft: any) => void; // Callback for when a new listing is created
}

export function ListModal({ isOpen, onClose, onCreateListing }: ListModalProps) {
  const account = useCurrentAccount();
  const kioskClient = useKioskClient();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    const [kioskCap, setKioskCap] = useState<any>(null);
    const [selectedNFT, setSelectedNFT] = useState("");
    const [price, setPrice] = useState("");
    const [dailyRent, setDailyRent] = useState("");
    const [nfts, setNfts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const suiClient = useSuiClient();


    // Fetch the user's KioskOwnerCap and kiosk
    useEffect(() => {
    if (!account) return;

    const fetchKioskCap = async () => {
        try {
        const { kioskOwnerCaps } = await kioskClient.getOwnedKiosks({
            address: account.address,
        });
        if (kioskOwnerCaps.length > 0) {
            const cap = kioskOwnerCaps[0];
            setKioskCap(cap);
        } else {
            console.warn("No kiosk found for address:", account.address);
            alert("No kiosk found. Please create a kiosk first.");
        }
        } catch (error) {
        console.error("Error fetching kiosk cap or kiosk:", error);
        alert(`Failed to fetch kiosk: ${(error as Error).message}`);
        }
    };

    fetchKioskCap();
    }, [account, kioskClient]);

    // Fetch NFTs
    const { data: objects, isPending, error, } = useSuiClientQuery("getOwnedObjects",
    {
        owner: account?.address as string,
        options: { showType: true, showContent: true, showDisplay: true },
    },{ enabled: !!account }
    );

  // Filter NFTs from the fetched objects
  useEffect(() => {
    if (objects) {
      const nftTypes = ["0x2::devnet_nft::DevNetNFT"];
      const filteredNfts = objects.data.filter(
        (obj) =>
          nftTypes.includes(obj.data?.type || "") ||
          obj.data?.type?.includes("NFT")
      );
      setNfts(filteredNfts);
    //   console.log("Filtered NFTs:", filteredNfts);
    }
  }, [objects]);

  const addNFTToLS = async (nft: any, digest: string) => {
    try {
      console.log("NFT data", nft);
      console.log("digest", digest);

      // Add retry logic with exponential backoff
      const getRentalStateWithRetry = async (
        maxRetries = 5,
        initialDelay = 1000
      ) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(`Attempt ${attempt} to fetch rental state object...`);
            const result = await getRentalStateObject(suiClient, digest);
            return result;
          } catch (error) {
            console.warn(`Attempt ${attempt} failed:`, error);

            if (attempt === maxRetries) {
              throw new Error(
                `Failed to fetch rental state object after ${maxRetries} attempts`
              );
            }

            // Wait before retrying with exponential backoff
            const delay = initialDelay * Math.pow(2, attempt - 1);
            console.log(`Waiting ${delay}ms before retry...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      };

      const result = await getRentalStateWithRetry();
      console.log("result", result);

      // Create the listing object
      const nftData = nft.data?.content?.fields || {};
      const displayData = nft.data?.display?.data || {};

      const newListing = {
        id: nft.data?.objectId,
        name: displayData.name || nftData.name || "Unnamed NFT",
        description: displayData.description || nftData.description || "",
        image: nftData.url || displayData.image_url || "",
        type: nft.data?.type || "",
        priceToOwn: parseFloat(price) + " SUI",
        minRent: parseFloat(dailyRent) + " SUI/day",
        owner: account?.address,
        listedAt: new Date().toISOString(),
        status: "active",
        rentalStateId: result,
        currentProgress: "0",
      };

      onCreateListing?.(newListing);
    } catch (error) {
      console.error("Error:", error);
      // Optionally show user-friendly error
      alert(`Failed to complete listing: ${error}`);
    }
  };

  // Handle listing NFT for rent
  // This function will handle both cases: listing from wallet or from kiosk
  const handleListForRent = async () => {
    if (!account || !kioskCap || !selectedNFT) {
      alert(
        "Please connect your wallet, ensure you have a kiosk, and select an NFT."
      );
      return;
    }

    if (!price || !dailyRent) {
      alert("Please fill in price and daily rent.");
      return;
    }

    const priceNum = parseFloat(price);
    const dailyRentNum = parseFloat(dailyRent);
    if (
      isNaN(priceNum) ||
      isNaN(dailyRentNum) ||
      priceNum <= 0 ||
      dailyRentNum <= 0
    ) {
      alert("Price and daily rent must be positive numbers.");
      return;
    }

    const nft = nfts.find((n) => n.data?.objectId === selectedNFT);
    if (!nft) {
      alert("Selected NFT not found.");
      return;
    }

    setLoading(true);
    try {
    //   console.log("Listing NFT:", {
    //     objectId: selectedNFT,
    //     type: nft.data.type,
    //     price: priceNum,
    //     dailyRent: dailyRentNum,
    //     kioskId: kioskCap.kioskId,
    //     kioskCapId: kioskCap.objectId,
    //   });

      const tx = new Transaction();

      // First, take the NFT from the kiosk (if it's already there)
      // If the NFT is in your wallet, you'll need to place it first

      // Method 1: If NFT is in wallet, place it in kiosk first, then take it for listing
      const kioskTx = new KioskTransaction({
        transaction: tx,
        kioskClient,
        cap: kioskCap,
      });

      // Place the NFT in kiosk first (if it's in wallet)
      kioskTx.place({
        itemType: nft.data.type,
        item: tx.object(selectedNFT),
      });

      // Take the NFT from kiosk for listing
      const item = kioskTx.take({
        itemType: nft.data.type,
        itemId: selectedNFT,
      });

      // Convert string to bytes array
      const encoder = new TextEncoder();
      const itemTypeBytes = Array.from(encoder.encode(nft.data.type));

      // Call your contract's list function
      tx.moveCall({
        target: `0xe8c550369322d13703f782f04d52167cdc98b24a5ef50eb946b0b613f33a31ff::kiosk_rto::list_nft_for_rent`,
        typeArguments: [nft.data.type],
        arguments: [
          kioskTx.getKiosk(),
          kioskTx.getKioskCap(),
          item,
          tx.pure.vector("u8", itemTypeBytes), // Use vector instead of u8Vector
          tx.pure.u64(Math.floor(priceNum * 1_000_000_000)), // Convert to MIST
          tx.pure.u64(Math.floor(dailyRentNum * 1_000_000_000)), // Convert to MIST
        ],
      });

      kioskTx.finalize();

      await signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            // console.log("NFT listed for rent:", result);

            // alert(`NFT listed for rent successfully! Digest: ${result.digest}`);
            addNFTToLS(nft, result.digest); // Add NFT to local storage
            setSelectedNFT("");
            setPrice("");
            setDailyRent("");
          },
          onError: (error) => {
            console.error("Error listing NFT for rent:", error);
            alert(`Failed to list NFT for rent: ${error.message}`);
          },
        }
      );
    } catch (error) {
      console.error("Transaction setup failed:", error);
      alert(`Transaction setup failed: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }

    onClose()
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            List NFT for Rent
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Select an NFT from your wallet to list for rent.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
            {nfts.length === 0 && (
              <div className="col-span-2 text-gray-500 text-sm">
                No NFTs available
              </div>
            )}
          {nfts.map((nft) => {
            const nftData = nft.data?.content?.fields || {};
            const displayData = nft.data?.display?.data || {};
            const isSelected = selectedNFT === nft.data?.objectId;
            return (
              <div
                key={nft.data?.objectId}
                onClick={() => setSelectedNFT(nft.data?.objectId)}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${
                  isSelected
                    ? "border-[#00D2FF] bg-[#00D2FF]/10 ring-2 ring-[#00D2FF]/30 shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                    : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                }`}
              >
                <div className="w-full h-20 mb-2 bg-gray-800 rounded overflow-hidden flex items-center justify-center">
                  {nft.data?.content?.fields?.url ? (
                    <img
                      src={nft.data.content.fields.url || "/placeholder.svg"}
                      alt="NFT"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-xs text-center">
                      No Image
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-white truncate">
                    {displayData.name || nftData.name || "Unnamed NFT"}
                  </div>
                  {(displayData.description || nftData.description) && (
                    <div className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {displayData.description || nftData.description}
                    </div>
                  )}
                  <div className="text-gray-500 text-xs mt-1 truncate">
                    ID: {nft.data?.objectId?.slice(0, 8)}...
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-4 mt-4">
          <div>
            <Label className="text-white text-sm font-medium mb-2 block">
              Price (SUI)
            </Label>
            <Input
              placeholder="Enter price in SUI"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#00D2FF] focus:ring-[#00D2FF]"
            />
          </div>
          <div>
            <Label className="text-white text-sm font-medium mb-2 block">
              Daily Rent (SUI)
            </Label>
            <Input
              placeholder="Enter daily rent in SUI"
              value={dailyRent}
              onChange={(e) => setDailyRent(e.target.value)}
              type="number"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#00D2FF] focus:ring-[#00D2FF]"
            />
          </div>
        </div>
        {error && (
          <div className="text-red-400 text-sm">Error: {error.message}</div>
        )}
        {isPending && (
          <div className="text-gray-400 text-sm">Loading NFTs...</div>
        )}
        {nfts.length === 0 && !isPending && (
          <div className="text-gray-400 text-sm">No NFTs found in wallet.</div>
        )}

        {!kioskCap && account && (
          <div className="text-red-400 text-sm">
            No kiosk found. Create a kiosk first.
          </div>
        )}

        <div className="text-gray-400 text-sm mt-4">
          By Listing an NFT for rent, you agree to the terms of service.
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
          <Button
            variant="ghost"
            onClick={() => {
                onClose()
                setSelectedNFT("");
                setPrice("");
                setDailyRent("");
            }}
            className="text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={handleListForRent}
            disabled={
              !account || !selectedNFT || !price || !dailyRent
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold flex items-center gap-2 animate-glow-pulse px-3 py-2"
          >
            <Zap className="w-4 h-4" />
            List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
