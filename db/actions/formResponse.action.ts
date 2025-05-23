import { auth } from "@clerk/nextjs/server";
import { db } from '@/db';
import { FormResponses } from "../schema";

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
