import Link from "next/link"
import Image from "next/image"
import { HeroHeader } from "@/components/hero8-header"
import { Button } from "@/components/ui/button"
import { Plans } from '@/lib/constent'

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

        {/* How It Works - Modern Steps */}
        <section className="bg-background/80 pb-16 px-4 mt-10">
          <div className="max-w-6xl mx-auto px-4 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">How FormPilot Works</h2>
            <ol className="relative border-l-4 border-primary pl-8 space-y-12">
              <li className="relative ml-4">
                <div className="absolute -left-14.5 top-0 w-4 h-4 bg-primary rounded-full z-10" />
                <h3 className="text-xl font-semibold mb-2">Describe Your Form</h3>
                <p className="text-muted-foreground">Tell us what you need—just a few words or a detailed description. FormPilot understands your requirements instantly.</p>
              </li>
              <li className="relative ml-4">
                <div className="absolute -left-14.5 top-2 w-4 h-4 bg-primary rounded-full z-10" />
                <h3 className="text-xl font-semibold mb-2">Customize Instantly</h3>
                <p className="text-muted-foreground">Edit fields, add logic, and style your form in real time with our drag-and-drop editor—no coding required.</p>
              </li>
              <li className="relative ml-4">
                <div className="absolute -left-14.5 top-2 w-4 h-4 bg-primary rounded-full z-10" />
                <h3 className="text-xl font-semibold mb-2">Share & Collect</h3>
                <p className="text-muted-foreground">Share your form link anywhere and watch responses roll in. Analyze results and export your data anytime.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Pricing Section (dynamic) */}
        <section className="bg-card py-16 px-4" id="pricing">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Plans</h2>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {Plans.map((plan, idx) => {
                const isYearly = plan.name.toLowerCase().includes('yearly');
                return (
                  <div
                    key={plan.priceId}
                    className={`
                      relative bg-white rounded-3xl shadow-xl p-8 sm:p-10 flex flex-col items-center text-center
                      border border-gray-100 transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2
                      group overflow-hidden ${isYearly ? 'ring-2 ring-indigo-500 scale-105 z-10 border-primary' : ''}
                    `}
                  >
                    {/* Animated background */}
                    <div
                      className={`
                        absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-30
                        ${isYearly
                          ? 'bg-gradient-to-br from-indigo-400 to-pink-400'
                          : 'bg-gradient-to-br from-pink-300 to-indigo-200'}
                        group-hover:scale-110 transition-all duration-500
                      `}
                      style={{
                        top: '-60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    {isYearly && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-5 py-1 rounded-full shadow-lg animate-pulse">
                        Recommended
                      </span>
                    )}
                    <h3 className={`text-2xl font-extrabold mb-2 text-transparent bg-clip-text bg-primary drop-shadow`}>{plan.name}</h3>
                    <div className="text-4xl font-black mb-2 text-gray-900 tracking-tight flex items-end justify-center gap-2">
                      {plan.price}
                      {isYearly && (
                        <span className="text-xs font-semibold text-indigo-500 mb-1 animate-bounce">
                          Best Value
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 mb-6 text-sm sm:text-base">{plan.description}</p>
                    <ul className="mb-6 text-muted-foreground space-y-2 text-left w-full max-w-xs mx-auto">
                      {plan.features && plan.features.map((f) => <li key={f}>• {f}</li>)}
                    </ul>
                    <Button asChild className="inline-flex items-center justify-center gap-2 px-6 py-2 sm:px-8 sm:py-3 rounded-xl bg-primary text-white font-bold shadow-lg text-sm sm:text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-400 w-full mt-auto">
                      <Link href={plan.link ? plan.link : '/dashboard'} target={plan.link ? '_blank' : undefined} rel={plan.link ? 'noopener noreferrer' : undefined}>
                        {plan.name === 'Free' ? 'Start Free' : plan.name.includes('Yearly') ? 'Go Yearly' : 'Go Monthly'}
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
