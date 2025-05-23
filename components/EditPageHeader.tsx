"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFormStore } from "@/store/formStore";
import { ArrowBigLeftDash, Eye, Share2Icon } from "lucide-react";

export default function EditPageHeader() {

    const { previewMode, setPreviewMode } = useFormStore();
    const { formId } = useFormStore();

    return (
        <header className="w-full border-b bg-background/50 backdrop-blur-3xl z-30 sticky top-0">
            <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6 py-3 max-w-7xl mx-auto">
                {/* Branding (left) */}
                <Link href="/" className="flex items-center gap-1 select-none" aria-label="home">
                    <Image src="/logo.svg" alt="Logo" width={36} height={36} className="h-9 w-9" />
                    <span className="font-bold lg:text-xl tracking-tight inline-block">FormPilot</span>
                </Link>
                {/* Buttons (right) */}
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="cursor-pointer font-semibold max-lg:hidden"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        {previewMode ? <ArrowBigLeftDash /> : <Eye />}
                        {previewMode ? 'Back' : 'Preview'}
                    </Button>

                    <Button size="sm" className="cursor-pointer font-semibold">
                        <Link href={`/formPilot/${formId}`} className="flex items-center gap-1" target="_blank">
                            <Share2Icon />
                            <span className="max-lg:hidden">Share</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
