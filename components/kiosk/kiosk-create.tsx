"use client"
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { KioskTransaction } from "@mysten/kiosk";
import { Transaction } from "@mysten/sui/transactions";
import { useKioskClient } from "../../providers/KioskProvider"; // Adjust path as necessary

// This component allows users to create a new kiosk
// It checks if the user is connected, creates a new kiosk transaction,
// and transfers the KioskOwnerCap to the user's address
// It handles success and error cases with appropriate alerts
export default function CreateKiosk() {
  const account = useCurrentAccount();
  const kioskClient = useKioskClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleCreateKiosk = async () => {
    if (!account) {
      alert("Please connect your wallet.");
      return;
    }

    console.log("Wallet connected:", account.address);

    const tx = new Transaction();
    const kioskTx = new KioskTransaction({ transaction: tx, kioskClient });

    // Create a new kiosk
    kioskTx.create();
    // Transfer the KioskOwnerCap to the account's address
    kioskTx.shareAndTransferCap(account.address);
    // Finalize the transaction
    kioskTx.finalize();

    signAndExecute(
      {
        transaction: tx,
        account,
      },
      {
        onSuccess: (result) => {
          console.log("Kiosk created:", result);
          alert("Kiosk created successfully!");
        },
        onError: (error) => {
          console.error("Error creating kiosk:", error);
          alert("Failed to create kiosk: " + error.message);
        },
      },
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create a Kiosk</h2>
      <button
        onClick={handleCreateKiosk}
        disabled={!account}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Create Kiosk
      </button>
    </div>
  );
}
