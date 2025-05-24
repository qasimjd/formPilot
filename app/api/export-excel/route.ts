import { NextRequest, NextResponse } from 'next/server';
import { getFormResponsesById } from '@/db/actions/formResponse.action';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const formId = searchParams.get('formId');
    if (!formId) {
      return NextResponse.json({ error: 'Missing formId' }, { status: 400 });
    }
    const responses = await getFormResponsesById(formId);
    return NextResponse.json({ responses });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
