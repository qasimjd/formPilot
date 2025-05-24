'use client';

import { usePathname } from 'next/navigation';
import { menuList } from '@/lib/constent';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"
import Image from 'next/image';
import CreateForm from './createForm';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-4 border border-primary rounded-2xl lg:p-4 space-y-8 bg-background shadow-2xl lg:min-w-72 max-sm:p-2 sm:p-4 transition-all duration-300 backdrop-blur-md z-20 h-full flex flex-col overflow-y-auto">
      <div>
        <Link href="/" aria-label="home" className="flex items-center space-x-2 mb-10 sm:mb-14">
          <Image src="/logo.svg" alt="Logo" width={42} height={42} className="h-8 w-8" />
          <h2 className="hidden sm:hidden lg:inline-block font-bold text-xl">FormPilot</h2>
        </Link>
        <nav className="space-y-2 sm:space-y-4">
          {menuList.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={item.id}
                className={cn(
                  'flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg cursor-pointer font-semibold transition-all border border-transparent hover:border-primary/40 hover:bg-primary/5',
                  isActive && 'border-primary bg-primary/10 shadow text-primary'
                )}
              >
                <item.icon className="size-6" />
                <span className='hidden lg:inline-block'>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className='lg:hidden flex flex-col items-center justify-center'>
        <CreateForm />
      </div>

      <div className="mt-auto space-y-2 sm:space-y-4 hidden lg:block">
        <div className="my-2 sm:my-4">
          <Progress value={33} />
        </div>
        <p className="text-xs sm:text-sm"><strong>2</strong> out of <strong>3</strong> Form Created</p>
        <p className="text-xs sm:text-sm mt-1 text-muted-foreground">
          Upgrade to <strong className="text-primary mx-1">Pro</strong> to create unlimited forms
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
