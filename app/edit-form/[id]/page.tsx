"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import EditPageSidebar from "@/components/EditFormSidebar";
import FormUI from "@/components/FormUI";
import { getFormById } from "@/db/actions/form.action";
import EditPageHeader from "@/components/EditPageHeader";
import { useFormStore } from "@/store/formStore";
import FormSkeleton from "@/components/FormSkeleton";
import { HeroHeader } from "@/components/hero8-header";


const EditFormPage = () => {
  const params = useParams();
  const { id } = params as { id: string };

  const [parsedFormData, setParsedFormData] = useState<FormDefinition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    setFormId,
    previewMode,
    setTheme,
    setFormBackground,
    setBorderStyle,
  } = useFormStore();

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      setError(null);
      try {
        const formData = await getFormById(id);
        if (!formData) {
          setError("Form not found or unauthorized access.");
          return;
        }

        setTheme(formData.theme);
        setFormBackground(formData.formBackground);
        setBorderStyle(formData.borderStyle);
        setFormId(formData.id);

        const cleaned = formData.formData.replace(/```json|```/g, "").trim();
        const parsed: FormDefinition = JSON.parse(cleaned);

        if (!parsed.fields || !Array.isArray(parsed.fields)) {
          throw new Error("Invalid form fields");
        }

        setParsedFormData(parsed);
      } catch {
        setError("Invalid or failed to fetch form data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchForm();
  }, [id, setFormId, setTheme, setFormBackground, setBorderStyle]);

  if (loading) {
  return (
    <main className="relative flex gap-2 flex-wrap content-start mt-16 min-h-[100vh] px-4 py-12 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 rounded-xl">
      <div className="max-lg:hidden pt-1 h-screen border-4 border-gray-200 rounded-xl p-4 max-w-xs w-full">
        <FormSkeleton variant="sidebar" />
      </div>
      <div className="flex-1 min-w-[320px] border-4 border-gray-200 rounded-xl p-4 mx-auto w-full">
        <FormSkeleton variant="form" />
      </div>
    </main>
  );
}

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <Card>
          <CardContent>
            <Button
              asChild
              variant="outline"
              className="absolute top-4 left-4 hover:bg-primary hover:text-white"
            >
              <Link href="/dashboard">
                <MoveLeft className="mr-2" />
                Back
              </Link>
            </Button>
            <div className="text-center text-lg font-semibold text-red-500 py-8">
              {error}
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <>
      {previewMode ? (
        <main>
          <EditPageHeader />
          {parsedFormData && <FormUI parsedFormData={parsedFormData} id={id} />}
        </main>
      ) : (
        <>
          <HeroHeader />
          <main className="relative flex flex-wrap content-start mt-16">
              <EditPageSidebar formId={id} />
            <div className="flex-1 min-w-[320px]">
              <EditPageHeader />
              {parsedFormData && <FormUI parsedFormData={parsedFormData} id={id} />}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default EditFormPage;
