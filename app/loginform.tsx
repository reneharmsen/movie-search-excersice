'use client'

import { auth_login } from '@/app/actions/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default  function SignupForm() {
 const [loginError, setLoginError] = useState(false)
 const router = useRouter();

 const handleLogin = async(form:FormData) => {
    var hasLoginError = await auth_login(form);

    setLoginError(hasLoginError);   

    if(!hasLoginError) {
        router.push('/mymovies');
    }
 }

 return (
        <>
            <form
                action={handleLogin}
                style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '2rem',
                    borderRadius: '8px',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    minWidth: '300px'
                }}
            >
                <h1>Login</h1>
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
                    Login
                </button>
                {loginError && <span>User not found.</span>}
            </form>
        </>
    );
}