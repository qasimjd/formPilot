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
    setForm,
  } = useFormStore();

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      setError(null);
      try {
        const formData = await getFormById(id);
        if (!formData || !formData.formData) {
          throw new Error("Form not found or contains no data.");
        }

        const validTheme = (formData.theme === "light" || formData.theme === "dark") ? formData.theme : "light";
        setTheme(validTheme);
        setFormBackground(formData.formBackground);
        setBorderStyle(formData.borderStyle);
        setFormId(formData.id);

        const cleaned = formData.formData.replace(/```json|```/g, "").trim();
        let parsed = JSON.parse(cleaned);
        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }
        if (!parsed.fields || !Array.isArray(parsed.fields)) {
          parsed.fields = [];
        }
        if (parsed.fields.length === 0) {
          setError("This form has no fields. Please add at least one field.");
          setParsedFormData(parsed); // Still set so UI can render
          setForm(parsed.title || "", []); // Set empty fields in store
          return;
        }
        setParsedFormData(parsed);
        // Set the form data in the store so new fields can be added
        setForm(parsed.title || "", parsed.fields || []);
      } catch (error) {
        console.error("Form fetch error:", error);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchForm();
  }, [id, setFormId]);

  if (loading) {
    return (
      <main className="relative flex gap-2 flex-wrap content-start mt-4 min-h-[100vh] px-4 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 rounded-xl">
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
        <main className="relative flex flex-wrap content-start">
          <div className="sticky top-4 max-lg:hidden left-0 z-20 h-fit m-4 flex flex-col justify-between rounded-2xl border border-primary bg-background p-4 shadow-2xl backdrop-blur-md transition-all duration-300 max-sm:px-2 sm:p-4 lg:min-w-72 space-y-8">
            <EditPageSidebar formId={id} />
          </div>
          <div className="flex-1 min-w-[320px]">
            <EditPageHeader />
            {parsedFormData && <FormUI parsedFormData={parsedFormData} id={id} />}
          </div>
        </main>
      )}
    </>
  );
};

export default EditFormPage;
