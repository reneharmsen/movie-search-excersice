import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(request: NextRequest) {
    const { userId, movieId } = await request.json()
    if(userId == null || movieId == null) {
        return NextResponse.json({ message: `Bad request. Expected userId & movieId.` }, { status: 400 })
    }

    try {
        await sql`INSERT INTO "User_Movie" VALUES (${userId}, ${movieId})`
    }
    catch(err) {
        return NextResponse.json({ message: `Error: ${err}` }, { status: 500 })
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 })
}

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    let movieIds:number[] = [];

    try {
        const result = await sql`SELECT "movieId" FROM "User_Movie" WHERE "userId" = ${params.get('userId')}`  
        movieIds = result.map(row => row.movieId)
    }
    catch(err) {
        return NextResponse.json({ message: `Error: ${err}` }, { status: 500 })     
    }

    return NextResponse.json({ result: movieIds }, { status: 200 })        
}