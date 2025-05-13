import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { HeroHeader } from "@/components/hero8-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FormPilot",
  description: "From Idea to Form in One Click.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} antialiased `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <main className="flex min-h-screen flex-col">
              <HeroHeader />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>

  );
}
