import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
    // console.log(request.nextUrl.pathname);

    // return NextResponse.next();

    // get current pathname
    const url = request.nextUrl;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', url.pathname);

    if (url.pathname.startsWith('/dashboard')) {
        const targetUrl = new URL('/auth/login', request.url);

        return NextResponse.redirect(targetUrl);
    }

    // redirect to the new url
    if (url.pathname === '/store/legacy') {
        const targetUrl = new URL('/store/modern', request.url);

        return NextResponse.rewrite(targetUrl, {
            request: {
                headers: requestHeaders,
            },
        });
    }

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('x-proxy-handled', 'true');

    return response;
}

// proxy wasn't working on these url
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
