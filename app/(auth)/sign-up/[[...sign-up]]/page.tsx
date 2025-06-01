import { SignUp } from '@clerk/nextjs'
import { HyperspaceBackground } from "@/components/ui/hyperspace-background";


export default function Page() {
    return (
        <section className="relative h-screen bg-black text-white">
            <div className="mx-auto flex h-full max-w-screen-xl items-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                    <div className="flex flex-col justify-center">
                        <HyperspaceBackground />
                        <div className="max-w-lg md:max-w-none z-50">
                            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                                From Idea to Form in One Click.
                            </h2>

                            <p className="mt-4 text-gray-300">
                                {"FormPilot makes form creation effortless. Whether you're building surveys, contact forms, or signups — AI handles the heavy lifting."}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <SignUp />
                    </div>
                </div>
            </div>
        </section>
    )
}
