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
        <Button size="sm" className="cursor-pointer font-semibold" onClick={handleNativeShare}>
            <Share2 />
        </Button>
    )
}

export default ShareButton
