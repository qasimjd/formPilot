"use client";

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";
import { ArrowLeft, EllipsisVertical, Fullscreen, LayoutDashboard, Plus, Share2 } from "lucide-react";
import ShareButton from "@/components/shareButton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MobNav from "./MobNav";
import AddFieldButton from "./AddFieldButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EditPageHeader() {

    const { previewMode, setPreviewMode, title, formId } = useFormStore();

    return (
        <header className={cn(
            "w-full min-w-[220px] mx-auto bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-xl border shadow-xl z-30 sticky transition-all duration-300",
            previewMode 
                ? "top-0 border-b border-border/50 rounded-none px-4 py-3" 
                : "lg:mt-4 mb-2 top-2 lg:top-4 border-primary/30 rounded-2xl px-4 lg:px-6 py-3 shadow-2xl"
        )}>
            <div className={cn(
                "flex items-center justify-between w-full gap-3",
                previewMode && "max-w-7xl mx-auto"
            )}>
                {/* Branding (left) */}
                <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-2 shadow-inner border border-primary/20 hidden lg:block">
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="url(#gradient)" />
                            <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" dy=".3em">FP</text>
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#1d4ed8" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <span className="lg:hidden z-50 flex items-center justify-center">
                        <MobNav formId={formId} />

                    </span>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-lg lg:text-xl font-bold tracking-tight text-primary drop-shadow-lg truncate">
                            {previewMode ? "Preview Mode" : "Edit Form"}
                        </h2>
                    </div>
                </div>
                
                {/* Buttons (right) */}
                <div className="flex gap-1.5 lg:gap-2 items-center flex-shrink-0">
                    {/* Mobile dropdown menu */}
                    <div className="lg:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="cursor-pointer text-primary font-semibold border-primary/40 bg-white/80 hover:bg-primary/10 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                                >
                                    <EllipsisVertical className="size-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {!previewMode && (
                                    <>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                // Trigger the AddFieldButton dialog
                                                const addFieldBtn = document.querySelector('[data-add-field-button]') as HTMLButtonElement;
                                                if (addFieldBtn) addFieldBtn.click();
                                            }}
                                        >
                                            <Plus className="size-4 mr-2" />
                                            Add Field
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </>
                                )}
                                <DropdownMenuItem
                                    onClick={() => {
                                        // Trigger the ShareButton
                                        const shareBtn = document.querySelector('[data-share-button]') as HTMLButtonElement;
                                        if (shareBtn) shareBtn.click();
                                    }}
                                >
                                    <Share2 className="size-4 mr-2" />
                                    Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard" className="flex items-center">
                                        <LayoutDashboard className="size-4 mr-2" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Desktop buttons */}
                    <div className="hidden lg:flex gap-1.5 lg:gap-2 items-center">
                        {!previewMode && (
                            <AddFieldButton />
                        )}

                        <ShareButton formId={formId} title={title} />

                        <Button 
                            variant="outline" 
                            size={previewMode ? "lg" : "default"}
                            className="cursor-pointer font-semibold border-primary/40 bg-white/80 hover:bg-primary/10 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                            onClick={() => setPreviewMode(!previewMode)}
                        >
                            {previewMode ? (
                                <>
                                    <ArrowLeft className="size-4" />
                                    <span className="hidden lg:inline">Edit</span>
                                </>
                            ) : (
                                <>
                                    <Fullscreen className="size-4" />
                                    <span className="hidden lg:inline">Preview</span>
                                </>
                            )}
                        </Button>


                        <Button 
                            variant="outline" 
                            size="lg" 
                            asChild 
                            className="cursor-pointer font-semibold border-primary/40 bg-white/80 hover:bg-primary/10 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                        >
                            <Link href="/dashboard" className="flex items-center gap-1.5">
                                <span className="hidden lg:inline">Dashboard</span>
                                <span className="lg:hidden"><LayoutDashboard /></span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
