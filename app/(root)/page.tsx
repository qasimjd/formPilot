import Link from "next/link"
import Image from "next/image"
import { HeroHeader } from "@/components/hero8-header"
import { Button } from "@/components/ui/button"
import PricingSection from "@/components/PricingSection"
import { GradientSlideButton } from "@/components/ui/gradient-slide-button"

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
        <div className="py-12 md:pb-20 lg:pb-36 lg:pt-40">
          <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                Ship 10x Faster with <span className="text-primary">FormPilot.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-lg">
                FormPilot accelerates form creation with intelligent templates, instant previews, and real-time editing — so you can launch forms in minutes, not hours.</p>
              <div className="mt-12 items-center justify-center max-lg:hidden lg:justify-start">
                <Link href="/dashboard">
                  <Button asChild size="lg" className="bg-primary font-semibold cursor-pointer">
                    <GradientSlideButton>
                      Start Building
                    </GradientSlideButton>
                  </Button>
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

        {/* How It Works - Modern Steps */}
        <section className="bg-background/80 py-24 px-4">
          <div className="max-w-6xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">How FormPilot Works</h2>
            <div className="grid md:grid-cols-3 gap-12 text-left">
              <div className="flex flex-col items-start space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold">Describe Your Form</h3>
                <p className="text-muted-foreground">Tell us what you need—just a few words or a detailed description. FormPilot understands your requirements instantly.</p>
              </div>

              <div className="flex flex-col items-start space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold">Customize Instantly</h3>
                <p className="text-muted-foreground">Edit fields, add logic, and style your form in real time with our drag-and-drop editor—no coding required.</p>
              </div>

              <div className="flex flex-col items-start space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold">Share & Collect</h3>
                <p className="text-muted-foreground">Share your form link anywhere and watch responses roll in. Analyze results and export your data anytime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section (dynamic) */}
        <section className="bg-card py-24 px-4">
          <div className="max-w-6xl mx-auto px-4">
            <PricingSection isHero={true} />
          </div>
        </section>
      </section>
    </main>
  )
}
