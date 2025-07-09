import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import EditPageSidebar from "@/components/EditFormSidebar";
import { PanelLeftOpen } from "lucide-react";


const MobNav = ({ formId }: { formId: string }) => {
    return (
        <aside>
            <Sheet>
                <SheetTrigger><PanelLeftOpen className="size-6 text-primary" /></SheetTrigger>
                <SheetContent side="left" className="px-4">
                    <SheetHeader >
                        <SheetTitle className="sr-only">Nav</SheetTitle>
                        <SheetDescription className="sr-only">Dec</SheetDescription>
                    </SheetHeader>
                    <EditPageSidebar formId={formId} />
                </SheetContent>
            </Sheet>
        </aside>
    )
}

export default MobNav
