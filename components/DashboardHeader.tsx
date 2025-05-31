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
        <header className="flex flex-col rounded-2xl shadow-lg border border-primary sm:flex-row flex-wrap items-center justify-between gap-4 px-2 sm:px-6 py-2 sm:py-2 border-b sticky top-4 z-10 bg-background/80 backdrop-blur-md">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:w-auto">
                {!isLoaded ? (
                    <Skeleton className="h-8 w-[200px]" />
                ) : (
                    <h2 className="text-xl font-semibold break-words max-w-full">
                        {`${greeting}, ${user?.fullName || 'there'}`}
                        <span className="inline"> 👋</span>
                    </h2>
                )}
                <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
                    Manage your projects and tasks
                </p>
            </div>
            <div className="w-full max-lg:hidden sm:w-auto flex justify-center sm:justify-end">
                <CreateForm />
            </div>
        </header>
    );
};

export default DashboardHeader;
