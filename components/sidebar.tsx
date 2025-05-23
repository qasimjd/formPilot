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
    <aside className="border border-r-primary p-4 space-y-12 bg-background shadow-2xl w-full max-w-xs md:max-w-sm lg:max-w-xs min-w-[220px] transition-all duration-300 backdrop-blur-md z-20 h-screen flex flex-col">
      <div>
        <Link href="/" aria-label="home" className="flex items-center space-x-2 mb-14">
          <Image src="/logo.svg" alt="Logo" width={42} height={42} className="h-8 w-8" />
          <h2 className="hidden font-bold text-xl lg:inline-block">FormPilot</h2>
        </Link>
        <nav className="space-y-4">
          {menuList.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={item.id}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer font-semibold transition-all border border-transparent hover:border-primary/40 hover:bg-primary/5',
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
      <div className="mt-auto space-y-4">
        <CreateForm />
        <div className="my-4">
          <Progress value={33} />
        </div>
        <p className="text-sm"><strong>2</strong> out of <strong>3</strong> Form Created</p>
        <p className="text-sm mt-1 text-muted-foreground">
          Upgrade to <strong className="text-primary mx-1">Pro</strong> to create unlimited forms
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
