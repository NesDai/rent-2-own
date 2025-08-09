"use client";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useKioskClient } from "../../providers/KioskProvider";
import { useState } from "react";
import { Flex, Heading, Text, TextField, Button } from "@radix-ui/themes";

export default function RentItem() {
  const account = useCurrentAccount();
  const kioskClient = useKioskClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [rentalStateId, setRentalStateId] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRentItem = async () => {
    if (!account) {
      alert("Please connect your wallet.");
      return;
    }

    if (!rentalStateId || !durationDays || !amount) {
      alert("Please fill in all fields: Rental State ID, Duration, and Amount.");
      return;
    }

    const durationNum = parseInt(durationDays);
    const amountNum = parseFloat(amount);
    if (isNaN(durationNum) || isNaN(amountNum) || durationNum <= 0 || amountNum <= 0) {
      alert("Duration and Amount must be positive numbers.");
      return;
    }

    setLoading(true);
    try {
      // Fetch RentalStateWithMetadata to verify details
      const rentalState = await kioskClient.client.getObject({
        id: rentalStateId,
        options: { showContent: true },
      });

      if (rentalState.error) {
        throw new Error(`Failed to fetch RentalStateWithMetadata: ${rentalState.error.code}`);
      }

    //   console.log("Fetched RentalStateWithMetadata:", rentalState.data.content);
    //   console.log("RentalState ID:", rentalState.data?.content.fields);
      
      const fields = rentalState.data.content.fields;
      console.log("RentalStateWithMetadata:", fields);

      const requiredAmount = (fields.daily_rent / 1_000_000_000) * durationNum;
      if (amountNum < requiredAmount) {
        throw new Error(`Insufficient payment. Required: ${requiredAmount} SUI`);
      }

      const tx = new Transaction();

      // Select a Coin<SUI> with sufficient balance
      const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(amountNum * 1_000_000_000)]);

      tx.moveCall({
        target: `0xe8c550369322d13703f782f04d52167cdc98b24a5ef50eb946b0b613f33a31ff::kiosk_rto::rent_item_simple`,
        arguments: [
          tx.object(rentalStateId),
          coin,
          tx.pure.u64(durationNum),
          tx.object("0x6"), // System clock
        ],
      });

      await signAndExecute(
        {
          transaction: tx,
          account,
        },
        {
          onSuccess: (result) => {
            console.log("Rental successful:", result);
            alert(`NFT rented successfully! Digest: ${result.digest}`);
            setRentalStateId("");
            setDurationDays("");
            setAmount("");
          },
          onError: (error) => {
            console.error("Error renting NFT:", error);
            alert(`Failed to rent NFT: ${error.message}`);
          },
        },
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
      <Heading size="4">Rent an NFT</Heading>
      <TextField.Root
        placeholder="Rental State ID"
        value={rentalStateId}
        onChange={(e) => setRentalStateId(e.target.value)}
      />
      <TextField.Root
        placeholder="Duration (days)"
        value={durationDays}
        onChange={(e) => setDurationDays(e.target.value)}
        type="number"
      />
      <TextField.Root
        placeholder="Amount (SUI)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
      />
      <Button
        onClick={handleRentItem}
        disabled={!account || !rentalStateId || !durationDays || !amount || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Renting..." : "Rent Item"}
      </Button>
    </Flex>
  );
}