import FormCard from '@/components/FormCard';
import FormCardSkeleton from '@/components/FormCardSkeleton';
import { getUserForms } from '@/db/actions/form.action';
import Image from 'next/image';
import React, { Suspense } from 'react'

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";
export const metadata = {
  title: 'Responses Dashboard',
  description: 'Manage your forms and responses',
};


const ResponsesContent = async () => {
  const responses = await getUserForms();

  return (
    <main className="w-full p-2 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight flex items-center gap-2">
        All Responses
      </h1>
      <p className="text-muted-foreground mb-8 text-base md:text-lg">
        View and manage all your form responses in one place. Track engagement and analyze your data below.
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {responses.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 gap-4">
            <Image src="/no-data.png" height={140} width={140} alt="No forms found" className="opacity-60 drop-shadow-xl" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-2">No Forms Yet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs text-center">
              You haven't created any forms yet. Click <span className="font-semibold text-primary">"Generate Form"</span> to get started!
            </p>
          </div>
        ) : null}
        {responses.length > 0 && responses.map((response) => (
          <FormCard
            key={response.id}
            id={response.id}
            title={response.title || 'Untitled response'}
            createdAt={response.createdAt}
            responsesCount={response.responsesCount}
          />
        ))}
      </div>
    </main>
  );
};


export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="w-full p-2 md:p-8 max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight flex items-center gap-2">
            All Responses
          </h1>
          <p className="text-muted-foreground mb-8 text-base md:text-lg">
            View and manage all your form responses in one place. Track engagement and analyze your data below.
          </p>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <FormCardSkeleton key={i} variant='responseCard' />
            ))}
          </div>
        </main>
      }
    >
      <ResponsesContent />
    </Suspense>
  );
}
