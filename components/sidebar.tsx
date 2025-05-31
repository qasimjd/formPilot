'use client';

import { usePathname } from 'next/navigation';
import { menuList } from '@/lib/constent';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"
import Image from 'next/image';
import CreateForm from './createForm';
import { getUserForms } from '@/db/actions/form.action';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [formCount, setFormCount] = useState<number>(0);

  useEffect(() => {
    const fetchFormCount = async () => {
      const forms = await getUserForms();
      setFormCount(forms.length);
    };
    fetchFormCount();
  }, []);

  return (
    <aside className="sticky top-4 left-0 z-20 h-[calc(100vh-2rem)] flex flex-col justify-between rounded-2xl border border-primary bg-background py-4 shadow-2xl backdrop-blur-md transition-all duration-300 max-sm:px-2 sm:p-4 lg:min-w-72 space-y-8">
      {/* Logo */}
      <div>
        <Link href="/" aria-label="Home" className="flex items-center gap-2 mb-12">
          <Image src="/logo.svg" alt="Logo" width={42} height={42} className="h-8 w-8" />
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
        </nav>
      </div>

      {/* Mobile Create Button */}
      <div className="lg:hidden flex items-center justify-center pt-4">
        <CreateForm />
      </div>

      {/* Progress + Upgrade Prompt (Visible on Desktop) */}
      <div className="hidden lg:block space-y-3 mt-auto">
        <Progress value={Math.min((formCount / 3) * 100, 100)} />
        <p className="text-sm">
          <strong>{formCount}</strong> out of <strong>3</strong> Forms Created
        </p>
        <p className="text-xs text-muted-foreground">
          Upgrade to <span className="font-semibold text-primary">Pro</span> to unlock unlimited forms.
        </p>
      </div>
    </aside>

  );
};

export default Sidebar;
