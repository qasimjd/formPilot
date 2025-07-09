"use client";

import { toast } from "sonner"
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";

const ShareButton = ({formId, title}: {formId:string, title:string}) => {


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
        <Button size="sm" variant="outline" className="cursor-pointer font-semibold" onClick={handleNativeShare} data-share-button>
            <Share2 className="text-primary size-4" />
        </Button>
    )
}

export default ShareButton
