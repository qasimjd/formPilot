import { auth } from "@clerk/nextjs/server";
import { db } from '@/db';
import { JsonForms } from "../schema";
import { and, eq } from "drizzle-orm";

export const saveFormResponse = async (formId: string, response: any) => {
    try {
        const { userId } = await auth();
        // You may want to create a new table for responses, but for now, let's append to JsonForms as a demo
        // In production, create a new table for responses
        const form = await db.select().from(JsonForms).where(eq(JsonForms.id, formId));
        if (!form.length) throw new Error("Form not found");
        // Save responses as a JSON array in a new field or log
        // For now, just log or return
        return { success: true, response };
    } catch (error) {
        console.error("Error saving form response:", error);
        throw new Error("Failed to save form response");
    }
};
