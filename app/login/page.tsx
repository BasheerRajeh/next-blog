import Image from 'next/image'

import { Button } from '@/components/ui/button'
import googleSrc from '@/public/images/google.png'

const LoginPage = () => {
    return (
        <div className='flex h-full w-full flex-col items-center justify-center gap-3 p-4'>
            <div>
                <h1 className='text-2xl font-semibold'>Login</h1>
            </div>
            <p className='text-muted-foreground'>to continue to Blog</p>
            <Button
                className='mt-4 flex items-center gap-2'
                variant='outline'
            >
                <Image
                    src={googleSrc}
                    alt=''
                    width={16}
                    height={16}
                    draggable={false}
                />
                Continue with Google
            </Button>
        </div>
    )
}

export default LoginPage
