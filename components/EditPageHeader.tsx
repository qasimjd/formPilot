"use client";

import { useFormStore } from "@/store/formStore";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Fullscreen,
  LayoutDashboard,
  Share2,
  EllipsisVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import MobNav from "./MobNav";
import AddFieldButton from "./AddFieldButton";
import ShareButton from "@/components/shareButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function EditPageHeader() {
  const { previewMode, setPreviewMode, title, formId } = useFormStore();

  const triggerClick = (selector: string) => {
    const btn = document.querySelector(selector) as HTMLButtonElement;
    if (btn) btn.click();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full px-4 py-3 transition-all duration-300",
        "backdrop-blur-md bg-background/80 border-b border-border shadow-lg"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="lg:hidden">
            <MobNav formId={formId} />
          </div>

          <div className="hidden lg:block bg-primary/10 border border-primary/20 rounded-xl p-2 shadow-inner">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="url(#gradient)" />
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                dy=".3em"
              >
                FP
              </text>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="truncate">
            <h2 className="font-semibold text-lg sm:text-xl text-primary">
              {previewMode ? "Preview Mode" : title || "Untitled Form"}
            </h2>
            {!previewMode && (
              <p className="text-sm text-muted-foreground truncate">
                Editing form layout
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <AddFieldButton />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border bg-white/80 hover:bg-primary/10 transition"
                >
                  <EllipsisVertical className="size-5 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => triggerClick("[data-share-button]")}
                >
                  <Share2 className="size-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {!previewMode && (<Tooltip>
              <TooltipTrigger> <AddFieldButton /></TooltipTrigger>
              <TooltipContent>
                <p>Add Coustom Field</p>
              </TooltipContent>
            </Tooltip>)}

            <Tooltip>
              <TooltipTrigger>
                <ShareButton formId={formId} title={title} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Share Form</p>
              </TooltipContent>
            </Tooltip>

            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="transition shadow hover:scale-[1.03] cursor-pointer"
            >
              {previewMode ? (
                <>
                  <ArrowLeft className="size-4 text-primary" />
                  Edit
                </>
              ) : (
                <>
                  <Fullscreen className="size-4 text-primary" />
                  Preview
                </>
              )}
            </Button>

            <Button asChild variant="outline" className="transition shadow hover:scale-[1.03]">
              <Link href="/dashboard" className="flex items-center gap-1.5">
                <LayoutDashboard className="size-4 text-primary" />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
