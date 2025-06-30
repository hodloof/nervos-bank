import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/explorer/, '');
  const searchParams = url.search;

  const targetUrl = `https://mainnet-api.explorer.nervos.org/api${path}${searchParams}`;
  console.log(`Proxying request to: ${targetUrl}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API proxy error: Upstream API returned status ${response.status}: ${errorText}`);
      return new NextResponse(errorText, { status: response.status, statusText: response.statusText });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy fetch error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 });
  }
}