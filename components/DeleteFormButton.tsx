"use client";

import { useState } from 'react';
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { deleteFormById } from '@/db/actions/form.action';
import { toast } from "sonner";

const DeleteFormButton = ({ formId }: { formId: string }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteFormById(formId);
            toast.success("Form deleted successfully");
        } catch (error) {
            toast.error("Failed to delete form");
            console.log(error)
        }
        setLoading(false);
        setOpen(false);
    };
    return (
        <>
            <div className="absolute bottom-6 left-3 z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 cursor-pointer rounded-full bg-white/70 dark:bg-black/60 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-500 hover:text-red-700 shadow-md transition-colors"
                    aria-label="Delete form"
                    onClick={() => setOpen(true)}
                >
                    <Trash2 className="w-5 h-5" />
                </Button>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-xs sm:max-w-md rounded-2xl p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                            <Trash2 className="w-5 h-5" />
                            Delete Form?
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                        Are you sure you want to delete this form? This action cannot be undone.
                    </div>
                    <DialogFooter className="flex flex-row gap-2 justify-end mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={loading} className="rounded-lg px-4 py-2 cursor-pointer">
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={loading} className="rounded-lg px-4 py-2 cursor-pointer">
                            {loading ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteFormButton
