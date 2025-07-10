import { PlusIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FIELD_TYPES } from '@/lib/constent'
import { useFormStore } from '@/store/formStore'
import { updateFormInDatabase, getFormById } from '@/db/actions/form.action'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const AddFieldButton = () => {
    const { addField } = useFormStore();
    const params = useParams();
    const formId = params?.id as string;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFieldType, setSelectedFieldType] = useState<string>('');
    const [fieldLabel, setFieldLabel] = useState('');
    const [fieldPlaceholder, setFieldPlaceholder] = useState('');
    const [isRequired, setIsRequired] = useState(false);
    const [options, setOptions] = useState<string[]>(['']);
    const [isSaving, setIsSaving] = useState(false);

    const resetForm = () => {
        setFieldLabel('');
        setFieldPlaceholder('');
        setIsRequired(false);
        setOptions(['']);
        setSelectedFieldType('');
    };

    const handleFieldTypeSelect = (fieldType: string) => {
        setSelectedFieldType(fieldType);
        const fieldTypeConfig = FIELD_TYPES.find(f => f.type === fieldType);

        // Set default values based on field type
        setFieldLabel(fieldTypeConfig?.label || fieldType);
        setFieldPlaceholder(`Enter ${fieldType === 'tel' ? 'phone number' : fieldType === 'textarea' ? 'your message' : fieldType}`);

        // Initialize options for dropdown/radio
        if (fieldType === 'dropdown' || fieldType === 'radio') {
            setOptions(['Option 1', 'Option 2', 'Option 3']);
        }

        // Use setTimeout to ensure dropdown closes before dialog opens
        setTimeout(() => {
            setIsDialogOpen(true);
        }, 100);
    };

    const handleAddOption = () => {
        setOptions([...options, `Option ${options.length + 1}`]);
    };

    const handleRemoveOption = (index: number) => {
        if (options.length > 1) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleCreateField = async () => {
        setIsSaving(true);
        try {
            const fieldId = `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // Generate field name from field label
            const generateFieldName = (label: string) => {
                return label
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
                    .replace(/\s+/g, '_') // Replace spaces with underscores
                    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
                    || selectedFieldType; // Fallback to field type if label is empty after processing
            };

            const newField: Field = {
                id: fieldId,
                name: generateFieldName(fieldLabel.trim()),
                label: fieldLabel.trim() || selectedFieldType,
                type: selectedFieldType,
                placeholder: fieldPlaceholder.trim(),
                required: isRequired,
                options: (selectedFieldType === 'dropdown' || selectedFieldType === 'radio')
                    ? options.filter(opt => opt.trim() !== '')
                    : undefined
            };

            // Get current form data from database to ensure we have the latest version
            const currentForm = await getFormById(formId);
            const cleaned = currentForm.formData.replace(/```json|```/g, "").trim();
            let parsed = JSON.parse(cleaned);
            if (typeof parsed === "string") {
                parsed = JSON.parse(parsed);
            }

            // Add the new field to the existing fields
            const updatedFormData = {
                ...parsed,
                fields: [...(parsed.fields || []), newField]
            };

            // Save to database
            await updateFormInDatabase(JSON.stringify(updatedFormData), formId);

            // Add field to store for immediate UI update
            addField(newField);

            toast.success('Field added successfully!');

            // Close dialog and reset form
            setIsDialogOpen(false);
            setTimeout(() => {
                resetForm();
            }, 200);
        } catch (error) {
            console.error('Failed to save field:', error);
            toast.error('Failed to save field to database');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setTimeout(() => {
            resetForm();
        }, 200);
    };

    const needsOptions = selectedFieldType === 'dropdown' || selectedFieldType === 'radio';

    return (
        <>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline" className="right-2 z-10 cursor-pointer">
                                <PlusIcon className='text-primary size-5' />
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Coustom Field</p>
                    </TooltipContent>
                </Tooltip>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Add Field Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {FIELD_TYPES.map((fieldType) => {
                        const IconComponent = fieldType.icon;
                        return (
                            <DropdownMenuItem
                                key={fieldType.type}
                                onClick={() => handleFieldTypeSelect(fieldType.type)}
                                className="cursor-pointer"
                            >
                                <IconComponent className="mr-2 h-4 w-4 text-primary" />
                                <div className="flex flex-col">
                                    <span className="font-medium">{fieldType.label}</span>
                                    <span className="text-xs text-muted-foreground">{fieldType.description}</span>
                                </div>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
                if (!open) {
                    handleCancel();
                } else {
                    setIsDialogOpen(open);
                }
            }}>
                <DialogContent className="sm:max-w-[500px]" onPointerDownOutside={(e) => {
                    e.preventDefault();
                    handleCancel();
                }}>
                    <DialogHeader>
                        <DialogTitle>
                            Configure {FIELD_TYPES.find(f => f.type === selectedFieldType)?.label} Field
                        </DialogTitle>
                        <DialogDescription>
                            Customize your field settings below
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fieldLabel">Field Label</Label>
                            <Input
                                id="fieldLabel"
                                value={fieldLabel}
                                onChange={(e) => setFieldLabel(e.target.value)}
                                placeholder="e.g., First Name, Email Address"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fieldPlaceholder">Placeholder Text</Label>
                            <Input
                                id="fieldPlaceholder"
                                value={fieldPlaceholder}
                                onChange={(e) => setFieldPlaceholder(e.target.value)}
                                placeholder="Enter placeholder text"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="required"
                                checked={isRequired}
                                onChange={(e) => setIsRequired(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <Label htmlFor="required">Required field</Label>
                        </div>

                        {needsOptions && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>Options</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddOption}
                                    >
                                        Add Option
                                    </Button>
                                </div>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {options.map((option, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Input
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                placeholder={`Option ${index + 1}`}
                                                className="flex-1"
                                            />
                                            {options.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleRemoveOption(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCreateField}
                            disabled={!fieldLabel.trim() || isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Add Field'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddFieldButton
