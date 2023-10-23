'use client'

import { User } from '@prisma/client'
import { LogOutIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type UserControlProps = {
    user: User | undefined
}

const UserControl: React.FC<UserControlProps> = ({ user }) => {
    if (!user)
        return (
            <Link
                href='/login'
                className={buttonVariants()}
            >
                Login
            </Link>
        )
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
                <Avatar>
                    <AvatarImage
                        src={user.image as string}
                        alt={user.name as string}
                    />
                    <AvatarFallback>
                        <User2Icon size={24} />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='max-w-[200px]'
            >
                <DropdownMenuItem
                    className='flex-col items-start'
                    asChild
                >
                    <Link
                        href={`/users/${user.id}`}
                        className='overflow-hidden'
                    >
                        <div className='truncate text-sm'>{user.name}</div>
                        <div className='truncate text-xs text-muted-foreground'>
                            {user.email}
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href='/me/posts'>Posts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/me/settings'>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOutIcon className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserControl
