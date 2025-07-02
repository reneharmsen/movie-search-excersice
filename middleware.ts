import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    // const isProtectedPath = request.nextUrl.pathname.startsWith("/mymovies") ;
    // const isAuthorized = request.cookies.has("auth");

    // if (isProtectedPath && !isAuthorized) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }
} 