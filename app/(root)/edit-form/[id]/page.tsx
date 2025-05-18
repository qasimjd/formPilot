import { db } from "@/db";
import { JsonForms } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import EditField from "@/components/EditField";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

interface Field {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
}

interface FormData {
    title: string;
    fields: Field[];
}

const renderField = (field: Field) => {
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

const editFormPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { userId } = await auth();

    if (!userId) return null;

    const results = await db
        .select()
        .from(JsonForms)
        .where(and(eq(JsonForms.id, id), eq(JsonForms.createdBy, userId)));
    const form = results[0];

    if (!form) {
        return (
            <main className="flex items-center justify-center min-h-[60vh]">
                <Card>
                    <CardContent>
                        <div className="text-center text-lg font-semibold text-red-500 py-8">
                            Form not found or unauthorized access.
                        </div>
                    </CardContent>
                </Card>
            </main>
        );
    }

    let parsedFormData: FormData;
    try {
        const cleaned = form.formData.replace(/```json|```/g, "").trim();
        parsedFormData = JSON.parse(cleaned);

        if (!parsedFormData.fields || !Array.isArray(parsedFormData.fields)) {
            throw new Error("Invalid form fields");
        }
    } catch (error) {
        return (
            <main className="flex items-center justify-center min-h-[60vh]">
                <Card>
                    <CardContent>
                        <Button
                            asChild
                            variant="outline"
                            className="absolute top-4 left-4 hover:bg-primary hover:text-white"
                        >
                            <Link href="/dashboard">
                                <MoveLeft className="mr-2" />
                                Back
                            </Link>
                        </Button>
                        <div className="text-center text-lg font-semibold text-red-500 py-8">
                            Invalid form data. Please try again.
                        </div>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="flex items-center justify-center py-10">
            <Button
                asChild
                size="sm"
                className="absolute top-4 left-4"
            >
                <Link href="/dashboard">
                    <MoveLeft />
                    Back
                </Link>
            </Button>

            <Card className="w-full max-w-2xl">
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
        </main>
    );
};

export default editFormPage;