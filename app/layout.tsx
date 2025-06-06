import type { Metadata } from "next";
import { Raleway as RalewayFont } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"


const Raleway = RalewayFont({
  variable: "--font-raleway",
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
        <body className={`${Raleway.variable} antialiased font-Raleway`}>
            <main className="flex min-h-screen flex-col">
              {children}
            </main>
            <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>

  );
}
