'use client'

import { auth_register } from '@/app/actions/auth'

export default function LoginForm() {
    
    const register = async(form:FormData) => {
        auth_register(form);
    }

    return (
        <>
             <form
                action={register}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '2rem',
                    borderRadius: '8px',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    minWidth: '300px',
                    marginTop: '2rem'
                }}
            >
                <h1>Register</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    style={{
                        padding: '0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '1rem'
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    style={{
                        padding: '0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '1rem'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '0.75rem',
                        borderRadius: '4px',
                        border: 'none',
                        background: '#0070f3',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    Register
                </button>
            </form>
        </>
    );
}