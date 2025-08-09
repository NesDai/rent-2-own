import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@radix-ui/themes";

export function MintButton() {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleMint = () => {
    const tx = new Transaction();

    tx.moveCall({
      target: `0xfa675f28f9fa5560959a2349167c2e864d1c6917da5aff6f21f8e70809d564f2::nft_basic::mint_nft`,
      arguments: [
        tx.pure.string("Test NFT 1"),
        tx.pure.string("This is a limited edition NFT."),
        tx.pure.string("https://example.com/image.png"),
      ],
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (res) => {
          console.log("🎉 Minted NFT:", res);
        },
        onError: (err) => {
          console.error("❌ Mint failed:", err);
        },
      },
    );
  };

  return <Button onClick={handleMint}>Mint NFT</Button>;
}
