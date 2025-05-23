import { getUserForms } from '@/db/actions/form.action';
import FormCard from '@/components/FormCard';
import { Suspense } from 'react';

const DashboardPage = async () => {
  const forms = await getUserForms();

  return (
    <main className="w-full px-4 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {forms.length === 0 ? (
        <div className="col-span-full text-center text-gray-400">No forms found.</div>
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

export default function DashboardPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-muted">Loading dashboard...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
