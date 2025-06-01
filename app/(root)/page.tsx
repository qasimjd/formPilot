import Link from "next/link"
import Image from "next/image"
import { HeroHeader } from "@/components/hero8-header"
import { Button } from "@/components/ui/button"
import { Brain, ExternalLink, FilePenLine } from "lucide-react"

export default function LandingPage() {
  return (

    <main>
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
        <div className="py-12 md:pb-20 lg:pb-32 lg:pt-36">
          <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                Ship 10x Faster with <span className="text-primary">FormPilot.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-lg">
                FormPilot accelerates form creation with intelligent templates, instant previews, and real-time editing — so you can launch forms in minutes, not hours.</p>
              <div className="mt-12 items-center justify-center max-lg:hidden lg:justify-start">
                <Button asChild size="lg" className="bg-primary font-semibold">
                  <Link href="/dashboard">
                    Start Building
                  </Link>
                </Button>
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

        <section className="bg-background/80 pb-16 px-4">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card shadow-md">
                <div className="mb-4 text-primary">
                  <Brain className="text-primary size-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Generate</h3>
                <p className="text-muted-foreground">Describe your form idea and let FormPilot instantly generate a smart, ready-to-use form for you.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card shadow-md">
                <div className="mb-4 text-primary">
                  <FilePenLine className="text-primary size-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Customize</h3>
                <p className="text-muted-foreground">Tweak fields, add logic, and style your form in real time with our intuitive editor—no coding needed.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card shadow-md">
                <div className="mb-4 text-primary">
                  <ExternalLink className="text-primary size-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Share & Collect</h3>
                <p className="text-muted-foreground">Share your form link anywhere and watch responses roll in—analyze results and export data anytime.</p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild size="lg" className="bg-primary font-semibold w-full max-w-xs md:max-w-sm lg:max-w-md">
                <Link href="/dashboard">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
