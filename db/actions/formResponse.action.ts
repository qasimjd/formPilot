import { auth } from "@clerk/nextjs/server";
import { db } from '@/db';
import { FormResponses, JsonForms } from "../schema";
import { eq, sql } from "drizzle-orm";

interface FormAnswer {
    [fieldId: string]: string | number | boolean | null;
}

export const saveFormResponse = async (formId: string, response: FormAnswer) => {
    try {
        const { userId } = await auth();
        const insertResult = await db.insert(FormResponses).values({
            formId,
            responseData: JSON.stringify(response),
            submittedBy: userId ?? "anonymous",
        }).returning();

        if (insertResult.length > 0) {
            await db
                .update(JsonForms)
                .set({
                    responsesCount: sql`"responses_count" + 1`,
                })
                .where(eq(JsonForms.id, formId));
        }

        return { success: true };
    } catch (error) {
        console.error("Error saving form response:", error);
        throw new Error("Failed to save form response");
    }
};

export const getFormResponsesById = async (formId: string) => {
    try {
        const responses = await db.select().from(FormResponses).where(eq(FormResponses.formId, formId)).orderBy(FormResponses.submittedAt);
        return responses.map((resp) => ({
            id: resp.id,
            createdAt: resp.submittedAt,
            answers: JSON.parse(resp.responseData),
            submittedBy: resp.submittedBy,
        }));
    } catch (error) {
        console.error("Error fetching form responses:", error);
        throw new Error("Failed to fetch form responses");
    }
};

