'use client';

import { usePathname } from 'next/navigation';
import { menuList } from '@/lib/constent';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"
import Image from 'next/image';
import CreateForm from './createForm';
import { getUserFreeCredits, getUserPlan } from '@/db/actions/user.actions';
import { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { useFormStore } from '@/store/formStore';

const Sidebar = () => {
  const pathname = usePathname();
  const [isPro, setIsPro] = useState<boolean>(false);
  const [credits, setCredits] = useState<number>(3);

  const { user } = useUser();
  const { setIsProUser, setPlan, setPlanStartsOn, setPlanEndsOn } = useFormStore();

  useEffect(() => {
    const fetchFormCount = async () => {
      const credites = await getUserFreeCredits();
      setCredits(credites ?? 0)
    };
    fetchFormCount();
  }, []);

  useEffect(() => {
    const checkPro = async () => {
      if (user?.id) {
        const plan = await getUserPlan(user.id);
        setIsPro(plan.userPlan === 'premium');
        if (plan.userPlan === 'premium') {
          setIsProUser(true);
          setPlan(plan.period ?? "free");
          setPlanStartsOn(plan.startDate);
          setPlanEndsOn(plan.endDate);
        }
        else {
          setIsProUser(false);
          setPlan("free");
        }
      }
    };
    checkPro();
  }, [user]);

  return (
    <aside className="sticky top-4 left-0 z-20 h-[calc(100vh-2rem)] flex flex-col justify-between lg:rounded-2xl lg:border lg:border-primary bg-background md:py-4 shadow-2xl backdrop-blur-md transition-all duration-300 max-lg:px-2 lg:p-4 px-2 rounded-lg lg:min-w-72 space-y-8">
      {/* Logo */}
      <div>
        <Link href="/" aria-label="Home" className="flex items-center gap-2 mb-12">
          <Image src="/logo.svg" alt="Logo" width={42} height={42} className="h-8 w-8 max-lg:mx-auto" />
          <h2 className="hidden lg:inline-block font-bold text-xl text-primary">FormPilot</h2>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuList.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all border border-transparent",
                  "hover:border-primary/40 hover:bg-primary/5",
                  isActive && "bg-primary/10 border-primary text-primary shadow"
                )}
              >
                <item.icon className="size-5 sm:size-6" />
                <span className="hidden lg:inline-block">{item.name}</span>
              </Link>
            );
          })}
          <div className="sm:hidden flex items-center justify-center pt-4">
            <CreateForm />
          </div>
        </nav>
      </div>

      {/* Mobile Create Button */}
      <div className="lg:hidden flex items-center justify-center pt-4">
        <UserButton />
      </div>

      {/* Progress + Upgrade Prompt or Pro Info (Visible on Desktop) */}
      <div className="hidden lg:block space-y-3 mt-auto mb-4">
        {isPro ? (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between bg-primary/10 pl-4 pr-2 py-2 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.51.91-5.32-3.87-3.77 5.34-.78L10 2z" />
                </svg>
                <span className="text-sm font-bold text-primary">Pro User</span>
              </div>
              <UserButton />
            </div>
            <span className="text-sm text-muted-foreground px-1 truncate">{user?.primaryEmailAddress?.emailAddress ?? ''}</span>
          </div>
        ) : (
          <>
            <Progress value={credits === 0 ? 100 : Math.min((credits / 3) * 100, 100)} />
            <p className="text-sm">
              <strong>{credits}</strong> out of <strong>3</strong> Free Credits Left
            </p>
            <p className="text-xs text-muted-foreground">
              Upgrade to <span className="font-semibold text-primary">Pro</span> to unlock unlimited forms.
            </p>
          </>
        )}
      </div>
    </aside>

  );
};

export default Sidebar;
