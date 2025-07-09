"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import FormUI from "@/components/FormUI";
import { getFormByIdPublic } from "@/db/actions/form.action";
import { useFormStore } from "@/store/formStore";
import FormSkeleton from "@/components/FormSkeleton";


const Page = () => {
    const params = useParams();
    const { id } = params as { id: string };
    const [parsedFormData, setParsedFormData] = useState<FormDefinition | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const { setTheme, setFormBackground, setBorderStyle } = useFormStore();

    useEffect(() => {
        const fetchForm = async () => {
            setLoading(true);
            setError(null);
            try {
                const formData = await getFormByIdPublic(id);
                console.log("Fetched formData:", formData);
                if (!formData || !formData.formData) {
                    setError("Form not found or contains no data.");
                    setLoading(false);
                    return;
                }
                const validTheme = (formData.theme === "light" || formData.theme === "dark") ? formData.theme : "light";
                setTheme(validTheme);
                setFormBackground(formData.formBackground);
                setBorderStyle(formData.borderStyle);
                try {
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
                        setParsedFormData(parsed);
                        return;
                    }
                    setParsedFormData(parsed);
                } catch (err) {
                    console.error("Form parse error:", err);
                    setError("Invalid form data. Please try again.");
                }
            } catch (err) {
                console.error("Form fetch error:", err);
                setError("Failed to fetch form data: " + (err));
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchForm();
    }, [id, setTheme, setFormBackground, setBorderStyle]);

    if (loading) {
        return (
            <main className="flex gap-[2%] flex-wrap content-start min-h-[100vh]">
                <div className="flex-1 max-w-2xl mx-auto mt-4 border-4 border-gray-200 rounded-xl p-4">
                    <FormSkeleton />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex items-center justify-center min-h-[60vh]">
                <Card>
                    <CardContent>
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
            {parsedFormData && <FormUI parsedFormData={parsedFormData} id={id} />}

        </>
    );
};

export default Page;