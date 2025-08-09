// app/layout.tsx
import { Inter } from "next/font/google";
import { ClientProviders } from "../components/client-providers"; // Adjust path

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Race2Own - Rent. Compete. Own.",
  description:
    "The fastest way to own NFTs — pay rent, stack ownership, win the asset.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
