import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/get-current-user'

import LoginButton from './login-button'

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Login to One Blog',
}

const LoginPage = async () => {
    const user = await getCurrentUser()

    if (user) redirect('/')
    else
        return (
            <div className='flex h-full w-full flex-col items-center justify-center gap-3 p-4'>
                <div>
                    <h1 className='text-2xl font-semibold'>Login</h1>
                </div>
                <p className='text-muted-foreground'>to continue to Blog</p>
                <LoginButton />
            </div>
        )
}

export default LoginPage
