import { NextResponse } from 'next/server';

export async function GET() {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin`);
  return NextResponse.json({ ok: true });
}
