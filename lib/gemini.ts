"use server";

import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./constent";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function generateFormJSON(userDescription: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userDescription,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });
  return response.text;
}
