import { auth } from "@clerk/nextjs/server";
import { db } from '@/db';
import { FormResponses } from "../schema";
import { eq } from "drizzle-orm";

export const saveFormResponse = async (formId: string, response: any) => {
    try {
        const { userId } = await auth();
        await db.insert(FormResponses).values({
            formId,
            responseData: JSON.stringify(response),
            submittedBy: userId || 'anonymous',
        });
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
