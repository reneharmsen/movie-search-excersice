import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers';
import { jwtVerify  } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const AUTH_COOKIE_NAME = 'auth-token'

export async function middleware(request: NextRequest) {
    const isProtectedPath = request.nextUrl.pathname.startsWith("/mymovies")
    if (!isProtectedPath) return;

    try { 
        const token =  (await cookies()).get(AUTH_COOKIE_NAME)?.value  
        await jwtVerify(token!, JWT_SECRET)

        return NextResponse.next()
    }
    catch(err) {
        console.error("JWT verification failed:", err);
    }

    return NextResponse.redirect(new URL("/login", request.url))
} 