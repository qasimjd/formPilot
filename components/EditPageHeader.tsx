"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EditPageHeader() {
  return (
    <header className="w-full border-b bg-background/50 backdrop-blur-3xl z-30 sticky top-0">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Branding (left) */}
        <Link href="/" className="flex items-center gap-2 select-none" aria-label="home">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} className="h-9 w-9" />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">FormPilot</span>
        </Link>
        {/* Buttons (right) */}
        <div className="flex gap-2">
          <Button variant="outline" className="font-semibold px-5">
            Preview
          </Button>
          <Button variant="default" className="font-semibold px-5">
            Share
          </Button>
        </div>
      </div>
    </header>
  );
}
