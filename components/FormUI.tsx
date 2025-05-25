"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import EditField from './EditField';
import FormSkeleton from './FormSkeleton';
import { getFormById } from '@/db/actions/form.action';
import { useFormStore } from '@/store/formStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';


type UserInputType = Record<string, string | boolean>;

type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
type SelectChangeHandler = (name: string, value: string) => void;
type RadioChangeHandler = (name: string, value: string) => void;

export const renderField = (
    field: Field,
    userInput: UserInputType,
    handleInputChange: InputChangeHandler,
    handleSelectChange: SelectChangeHandler,
    handleRadioChange: RadioChangeHandler
) => {
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
                    value={(userInput[field.name] as string) || ''}
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
                    value={(userInput[field.name] as string) || ''}
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
                <RadioGroup
                    value={(userInput[field.name] as string) || ''}
                    onValueChange={(value) => handleRadioChange(field.name, value)}
                >
                    {field.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${field.name}-${option}`} />
                            <Label htmlFor={`${field.name}-${option}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            );
        default:
            return <p className="text-sm text-muted-foreground">Unsupported field type</p>;
    }
};

const FormUi = ({ parsedFormData, id }: { parsedFormData: FormDefinition; id: string }) => {
    const { theme, formBackground, borderStyle } = useFormStore();
    const [formData, setFormData] = useState<FormDefinition>(parsedFormData);
    const [loading, setLoading] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<UserInputType>({});

    const pathname = usePathname();

    const handleFieldChange = async () => {
        setLoading(true);
        try {
            const form = await getFormById(id);
            const cleaned = form.formData.replace(/```json|```/g, "").trim();
            const parsed: FormDefinition = JSON.parse(cleaned);
            setFormData(parsed);
        } catch {
            toast.error("Failed to update field data");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange: InputChangeHandler = (e) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
        setUserInput((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange: SelectChangeHandler = (name, value) => {
        setUserInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleRadioChange: RadioChangeHandler = (name, value) => {
        setUserInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/save-form-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formId: id, userInput }),
            });

            if (response.ok) {
                toast.success('Form submitted successfully!');
                setTimeout(() => setUserInput({}), 500);
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to save form.');
            }
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("grow text-center p-4", formBackground)}>
            <Card className={cn("w-full mx-auto max-w-2xl", theme, borderStyle)}>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{formData.title}</CardTitle>
                    {formData.subheading && (
                        <p className="text-muted-foreground mt-1">{formData.subheading}</p>
                    )}
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <FormSkeleton />
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {formData.fields.map((field: Field) => (
                                <div key={field.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor={field.name} className="font-medium">
                                            {field.label}
                                        </Label>
                                        {pathname.startsWith("/edit-form/") && (
                                            <EditField defaultValue={field} formId={id} onFieldChange={handleFieldChange} />
                                        )}
                                    </div>
                                    {renderField(field, userInput, handleInputChange, handleSelectChange, handleRadioChange)}
                                </div>
                            ))}
                            <div className='flex justify-end'>
                                <Button type="submit" className="text-white font-semibold cursor-pointer">
                                    Save
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default FormUi;
