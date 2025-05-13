'use client';

import { usePathname } from 'next/navigation';
import { menuList } from '@/lib/constent';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { BadgePlus } from 'lucide-react';
import { Progress } from "@/components/ui/progress"



const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="relative w-1/5 h-screen p-6 shadow-md border-r pt-18">
      <nav className="mt-12">
        {menuList.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              href={item.path}
              key={item.id}
              className={cn(
                'flex items-center gap-3 p-2 mb-4 rounded-md cursor-pointer transition-colors hover:bg-primary',
                isActive && 'bg-primary'
              )}
            >
              <item.icon className="size-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-10 left-0 w-full p-8">
        <Button className="w-full">
          <BadgePlus />
          <span>Create Form</span>
        </Button>

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
