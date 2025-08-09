import { useSuiClient } from "@mysten/dapp-kit";

// Create a custom hook
export function useRentalState() {
  const client = useSuiClient();

  const getRentalStateObject = async (digest: string) => {
    try {
      const txDetails = await client.getTransactionBlock({
        digest: digest,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      });

      // Look for created objects in object changes
      const createdObjects =
        txDetails.objectChanges?.filter(
          (change) => change.type === "created"
        ) || [];

      // Find your RentalStateWithMetadata
      const rentalState = createdObjects.find((obj) =>
        obj.objectType.includes("RentalStateWithMetadata")
      );
      console.log("Rental State Object:", rentalState);
      return rentalState?.objectId;
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  return { getRentalStateObject };
}
