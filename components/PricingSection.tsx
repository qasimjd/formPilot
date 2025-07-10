"use client"

import { getUserPlan } from '@/db/actions/user.actions';
import { Plans } from '@/lib/constent';
import { cn } from '@/lib/utils';
import { useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PricingSection = ({ isHero }: { isHero?: boolean }) => {
    const { user } = useUser();
    const [userPlan, setUserPlan] = useState<string>('free');
    const [userPeriod, setUserPeriod] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { openSignIn } = useClerk()

    useEffect(() => {
        const fetchPlan = async () => {
            if (!user?.id) {
                setUserPlan('free');
                setUserPeriod(null);
                setLoading(false);
                return;
            }
            try {
                const response = await getUserPlan(user.id);
                setUserPlan(response?.userPlan || 'free');
                setUserPeriod(response?.period || null);
            } catch {
                setUserPlan('free');
                setUserPeriod(null);
            }
            setLoading(false);
        };
        fetchPlan();
    }, [user]);

    return (
        <section>
            <div className={cn("space-y-2 mb-8", isHero && "text-center")}>
                <h2
                    className={cn(
                        isHero
                            ? "text-3xl md:text-4xl font-bold text-center"
                            : "text-2xl md:text-3xl font-bold mb-2"
                    )}
                >
                    Upgrade Your Plan
                </h2>
                <p className="text-muted-foreground mb-4 lg:mb-8">
                    Choose the plan that fits your needs and unlock premium features like AI tools, advanced analytics, and more.
                </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {Plans.map((plan) => {
                    const isYearly = plan.name.toLowerCase().includes("yearly");
                    const isMonthly = plan.name.toLowerCase().includes("monthly");
                    let isCurrent = false;
                    if (userPlan === 'premium') {
                        if (isYearly && userPeriod === 'yearly') isCurrent = true;
                        if (isMonthly && userPeriod === 'monthly') isCurrent = true;
                    } else if (userPlan === 'free' && plan.name.toLowerCase().includes('free')) {
                        isCurrent = true;
                    }
                    return (
                        <div
                            key={plan.priceId}
                            className={`relative bg-white rounded-3xl shadow-lg p-8 border border-gray-400 transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1.5 ${isYearly ? "ring-2 ring-indigo-500 border-primary scale-[1.03]" : ""}`}
                        >
                            <div
                                className={`absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-30 ${isYearly
                                    ? "bg-gradient-to-br from-indigo-400 to-pink-400"
                                    : "bg-gradient-to-br from-pink-300 to-indigo-200"
                                    } group-hover:scale-110 transition duration-500`}
                                style={{
                                    top: "-60px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                            />

                            {isYearly && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-5 py-1 rounded-full shadow-lg">
                                    Recommended
                                </span>
                            )}

                            <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 text-center">
                                {plan.name}
                            </h2>

                            <div className="text-4xl font-black mb-2 text-gray-900 flex items-center justify-center gap-2">
                                {plan.price}
                                {isYearly && (
                                    <span className="text-xs font-semibold text-indigo-500 mb-1 animate-bounce">
                                        Best Value
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-500 text-sm mb-6 text-center">
                                {plan.description}
                            </p>
                            {!loading && isCurrent && user ? (
                                <span className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-gray-200 text-gray-600 font-bold shadow-md text-sm border border-gray-300 cursor-not-allowed">
                                    {isYearly ? 'Yearly Plan Active' : isMonthly ? 'Monthly Plan Active' : 'Current Plan'}
                                </span>
                            ) : !loading && isCurrent && !user ? (
                                <Link href="/sign-up" className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-md text-sm">
                                    {isYearly ? 'Yearly Plan Active' : isMonthly ? 'Monthly Plan Active' : 'Start Building'}
                                </Link>
                            ) : plan.link && !loading ? (
                                <Link
                                    href={user ? `${plan.link}?prefilled_email=${user?.primaryEmailAddress?.emailAddress}` : '#'}
                                    target={user ? '_blank' : undefined}
                                    rel={user ? 'noopener noreferrer' : undefined}
                                    className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-md text-sm border border-transparent hover:bg-primary/90 hover:scale-105 transition hover:border-indigo-400 ${userPlan !== 'free' ? 'opacity-60 pointer-events-none cursor-not-allowed' : ''}`}
                                    tabIndex={userPlan !== 'free' ? -1 : 0}
                                    aria-disabled={userPlan !== 'free'}
                                    onClick={e => {
                                        if (!user) {
                                            e.preventDefault();
                                            openSignIn();
                                        }
                                    }}
                                >
                                    Upgrade Now
                                </Link>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default PricingSection
