import { SuiClient } from "@mysten/sui/client";

export async function getRentalStateObject(suiClient: SuiClient, digest: string) {
  try {
    const txDetails = await suiClient.getTransactionBlock({
      digest: digest,
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    // Look for created objects in object changes
    const createdObjects =
      txDetails.objectChanges?.filter((change) => change.type === "created") ||
      [];

    // Find your RentalStateWithMetadata
    const rentalState = createdObjects.find((obj) =>
      obj.objectType?.includes("RentalStateWithMetadata")
    );
    console.log("Rental State Object:", rentalState);
    return rentalState?.objectId;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error; // Re-throw so you can handle it in the component
  }
}
