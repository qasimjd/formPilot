import FormCard from '@/components/FormCard';
import FormCardSkeleton from '@/components/FormCardSkeleton';
import { getUserForms } from '@/db/actions/form.action';
import Image from 'next/image';
import React, { Suspense } from 'react'

const ResponsesContent = async () => {
  const forms = await getUserForms();

  return (
    <main className="w-full max-lg:mt-48 px-4 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {forms.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-12 gap-4">
          <Image src="/no-data.png" height={140} width={140} alt="No forms found" className="opacity-60 drop-shadow-xl" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-2">No Forms Yet</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs text-center">
            {`You haven't created any forms yet. Click `}
            <span className="font-semibold text-primary">"Generate Form"</span>
            {` to get started!`}
          </p>
        </div>
      ) : (
        forms.map((form) => (
          <FormCard
            key={form.id}
            id={form.id}
            title={form.title || 'Untitled Form'}
            createdAt={form.createdAt}
          />
        ))
      )}
    </main>
  );
};


export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="w-full px-4 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <FormCardSkeleton key={i} variant='responseCard' />
          ))}
        </main>
      }
    >
      <ResponsesContent />
    </Suspense>
  );
}
