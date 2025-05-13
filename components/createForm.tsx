import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Sparkle } from "lucide-react";
import { Textarea } from "./ui/textarea";

const CreateForm = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="default" className="gap-2">
                    <Sparkle className="h-4 w-4" />
                    <span>Generate Form with AI</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="border border-primary shadow-xl rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-semibold mb-2">
                        Let AI build your form
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Describe what kind of form you want — our AI will create it in seconds. You can mention field types, validations, or layout ideas.
                            </p>

                            <Textarea
                                className="min-h-[120px] resize-y mb-4"
                                placeholder="Example: Create a contact form with name, email, phone number and message fields. Email should be required and validated."
                            />

                            <p className="text-xs text-muted-foreground mb-6">
                                💡 Tip: The more detailed your prompt, the better the result.
                            </p>

                            <div className="flex justify-end">
                                <Button>
                                    <Sparkle className="h-4 w-4" />
                                    Generate Form
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateForm;
