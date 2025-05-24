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
    const [parsedFormData, setParsedFormData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const { setFormId, previewMode, setTheme, setFormBackground, setBorderStyle } = useFormStore();

    useEffect(() => {
        const fetchForm = async () => {
            setLoading(true);
            setError(null);
            try {
                const formData = await getFormById(id);
                if (!formData) {
                    setError("Form not found or unauthorized access.");
                    setLoading(false);
                    return;
                }
                setTheme(formData.theme);
                setFormBackground(formData.formBackground);
                setBorderStyle(formData.borderStyle);
                setFormId(formData.id);
                try {
                    const cleaned = formData.formData.replace(/```json|```/g, "").trim();
                    const parsed = JSON.parse(cleaned);
                    if (!parsed.fields || !Array.isArray(parsed.fields)) {
                        throw new Error("Invalid form fields");
                    }
                    setParsedFormData(parsed);
                } catch (e) {
                    setError("Invalid form data. Please try again.");
                }
            } catch (e) {
                setError("Failed to fetch form data.");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchForm();
    }, [id]);

    if (loading) {
        return (
            <main className="w-full px-4 py-12 grid gap-8 grid-cols-1 md:grid-cols-3 min-h-[100vh] place-items-center bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 rounded-xl">
                <div className="hidden md:block col-span-1 w-full max-w-xs">
                    <FormSkeleton variant="sidebar" />
                </div>
                <div className="col-span-2 w-full max-w-2xl">
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
                <main >
                    <EditPageHeader />
                    <FormUI parsedFormData={parsedFormData} id={id} />
                </main>
            ) : (
                <>
                    <HeroHeader />
                    <main className="relative flex gap-[2%] flex-wrap content-start mt-16" >
                        <div className="max-lg:hidden pt-1 h-screen">
                            <EditPageSidebar formId={id} />
                        </div>
                        <div className="flex-1 min-w-[320px]">
                            <EditPageHeader />
                            <FormUI parsedFormData={parsedFormData} id={id} />
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default EditFormPage;