"use client";

import { useUser } from '@clerk/nextjs';
import { Skeleton } from './ui/skeleton';
import CreateForm from './createForm';
import { useState, useEffect } from 'react';

const DashboardHeader = () => {
    const { user, isLoaded } = useUser();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    return (
        <header className='flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-6 border-b sticky top-0 z-10'>
            <div>
                {!isLoaded ? (
                    <Skeleton className="h-8 w-[200px]" />
                ) : (
                    <h2 className='text-xl font-semibold'>
                        {`${greeting}, ${user?.fullName || 'there'}`}
                        <span className='hidden sm:inline'> 👋</span>
                    </h2>
                )}
                <p className='text-sm text-muted-foreground mt-1 hidden sm:block'>
                    Manage your projects and tasks
                </p>
            </div>
            <CreateForm />
        </header>
    );
};

export default DashboardHeader;
