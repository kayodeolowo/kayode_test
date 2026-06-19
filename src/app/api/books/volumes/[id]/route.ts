import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const GOOGLE_BASE = 'https://www.googleapis.com/books/v1';
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { ok, retryAfter } = rateLimit(getClientIp(request));
  if (!ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': retryAfter.toString() } }
    );
  }

  const { id } = await params;

  const search = new URLSearchParams(request.nextUrl.searchParams);
  if (API_KEY) search.set('key', API_KEY);
  const qs = search.toString();

  const upstream = await fetch(
    `${GOOGLE_BASE}/volumes/${encodeURIComponent(id)}${qs ? `?${qs}` : ''}`,
    { signal: request.signal }
  );

  const data = await upstream.json();
  return NextResponse.json(data, { status: upstream.status });
}
