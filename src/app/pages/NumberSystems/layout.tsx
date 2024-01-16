import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
