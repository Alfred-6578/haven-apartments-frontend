import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Auth check is DISABLED for the demo — anyone can visit /admin/*.
// The login page at /admin/login still exists and is reachable, but
// it doesn't gate anything. To re-enable, uncomment the block below.

// const AUTH_COOKIE = 'havenhomes_admin'

export function proxy(_request: NextRequest) {
    // const { pathname } = _request.nextUrl
    // const isAuthed = _request.cookies.get(AUTH_COOKIE)?.value === 'true'
    // const isLoginPage = pathname === '/admin/login'
    //
    // if (isLoginPage && isAuthed) {
    //     return NextResponse.redirect(new URL('/admin', _request.url))
    // }
    //
    // if (!isLoginPage && pathname.startsWith('/admin') && !isAuthed) {
    //     return NextResponse.redirect(new URL('/admin/login', _request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
