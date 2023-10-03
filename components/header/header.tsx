import { PenSquare } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/get-current-user'
import { cn } from '@/lib/utils'

import { Logo } from './logo'
import UserControl from './user-control'

export const Header: React.FC<React.HTMLProps<HTMLDivElement>> = async ({
    className,
    ...props
}) => {
    const user = await getCurrentUser()

    return (
        <header
            className={cn(
                'h-[60px] bg-black/50 shadow-sm saturate-100 backdrop-blur-[10px]',
                className,
            )}
            {...props}
        >
            <div className='mx-auto flex h-full max-w-4xl items-center justify-between px-8'>
                <Link
                    href='/'
                    className='flex items-center gap-3'
                >
                    <Logo
                        width={32}
                        height={32}
                    />
                    <span className='text-xl font-bold'>Blog</span>
                </Link>
                <div className='flex items-center gap-4'>
                    {user && (
                        <Button variant='outline'>
                            <PenSquare
                                size={16}
                                className='mr-2'
                            />
                            Post
                        </Button>
                    )}
                    <UserControl user={user} />
                </div>
            </div>
        </header>
    )
}
