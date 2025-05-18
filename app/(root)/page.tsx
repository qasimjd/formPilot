import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { HeroHeader } from "@/components/hero8-header"
import { GlowingButton } from "@/components/ui/glowing-button"

export default function LandingPage() {
  return (

    <main className="overflow-hidden h-screen">

      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <Image
          src="/vector.png"
          className="absolute left-0 top-0 -z-10 object-covern"
          alt="vector"
          width={500}
          height={500}
        />
        <Image
          src="/r-vector.png"
          className="absolute right-0 top-0 -z-20 object-covern"
          alt="vector"
          width={500}
          height={500}
        />
      </div>
      <HeroHeader />
      <section>
        <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
          <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                Ship 10x Faster with <span className="text-primary">FormPilot.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-lg">
                FormPilot accelerates form creation with intelligent templates, instant previews, and real-time editing — so you can launch forms in minutes, not hours.</p>
              <div className="mt-12 items-center justify-center lg:justify-start">
                <Link href="/dashboard">
                  <GlowingButton className="bg-primary">Start Building</GlowingButton>
                </Link>
              </div>
            </div>
            <Image
              className="-z-20 order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
              src="/stone.webp"
              alt="Abstract Object"
              height="4000"
              width="3000"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
