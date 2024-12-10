import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { accessTokenCookieName } from '~/constants';

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
    const auth = await request.cookies.get(accessTokenCookieName);
    const nextUrl = await request?.nextUrl;

    if (
        !auth &&
        nextUrl.pathname !== '/create-first-account' &&
        nextUrl.pathname !== '/login'
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '//:path*', '/admin/:path*'],
};
