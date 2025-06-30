import LoginForm from '@/app/signupform'; 
import SignupForm from '@/app/loginform'; 

export default async function  MyMoviesPage() {
    return (
        <>
            <div>
                <LoginForm />
            </div>
            <div className='mt-8'>
                <SignupForm />
            </div>
        </>
    );
}
