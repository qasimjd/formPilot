"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import React from "react"
import Image from "next/image"
import { UserButton, useUser } from "@clerk/nextjs"


export const HeroHeader = () => {
  const { isSignedIn } = useUser();

  return (
    <header>
      <nav className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
        <div className="mx-auto px-8 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Image src="/logo.svg" alt="Logo" width={40} height={40} className="h-8 w-8" />
                <span className="hidden font-bold lg:inline-block">FormPilot</span>
              </Link>
            </div>

            {isSignedIn ? (
              <div className="flex items-center gap-2 ">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </Button>
                <UserButton />
              </div>
            ) : (
              <Button asChild size="sm">
                <Link href="/sign-in">
                  <span>Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav >
    </header >
  )
}
