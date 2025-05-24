"use client";

import EditField from './EditField';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useFormStore } from '@/store/formStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { getFormById } from '@/db/actions/form.action';
import FormSkeleton from './FormSkeleton';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { toast } from "sonner"

export const renderField = (field: Field, userInput: any, handleInputChange: any, handleSelectChange: any, handleRadioChange: any) => {
    switch (field.type) {
        case "text":
        case "email":
        case "date":
        case "number":
        case "tel":
            return (
                <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={userInput[field.name] || ''}
                    onChange={handleInputChange}
                />
            );
        case "textarea":
            return (
                <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={userInput[field.name] || ''}
                    onChange={handleInputChange}
                />
            );
        case "dropdown":
            return (
                <Select onValueChange={(value) => handleSelectChange(field.name, value)}>
                    <SelectTrigger id={field.name}>
                        <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        case "radio":
            return (
                <RadioGroup value={userInput[field.name]} onValueChange={(value) => handleRadioChange(field.name, value)}>
                    {field.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={option}
                                id={`${field.name}-${option}`}
                            />
                            <Label htmlFor={`${field.name}-${option}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            );
        default:
            return <p className="text-sm text-muted-foreground">Unsupported field type</p>;
    }
};


const FormUi = ({ parsedFormData, id }: { parsedFormData: FormData, id: string }) => {
    const { theme, formBackground, borderStyle } = useFormStore();
    const [formData, setFormData] = useState(parsedFormData);
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState<any>({});

    const pathname = usePathname();

    const handleFieldChange = async () => {
        setLoading(true);
        try {
            const form = await getFormById(id);
            const cleaned = form.formData.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(cleaned);
            setFormData(parsed);
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
        setUserInput((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setUserInput((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRadioChange = (name: string, value: string) => {
        setUserInput((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            setLoading(true);
            const response = await fetch('/api/save-form-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formId: id, userInput }),
            });
            if (response.ok) {
                toast.success('Form saved successfully!');
                setUserInput({});
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to save form.');
            }
        } catch (error: any) {
            toast.error(error?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("grow text-center p-4", formBackground)}>
            <Card className={cn("w-full mx-auto max-w-2xl", theme, borderStyle)}>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {formData.title}
                    </CardTitle>
                    {formData.subheading && (
                        <p className="text-muted-foreground mt-1">{formData.subheading}</p>
                    )}
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <FormSkeleton />
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {formData.fields.map((field: any) => (
                                <div key={field.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor={field.name}
                                            className="font-medium flex justify-between items-center"
                                        >
                                            {field.label}
                                            
                                        </Label>
                                        {pathname.startsWith("/edit-form/") && (
                                            <EditField defaultValue={field} formId={id} onFieldChange={handleFieldChange} />
                                        )}
                                    </div>
                                    {renderField(field, userInput, handleInputChange, handleSelectChange, handleRadioChange)}
                                </div>
                            ))}
                            <Button type="submit" className="flex justify-self-end-safe text-white font-semibold cursor-pointer">Save</Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default FormUi;
