"use client";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { KioskTransaction } from "@mysten/kiosk";
import { Transaction } from "@mysten/sui/transactions";
import { useKioskClient } from "../../providers/KioskProvider"; // Adjust path as necessary
import { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Text,
  TextField,
  Button,
  Select,
} from "@radix-ui/themes";

export default function ListNFTForRent() {
  const account = useCurrentAccount();
  const kioskClient = useKioskClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [kioskCap, setKioskCap] = useState<any>(null);
  const [selectedNFT, setSelectedNFT] = useState("");
  const [price, setPrice] = useState("");
  const [dailyRent, setDailyRent] = useState("");
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
  const {
    data: objects,
    isPending,
    error,
  } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: { showType: true, showContent: true, showDisplay: true },
    },
    { enabled: !!account }
  );

  useEffect(() => {
    if (objects) {
      const nftTypes = ["0x2::devnet_nft::DevNetNFT"];
      const filteredNfts = objects.data.filter(
        (obj) =>
          nftTypes.includes(obj.data?.type || "") ||
          obj.data?.type?.includes("NFT")
      );
      setNfts(filteredNfts);
      console.log("Filtered NFTs:", filteredNfts);
    }
  }, [objects]);

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
      console.log("Listing NFT:", {
        objectId: selectedNFT,
        type: nft.data.type,
        price: priceNum,
        dailyRent: dailyRentNum,
        kioskId: kioskCap.kioskId,
        kioskCapId: kioskCap.objectId,
      });

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
            console.log("NFT listed for rent:", result);
            alert(`NFT listed for rent successfully! Digest: ${result.digest}`);
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
  };

  // Alternative approach for NFTs already in kiosk
  const handleListForRentFromKiosk = async () => {
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
      const tx = new Transaction();

      // If NFT is already in kiosk, take it directly
      const item = tx.moveCall({
        target: `0x2::kiosk::take`,
        typeArguments: [nft.data.type],
        arguments: [
          tx.object(kioskCap.kioskId),
          tx.object(kioskCap.objectId),
          tx.pure.id(selectedNFT),
        ],
      });

      // Convert string to bytes array
      const encoder = new TextEncoder();
      const itemTypeBytes = Array.from(encoder.encode(nft.data.type));

      // Call your contract's list function
      tx.moveCall({
        target: `0xYourNewPackageId::kiosk_rto::list_nft_for_rent`,
        typeArguments: [nft.data.type],
        arguments: [
          tx.object(kioskCap.kioskId),
          tx.object(kioskCap.objectId),
          item,
          tx.pure.vector("u8", itemTypeBytes),
          tx.pure.u64(Math.floor(priceNum * 1_000_000_000)),
          tx.pure.u64(Math.floor(dailyRentNum * 1_000_000_000)),
        ],
      });

      await signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("NFT listed for rent:", result);
            alert(`NFT listed for rent successfully! Digest: ${result.digest}`);
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
  };

  return (
    <Flex direction="column" gap="4" my="4">
      <Heading size="4">List NFT for Rent</Heading>
      {error && <Text color="red">Error: {error.message}</Text>}
      {isPending && <Text>Loading NFTs...</Text>}
      {nfts.length === 0 && !isPending && <Text>No NFTs found in wallet.</Text>}
      {nfts.length > 0 && (
        <Select.Root value={selectedNFT} onValueChange={setSelectedNFT}>
          <Select.Trigger placeholder="Select NFT" />
          <Select.Content>
            {nfts.map((nft) => (
              <Select.Item key={nft.data?.objectId} value={nft.data?.objectId}>
                {nft.data?.display?.data?.name ||
                  nft.data?.content?.fields?.name ||
                  nft.data?.objectId}{" "}
                ({nft.data?.type})
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
      <TextField.Root
        placeholder="Price (SUI)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
      />
      <TextField.Root
        placeholder="Daily Rent (SUI)"
        value={dailyRent}
        onChange={(e) => setDailyRent(e.target.value)}
        type="number"
      />

      <Flex gap="2">
        <Button
          onClick={handleListForRent}
          disabled={!account || !kioskCap || !selectedNFT || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Listing..." : "List NFT (from wallet)"}
        </Button>

        <Button
          onClick={handleListForRentFromKiosk}
          disabled={!account || !kioskCap || !selectedNFT || loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Listing..." : "List NFT (from kiosk)"}
        </Button>
      </Flex>

      {!kioskCap && account && (
        <Text color="red">No kiosk found. Create a kiosk first.</Text>
      )}

      <Text size="2" color="gray">
        Use "List NFT (from wallet)" if the NFT is in your wallet. Use "List NFT
        (from kiosk)" if the NFT is already in your kiosk.
      </Text>
    </Flex>
  );
}
