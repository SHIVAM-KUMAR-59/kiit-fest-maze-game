import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, Permanent_Marker } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  variable: "--font-marker",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MazeRun – KIIT Fest Maze Game",
  description: "Navigate the maze, beat the clock, earn stars!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${bebasNeue.variable} ${permanentMarker.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
