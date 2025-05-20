"use client";

import EditField from './EditField';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useFormStore } from '@/store/formStore';
import { cn } from '@/lib/utils';

export const renderField = (field: Field) => {
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
                />
            );
        case "textarea":
            return (
                <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                />
            );
        case "dropdown":
            return (
                <Select>
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
                <RadioGroup>
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


const FormUi = ({ parsedFormData, id }: { parsedFormData: FormData, id: string}) => {

const { theme, formBackground, borderStyle } = useFormStore();

    return (
        <div className={cn("grow text-center p-4", formBackground)}>
            <Card className={cn("w-full mx-auto max-w-2xl", theme, borderStyle)}>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {parsedFormData.title}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-6">
                        {parsedFormData.fields.map((field) => (
                            <div key={field.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor={field.name}
                                        className="font-medium flex justify-between items-center"
                                    >
                                        {field.label}
                                        {field.required && (
                                            <span className="text-red-500 ml-1">*</span>
                                        )}
                                    </Label>
                                    <EditField defaultValue={field} formId={id} />
                                </div>
                                {renderField(field)}
                            </div>
                        ))}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default FormUi;
