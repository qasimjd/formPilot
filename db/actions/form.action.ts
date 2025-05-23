"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from '@/db';
import { JsonForms } from "../schema";
import { and, eq } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";


export const saveFormToDatabase = async (formData: any) => {
    try {
        const { userId } = await auth();

        const res = await db.insert(JsonForms)
            .values({
                formData,
                createdBy: userId || 'unknown',
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning({ id: JsonForms.id });

        const formId = res[0]?.id;
        return formId;

    } catch (error) {
        console.error("Error saving form to database:", error);
        throw new Error("Failed to save form");
    }
}

export const findeFormById = async (id: string) => {
    try {
        const { userId } = await auth();

        const results = await db.select().from(JsonForms).where(
            and(
                eq(JsonForms.id, id),
                eq(JsonForms.createdBy, userId || 'unknown')
            )
        );

        if (results.length === 0) {
            throw new Error("Form not found");
        }

        return results[0];

    } catch (error) {
        console.error("Error finding form by ID:", error);
        throw new Error("Failed to find form");
    }
}

interface FieldType {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    [key: string]: any;
}
export const updateFieldInDatabase = async (
    updatedField: FieldType,
    formId: string
) => {
    try {
        if (!formId || typeof formId !== "string") {
            throw new Error("Invalid formId passed to updateFieldInDatabase");
        }

        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized: No user found");
        }

        const results = await db
            .select()
            .from(JsonForms)
            .where(and(eq(JsonForms.id, formId), eq(JsonForms.createdBy, userId)));

        if (!results.length) {
            throw new Error("Form not found or access denied");
        }

        const formData = results[0].formData;
        const cleaned = formData.replace(/```json|```/g, "").trim();

        let parsed: any;
        try {
            parsed = JSON.parse(cleaned);
        } catch (e) {
            throw new Error("Invalid JSON in formData");
        }

        if (!Array.isArray(parsed.fields)) {
            throw new Error("Invalid form structure: 'fields' is not an array");
        }

        parsed.fields = parsed.fields.map((field: FieldType) =>
            field.id === updatedField.id ? { ...field, ...updatedField } : field
        );

        const updated = await db
            .update(JsonForms)
            .set({
                formData: JSON.stringify(parsed),
                updatedAt: new Date(),
            })
            .where(and(eq(JsonForms.id, formId), eq(JsonForms.createdBy, userId)))
            .returning({ id: JsonForms.id });


        return {
            success:true,
            date: updated[0]
        };
    } catch (error) {
        console.error("Error updating field in database:", error);
        throw new Error("Failed to update field");
    }
};

export const deleteFieldFromDatabase = async (fieldId: string, formId: string) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized: No user found");
        }

        const results = await db
            .select()
            .from(JsonForms)
            .where(and(eq(JsonForms.id, formId), eq(JsonForms.createdBy, userId)));

        if (!results.length) {
            throw new Error("Form not found or access denied");
        }
        const formData = results[0].formData;
        const cleaned = formData.replace(/```json|```/g, "").trim();
        let parsed: any;
        try {
            parsed = JSON.parse(cleaned);
        } catch (e) {
            throw new Error("Invalid JSON in formData");
        }

        if (!Array.isArray(parsed.fields)) {
            throw new Error("Invalid form structure: 'fields' is not an array");
        }

        parsed.fields = parsed.fields.filter((field: FieldType) => field.id !== fieldId);
        const updated = await db
            .update(JsonForms)
            .set({
                formData: JSON.stringify(parsed),
                updatedAt: new Date(),
            })
            .where(and(eq(JsonForms.id, formId), eq(JsonForms.createdBy, userId)))
            .returning({ id: JsonForms.id });
        if (updated.length === 0) {
            throw new Error("Failed to delete field");
        }
    } catch (error) {

    }
};

export const getFormById = async (id: string) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized: No user found");
        }

        const results = await db
            .select()
            .from(JsonForms)
            .where(and(eq(JsonForms.id, id), eq(JsonForms.createdBy, userId)));
        const form = results[0];

        if (!results.length) {
            throw new Error("Form not found or access denied");
        }

        return form;
    } catch (error) {
        console.error("Error getting form by ID:", error);
        throw new Error("Failed to get form");
    }
}

export const updateFormStyles = async ({ formId, theme, formBackground, borderStyle }: { formId: string, theme: string, formBackground: string, borderStyle: string }) => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized: No user found");
        const updated = await db
            .update(JsonForms)
            .set({
                theme,
                formBackground,
                borderStyle,
                updatedAt: new Date(),
            })
            .where(and(eq(JsonForms.id, formId), eq(JsonForms.createdBy, userId)))
            .returning({ id: JsonForms.id });
        if (!updated.length) throw new Error("Failed to update form styles");
        return { success: true, id: updated[0].id };
    } catch (error) {
        console.error("Error updating form styles:", error);
        throw new Error("Failed to update form styles");
    }
};