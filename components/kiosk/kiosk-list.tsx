"use client";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useKioskClient } from "../../providers/KioskProvider";
import { useState, useEffect } from "react";

export default function KioskList() {
  const account = useCurrentAccount();
  const kioskClient = useKioskClient();
  const suiClient = useSuiClient();
  const [kiosks, setKiosks] = useState<any[]>([]);
  const [kioskItems, setKioskItems] = useState<any[]>([]);
  const [rentalStates, setRentalStates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!account) return;

    const fetchKiosks = async () => {
      setLoading(true);
      setError("");
      try {
        const { kioskOwnerCaps } = await kioskClient.getOwnedKiosks({
          address: account.address,
        });

        const kioskData = await Promise.all(
          kioskOwnerCaps.map(async (cap) => {
            try {
              const kiosk = await kioskClient.getKiosk({
                id: cap.kioskId,
                options: {
                  withKioskFields: true,
                  withObjects: true,
                },
              });
              return {
                ...cap,
                items: kiosk.items || [],
                itemIds: kiosk.itemIds || [],
                kioskData: kiosk,
              };
            } catch (kioskError) {
              console.log(
                `Could not fetch details for kiosk ${cap.kioskId}:`,
                kioskError,
              );
              // Return basic info even if we can't fetch details
              return {
                ...cap,
                items: [],
                itemIds: [],
                error: "Could not fetch kiosk details",
              };
            }
          }),
        );

        setKiosks(kioskData);
        if (kioskData.length > 0) {
          setKioskItems(kioskData[0].items || []);
        }
      } catch (error) {
        console.error("Error fetching kiosks:", error);
        setError(`Error fetching kiosks: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchKiosks();
  }, [account, kioskClient]);

  useEffect(() => {
    const fetchRentalStates = async () => {
      if (!kiosks.length) return;

      try {
        // Instead of querying owner "0x0", let's query for objects of the specific type
        // First, we need to find RentalStateWithMetadata objects

        // Alternative approach: Query events from your package to find rental states
        const packageId =
          "0xe8c550369322d13703f782f04d52167cdc98b24a5ef50eb946b0b613f33a31ff"; // Replace with your actual package ID

        try {
          // Query events to find rental states created by this user
          const events = await suiClient.queryEvents({
            query: {
              MoveEventType: `${packageId}::kiosk_rto::ItemListedForRent`,
            },
            limit: 50,
            order: "descending",
          });

          const userRentalStates = [];

          for (const event of events.data) {
            const eventData = event.parsedJson as any;

            // Check if this event is from our kiosk
            const isOurKiosk = kiosks.some(
              (kiosk) => kiosk.kioskId === eventData.kiosk_id,
            );

            if (isOurKiosk) {
              // Try to find the rental state object created in this transaction
              const txResponse = await suiClient.getTransactionBlock({
                digest: event.id.txDigest,
                options: {
                  showEffects: true,
                  showObjectChanges: true,
                },
              });

              // Look for created RentalStateWithMetadata objects
              const createdObjects = txResponse.objectChanges?.filter(
                (change) =>
                  change.type === "created" &&
                  change.objectType?.includes("RentalStateWithMetadata"),
              );

              for (const created of createdObjects || []) {
                try {
                  const rentalState = await suiClient.getObject({
                    id: created.objectId,
                    options: { showContent: true, showType: true },
                  });

                  if (rentalState.data) {
                    userRentalStates.push(rentalState.data);
                  }
                } catch (objError) {
                  console.log(
                    `Could not fetch rental state ${created.objectId}:`,
                    objError,
                  );
                }
              }
            }
          }

          setRentalStates(userRentalStates);
          console.log("Found Rental States:", userRentalStates);
        } catch (eventError) {
          console.log(
            "Could not query events, trying alternative approach:",
            eventError,
          );

          // Fallback: Try to get all objects and filter (less efficient)
          try {
            const allObjects = await suiClient.getOwnedObjects({
              owner: account.address,
              options: {
                showContent: true,
                showType: true,
                filter: {
                  StructType: `${packageId}::kiosk_rto::RentalStateWithMetadata`,
                },
              },
            });

            setRentalStates(
              allObjects.data.map((obj) => obj.data).filter(Boolean),
            );
            console.log("Fallback - Found Rental States:", allObjects.data);
          } catch (fallbackError) {
            console.log("Fallback approach also failed:", fallbackError);
            setRentalStates([]);
          }
        }
      } catch (error) {
        console.error("Error fetching rental states:", error);
        setRentalStates([]);
      }
    };

    fetchRentalStates();
  }, [kiosks, suiClient, account]);

  if (!account) {
    return <p className="text-gray-700">Please connect your wallet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Kiosks</h2>

      {loading && <p className="text-blue-600">Loading kiosks...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {kiosks.length === 0 && !loading ? (
        <p className="text-gray-700">No kiosks found.</p>
      ) : (
        <div className="space-y-4">
          {kiosks.map((kiosk) => (
            <div key={kiosk.kioskId} className="border rounded p-4">
              <div className="mb-2">
                <strong>Kiosk ID:</strong>{" "}
                <code className="text-sm bg-gray-100 px-1 rounded">
                  {kiosk.kioskId}
                </code>
              </div>
              <div className="mb-2">
                <strong>Cap ID:</strong>{" "}
                <code className="text-sm bg-gray-100 px-1 rounded">
                  {kiosk.objectId}
                </code>
              </div>
              <div className="mb-2">
                <strong>Personal:</strong> {kiosk.isPersonal ? "Yes" : "No"}
              </div>
              {kiosk.error && (
                <div className="text-yellow-600 text-sm">⚠️ {kiosk.error}</div>
              )}

              {kiosk.items && kiosk.items.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-800">
                    Items in Kiosk:
                  </h4>
                  <ul className="list-disc pl-5 mt-2">
                    {kiosk.items.map((item: any) => (
                      <li key={item.objectId} className="text-gray-700 text-sm">
                        <code>{item.objectId}</code> ({item.type})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {kiosk.itemIds && kiosk.itemIds.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-800">Item IDs:</h4>
                  <ul className="list-disc pl-5 mt-2">
                    {kiosk.itemIds.map((itemId: string) => (
                      <li key={itemId} className="text-gray-700 text-sm">
                        <code>{itemId}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {rentalStates.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Your Rental Listings</h3>
          <div className="space-y-3">
            {rentalStates.map((state) => (
              <div
                key={state?.objectId}
                className="border rounded p-4 bg-blue-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <strong>Rental State ID:</strong>
                    <br />
                    <code className="text-xs bg-white px-1 rounded">
                      {state?.objectId}
                    </code>
                  </div>
                  <div>
                    <strong>Item ID:</strong>
                    <br />
                    <code className="text-xs bg-white px-1 rounded">
                      {state?.content?.fields?.item_id}
                    </code>
                  </div>
                  <div>
                    <strong>Item Type:</strong>
                    <br />
                    <span className="text-xs">
                      {state?.content?.fields?.item_type}
                    </span>
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <br />
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        state?.content?.fields?.is_renting
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {state?.content?.fields?.is_renting
                        ? "Rented"
                        : "Available"}
                    </span>
                  </div>
                  <div>
                    <strong>Sale Price:</strong>
                    <br />
                    <span className="font-mono">
                      {(
                        (state?.content?.fields?.item_price || 0) /
                        1_000_000_000
                      ).toFixed(3)}{" "}
                      SUI
                    </span>
                  </div>
                  <div>
                    <strong>Daily Rent:</strong>
                    <br />
                    <span className="font-mono text-blue-600">
                      {(
                        (state?.content?.fields?.daily_rent || 0) /
                        1_000_000_000
                      ).toFixed(3)}{" "}
                      SUI
                    </span>
                  </div>
                </div>

                {state?.content?.fields?.is_renting && (
                  <div className="mt-2 pt-2 border-t text-xs text-gray-600">
                    <strong>Current Renter:</strong>{" "}
                    {state?.content?.fields?.current_renter}
                    <br />
                    <strong>Rental End:</strong>{" "}
                    {new Date(
                      parseInt(state?.content?.fields?.rental_end_time),
                    ).toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Note:</h4>
        <p className="text-sm text-gray-700">
          This component shows your kiosks and any NFTs you've listed for rent.
          The Rental State IDs can be shared with others so they can rent your
          NFTs.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <strong>
            Remember to replace "0xYourNewPackageId" with your actual package ID
            for rental state detection to work properly.
          </strong>
        </p>
      </div>
    </div>
  );
}
