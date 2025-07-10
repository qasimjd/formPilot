"use client";

import { toast } from "sonner"
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const ShareButton = ({ formId, title }: { formId: string, title: string }) => {


    const handleNativeShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: title,
                    text: "Check out this form!",
                    url: `/formPilot/${formId}`,
                })
                .catch((error) => {
                    console.error("Error sharing:", error);
                });
        } else {
            toast.error("Sharing is not supported in this browser.");
        }
    };

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" className="cursor-pointer font-semibold" onClick={handleNativeShare} data-share-button>
                        <Share2 className="size-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Share Form</p>
                </TooltipContent>
            </Tooltip>
        </>
    )
}

export default ShareButton
