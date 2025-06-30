'use server'

import { neon } from '@neondatabase/serverless'
import * as bcrypt from 'bcrypt';
 
export async function auth_login(form: FormData) {
    const sql = neon(`${process.env.DATABASE_URL}`)
    
    const username = form.get('username')
    const passwordRaw = form.get('password')
    const password = typeof passwordRaw === 'string' ? passwordRaw : '';

    const storedPassword = await sql`SELECT hashed_password FROM users WHERE username = ${username}`;
    if (!storedPassword.length) {
        return false;
    }

    return await bcrypt.compare(password, (storedPassword[0]?.hashed_password as string))
}

export async function auth_register(form: FormData) {
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