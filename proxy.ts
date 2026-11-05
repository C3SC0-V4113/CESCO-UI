import { NextResponse, type NextRequest } from 'next/server';

import registry from './registry.json';

const componentNames = new Set(registry.items.map((item) => item.name));

export function proxy(request: NextRequest) {
  const [, , name, ...rest] = request.nextUrl.pathname.split('/');
  if (
    request.nextUrl.pathname.startsWith('/components/') &&
    (rest.length > 0 || !componentNames.has(name ?? ''))
  ) {
    return NextResponse.rewrite(new URL('/component-not-found', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: '/components/:path*' };
