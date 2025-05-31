"use client";

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";
import { ArrowLeft, Eye } from "lucide-react";
import ShareButton from "@/components/shareButton";

export default function EditPageHeader() {

    const { previewMode, setPreviewMode, title, formId } = useFormStore();

    return (
        <header className={`w-full ${previewMode ? 'max-w-4xl' : ''} min-w-[220px] my-4 mx-auto border border-primary rounded-2xl bg-background/70 shadow-lg backdrop-blur-lg z-30 sticky top-1 px-6 py-2 flex flex-col`}>
            <div className="flex items-center justify-between w-full">
                {/* Branding (left) */}
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2 shadow-inner">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#2563eb" fillOpacity="0.1"/>
                            <text x="50%" y="55%" textAnchor="middle" fill="#2563eb" fontSize="16" fontWeight="bold" dy=".3em">FP</text>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-primary drop-shadow-sm">{previewMode? "Preview Mode": "Edit your Form"}</h2>
                </div>
                {/* Buttons (right) */}
                <div className="flex gap-2 items-center">
                    <Button variant="outline" size="sm" className="cursor-pointer font-semibold max-lg:hidden border-primary/40 bg-white/70 hover:bg-primary/10 transition-colors shadow"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        {previewMode ? <ArrowLeft className="mr-1" /> : <Eye className="mr-1" />}
                        {previewMode ? 'Back' : 'Preview'}
                    </Button>
                    <ShareButton formId={formId} title={title} />
                </div>
            </div>
        </header>
    );
}
