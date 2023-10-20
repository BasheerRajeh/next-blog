'use client'

import { User } from '@prisma/client'
import { MoreVertical, Pencil, Share2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { deletePost } from '@/app/actions/post'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { site } from '@/config/site'
import { copyUrl } from '@/lib/copy-url'

type ControlsProps = {
    id: string
    user: User | null | undefined
    authorId: string
    postTitle: string
}

const Controls: React.FC<ControlsProps> = ({
    id,
    user,
    authorId,
    postTitle,
}) => {
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        try {
            await deletePost(id)
            toast.success('Post deleted')
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        className='px-2'
                    >
                        <MoreVertical size={20} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                        onClick={() => copyUrl(`${site.url}/posts/${id}`)}
                    >
                        <Share2
                            size={16}
                            className='mr-2.5'
                        />
                        Share
                    </DropdownMenuItem>
                    {user && user.id === authorId && (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href={`/editor/${id}`}>
                                    <Pencil
                                        size={16}
                                        className='mr-2.5'
                                    />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpen(true)}>
                                <Trash2
                                    size={16}
                                    className='mr-2.5'
                                />
                                Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog
                open={open}
                onOpenChange={setOpen}
            >
                <AlertDialogContent>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        &quot;{postTitle}&quot; will be permanently deleted.
                        This action cannot be undone.
                    </AlertDialogDescription>
                    <div className='flex justify-between'>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className={buttonVariants({
                                variant: 'destructive',
                            })}
                        >
                            Delete
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default Controls
