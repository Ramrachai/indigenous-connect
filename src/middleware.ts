// src/middleware.ts
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if(token && token.status ==='pending') {
        if(req.nextUrl.pathname !== "/pending") {
            return NextResponse.redirect(new URL('/pending', req.url))
        }
    } 
    
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/admin/login')
    const isBlogPage = req.nextUrl.pathname.startsWith('/blog')

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url))
        }
        return null
    }

    if (!isAuth && (req.nextUrl.pathname.startsWith('/admin') || isBlogPage)) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
            from += req.nextUrl.search;
        }

        return NextResponse.redirect(
            new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        );
    }

}

export const config = {
    matcher: ['/admin/:path*', '/blog/:path*']
}