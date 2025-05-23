import { NextRequest, NextResponse } from 'next/server';
import { saveFormResponse } from '@/db/actions/formResponse.action';

export async function POST(req: NextRequest) {
  try {
    const { formId, userInput } = await req.json();
    const result = await saveFormResponse(formId, userInput);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
