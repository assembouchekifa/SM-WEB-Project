import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Representation of Signed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
