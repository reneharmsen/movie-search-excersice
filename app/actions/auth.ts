'use server'

import { neon } from '@neondatabase/serverless'
import * as bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? '';
const AUTH_COOKIE_NAME = 'auth-token'

export async function auth_loginUser(form: FormData) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    
    const username = form.get('username')
    const passwordRaw = form.get('password')
    const password = typeof passwordRaw === 'string' ? passwordRaw : '';

    const user = await sql`SELECT id, username, hashed_password FROM users WHERE username = ${username}`;
    if (!user.length) {
        return false;
    }

    if(await bcrypt.compare(password, (user[0]?.hashed_password as string))) {
        const token = jwt.sign({ 
            "sub": user[0]?.id,
            "username": user[0]?.username
        }, JWT_SECRET, { expiresIn: '7d' });

        (await cookies()).set(AUTH_COOKIE_NAME, token, {
            httpOnly: true, 
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

        return true;
    }

    return false;
}

export async function auth_registerUser(form: FormData) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const username = form.get('username');
    const passwordRaw = form.get('password');

    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(
        typeof passwordRaw === 'string' ? passwordRaw : '',
        salt
    );

    const inserted = await sql`INSERT INTO users (username, hashed_password, created_at) VALUES (${username}, ${password}, NOW()) ON CONFLICT (username) DO NOTHING;`;
    return inserted.length === 1;
}    

export async function auth_getUser() {
    const jwtTokenValue =  (await cookies()).get(AUTH_COOKIE_NAME)?.value  
    
    if (!jwtTokenValue) {
        return null;
    }

    try {
        const decoded = jwt.verify(jwtTokenValue, JWT_SECRET)  
        return decoded;
    }
    catch(err) {
        return null;
    }
}

