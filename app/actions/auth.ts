import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcrypt';
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
 
export async function login(form: FormData) {
     'use server'
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const username = form.get('username');
    const passwordRaw = form.get('password');

    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(
        typeof passwordRaw === 'string' ? passwordRaw : '',
        salt
    );

    const user = await sql`SELECT * FROM users WHERE username = ${username} and hashed_password = ${password};`;

    if (!user.length) {
        throw new Error('User not found');
    }

    // User is authenticated
}

export async function register(form: FormData) {
   'use server'
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const username = form.get('username');
    const passwordRaw = form.get('password');

    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(
        typeof passwordRaw === 'string' ? passwordRaw : '',
        salt
    );

    await sql`INSERT INTO users (username, hashed_password, created_at) VALUES (${username}, ${password}, NOW()) ON CONFLICT (username) DO NOTHING;`;
}    