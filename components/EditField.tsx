"use client";

import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { deleteFieldFromDatabase, updateFieldInDatabase } from "@/db/actions/form.action";

interface FieldType {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    [key: string]: any;
}

interface EditFieldProps {
    defaultValue: FieldType;
    formId: string;
    onFieldChange?: () => void; // Add callback prop
}

const EditField = ({ defaultValue, formId, onFieldChange }: EditFieldProps) => {
    const [label, setLabel] = useState<string>(defaultValue.label || "");
    const [placeholder, setPlaceholder] = useState<string>(defaultValue.placeholder || "");
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);


    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const updatedField: FieldType = {
            ...defaultValue,
            label,
            name: label.toLowerCase().replace(/\s+/g, "_"),
            placeholder,
        };

        try {
            const res = await updateFieldInDatabase(updatedField, formId);
            if (res.success && onFieldChange) {
                onFieldChange();
            }
            setIsEditOpen(false);
        } catch (err) {
            console.error("Failed to update field:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteField = async () => {
        setIsDeleting(true);
        try {
            await deleteFieldFromDatabase(defaultValue.id, formId);
            if (onFieldChange) onFieldChange(); // Notify parent to refresh
            setIsDeleteOpen(false);
        } catch (err) {
            console.error("Failed to delete field:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Edit Button */}
            <Popover open={isEditOpen} onOpenChange={setIsEditOpen}>
                <PopoverTrigger asChild>
                    <Edit2 className="size-4 text-primary cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-80 space-y-4 shadow-lg">
                    <form onSubmit={handleEdit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="label">Label</Label>
                            <Input
                                id="label"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="placeholder">Placeholder</Label>
                            <Input
                                id="placeholder"
                                value={placeholder}
                                onChange={(e) => setPlaceholder(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button size="sm" type="submit" className="cursor-pointer"
                                disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </PopoverContent>
            </Popover>

            {/* Delete Button */}
            <Popover open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <PopoverTrigger asChild>
                    <Trash2 className="size-4 text-red-600 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-64">
                    <div className="text-sm mb-3">Are you sure you want to delete this field?</div>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsDeleteOpen(false)}
                            className="cursor-pointer"
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDeleteField}
                            disabled={isDeleting}
                            className="cursor-pointer"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default EditField;
