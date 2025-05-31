import { getFormResponsesById } from '@/db/actions/formResponse.action';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


export const dynamic = "force-dynamic";
export const revalidate = 0; 
export const runtime = "edge";
export const metadata = {
  title: 'Form Responses',
  description: 'View and manage responses for your forms',
};



const ResponsesPage = async ({ params }: { params: Promise<{ id: string }> }) => {
 
  const {id} = await(params)

  const responses = await getFormResponsesById(id);

  return (
    <main className="max-w-2xl mx-auto p-4 h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Responses</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard/responses"><ArrowLeft/>Back</Link>
        </Button>
      </div>
      {responses.length === 0 ? (
        <div className="text-center text-gray-500">No responses yet.</div>
      ) : (
        <div className="space-y-6 overflow-y-scroll h-[calc(100vh-200px)]">
          {responses.map((resp, idx) => (
            <Card key={resp.id || idx}>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Response {idx + 1}
                  <span className="ml-2 text-xs text-gray-400 font-mono">
                    {resp.createdAt ? format(new Date(resp.createdAt), "PPP p") : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded-md overflow-x-auto">
                  {JSON.stringify(resp.answers, null, 2)}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default ResponsesPage;
