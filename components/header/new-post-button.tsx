'use client'

import { Loader2, PenSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

import { createNewPost } from '@/app/actions'
import { Button } from '@/components/ui/button'

const NewPostWrite = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const newPost = () => {
        startTransition(async () => {
            try {
                const postId = await createNewPost('Untitled post')
                router.refresh()
                router.push(`/editor/${postId}`)
            } catch (error) {
                toast.error((error as Error).message)
            }
        })
    }

    return (
        <Button
            variant='ghost'
            className='py-1.5'
            onClick={newPost}
            disabled={isPending}
        >
            {isPending ? (
                <Loader2
                    size={16}
                    className='mr-2 animate-spin'
                />
            ) : (
                <PenSquare
                    size={16}
                    className='mr-2'
                />
            )}
            Write Post
        </Button>
    )
}

export default NewPostWrite
