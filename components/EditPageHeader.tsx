"use client";

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";
import { ArrowLeft, Fullscreen } from "lucide-react";
import ShareButton from "@/components/shareButton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MobNav from "./MobNav";
import AddFieldButton from "./AddFieldButton";

export default function EditPageHeader() {

    const { previewMode, setPreviewMode, title, formId } = useFormStore();

    return (
        <header className={`w-full ${previewMode ? 'top-0' : 'lg:mt-4 mb-1 top-2 lg:top-4 border border-primary rounded-2xl'} min-w-[220px] mx-auto bg-background/70 shadow-lg backdrop-blur-lg z-30 sticky px-6 py-2 flex flex-col`}>
            <div className={cn("flex items-center justify-between w-full", previewMode && "max-w-7xl mx-auto")}>
                {/* Branding (left) */}
                <div className="flex items-start lg:items-center gap-2 lg:gap-3 w-full">
                    <div className="bg-primary/10 rounded-full p-2 shadow-inner max-lg:hidden">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#2563eb" fillOpacity="0.1" />
                            <text x="50%" y="55%" textAnchor="middle" fill="#2563eb" fontSize="16" fontWeight="bold" dy=".3em">FP</text>
                        </svg>
                    </div>

                    <span className="lg:hidden z-50 flex items-center justify-center">
                        <MobNav formId={formId} />
                    </span>

                    <h2 className="text-xl font-bold tracking-tight text-primary drop-shadow-sm">{previewMode ? "Preview Mode" : "Edit your Form"}</h2>
                </div>
                {/* Buttons (right) */}
                <div className="flex gap-2 items-center">

                    <AddFieldButton />

                    <Button variant="outline" className="cursor-pointer font-semibold max-lg:hidden border-primary/40 bg-white/70 hover:bg-primary/10 transition-colors shadow"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        {previewMode ? <ArrowLeft /> : <Fullscreen className="font-bold size-4" />}
                        {previewMode ? 'Back' : ''}
                    </Button>

                    <ShareButton formId={formId} title={title} />

                    <Button variant="outline" size="sm" asChild className="cursor-pointer font-semibold border-primary/40 bg-white/70 hover:bg-primary/10 transition-colors shadow">
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </Button>

                </div>
            </div>
        </header>
    );
}
