import { getUserForms } from '@/db/actions/form.action';
import FormCard from '@/components/FormCard';
import { Suspense } from 'react';
import FormCardSkeleton from '@/components/FormCardSkeleton';
import Image from 'next/image';

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  title: 'Dashboard',
  description: 'Manage your forms and responses',
};

const DashboardContent = async () => {
  const forms = await getUserForms();

  return (
    <main className="w-full p-4 max-md:mt-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight flex items-center gap-2">
        All Forms
      </h1>
      <p className="text-muted-foreground  mb-4 lg:mb-8 text-base md:text-lg">
        Manage, analyze, and grow your forms. Easily track submissions and performance below.
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {forms.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 gap-4">
            <Image src="/no-data.png" height={140} width={140} alt="No forms found" className="opacity-60 drop-shadow-xl" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-2">No Forms Yet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs text-center">
              You haven&apos;t created any forms yet. Click <span className="font-semibold text-primary">&quot;Generate Form&quot;</span> to get started!
            </p>
          </div>
        ) : null}
        {forms.length > 0 && forms.map((form) => (
          <FormCard
            key={form.id}
            id={form.id}
            title={form.title || 'Untitled Form'}
            createdAt={form.createdAt}
            responsesCount={form.responsesCount}
            variant="formCard"
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
        <main className="w-full p-4 max-md:mt-4 md:p-8 max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight flex items-center gap-2">
            All Forms
          </h1>
          <p className="text-muted-foreground mb-8 text-base md:text-lg">
            Manage, analyze, and grow your forms. Easily track submissions and performance below.
          </p>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <FormCardSkeleton key={i} variant='formCard' />
            ))}
          </div>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
