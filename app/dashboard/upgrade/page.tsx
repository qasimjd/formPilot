"use client";

import Link from "next/link";
import { useFormStore } from "@/store/formStore";
import { BadgeCheck, Sparkles } from "lucide-react";
import PricingSection from "@/components/PricingSection";

const UpgradePage = () => {
  const { plan, planEndsOn, isProUser } = useFormStore();

  return (
    <main className="px-6 md:px-10 max-w-7xl mx-auto space-y-10">
      <div className="text-center">
        {isProUser && (
          <div className="mt-4 inline-flex items-center gap-2 text-green-700 bg-green-100 px-4 py-2 rounded-full text-sm font-medium">
            <BadgeCheck className="w-4 h-4" />
            <span>
              You are on the <strong className="mx-1">{plan?.toUpperCase()}</strong> plan.
              {planEndsOn && (
                <span className="ml-2 text-muted-foreground">
                  Ends on {new Date(planEndsOn).toLocaleDateString()}
                </span>
              )}
            </span>
          </div>
        )}
      </div>

      {isProUser ? (
        <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto bg-white border border-primary/30 rounded-3xl p-10 shadow-xl space-y-5 animate-fade-in">
          <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-primary text-center">
            You&apos;re a Pro User!
          </h2>
          <p className="text-center text-muted-foreground text-lg">
            Enjoy unlimited access to all premium features and priority support. Your productivity just got supercharged.
          </p>
          <Link
            href="/dashboard"
            className="inline-block mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-primary/90 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <PricingSection />
      )}
    </main>
  );
};

export default UpgradePage;