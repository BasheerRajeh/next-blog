'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import googleSrc from '@/public/images/google.png'

const LoginButton = () => {
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const pathname = searchParams.get('redirect') || '/'

    return (
        <Button
            className='mt-4 flex items-center gap-2'
            variant='outline'
            onClick={() => {
                setLoading(true)
                void signIn('google', {
                    redirect: false,
                    callbackUrl: pathname,
                })
            }}
            disabled={loading}
        >
            {loading ? (
                <Loader2
                    size={16}
                    className='animate-spin'
                />
            ) : (
                <Image
                    src={googleSrc}
                    alt=''
                    width={16}
                    height={16}
                    draggable={false}
                />
            )}
            Continue with Google
        </Button>
    )
}

export default LoginButton
