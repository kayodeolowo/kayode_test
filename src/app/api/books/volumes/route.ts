import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const GOOGLE_BASE = 'https://www.googleapis.com/books/v1';
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function GET(request: NextRequest) {
  const { ok, retryAfter } = rateLimit(getClientIp(request));
  if (!ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': retryAfter.toString() } }
    );
  }

  // Forward the client's query params to Google, adding the server-only key.
  const params = new URLSearchParams(request.nextUrl.searchParams);
  if (API_KEY) params.set('key', API_KEY);

  const upstream = await fetch(`${GOOGLE_BASE}/volumes?${params.toString()}`, {
    signal: request.signal,
  });

  const data = await upstream.json();
  return NextResponse.json(data, { status: upstream.status });
}
