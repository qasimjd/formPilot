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
    <aside className="relative w-20 lg:w-1/5 h-screen p-4 pt-8 shadow-md border-r">

      <div className="flex w-full items-center justify-between gap-1 lg:w-auto">
        <Link href="/" aria-label="home" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={42} height={42} className="h-8 w-8" />
          <h2 className="hidden font-bold text-xl lg:inline-block">FormPilot</h2>
        </Link>
      </div>

      <nav className="mt-14">
        {menuList.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              href={item.path}
              key={item.id}
              className={cn(
                'flex items-center gap-3 p-3 mb-4 rounded-md cursor-pointer font-semibold transition-colors hover:bg-primary',
                isActive && 'bg-primary text-white'
              )}
            >
              <item.icon className="size-6" />
              <span className='hidden lg:inline-block'>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-16 left-0 w-full px-6 hidden lg:block">

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
