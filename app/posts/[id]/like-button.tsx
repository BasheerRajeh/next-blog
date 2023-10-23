'use client'

import { Like, User } from '@prisma/client'
import ObjectID from 'bson-objectid'
import { Heart } from 'lucide-react'
import { experimental_useOptimistic as useOptimistic } from 'react'
import toast from 'react-hot-toast'

import { likePost, unlikePost } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type LikeButtonProps = {
    likes: Like[]
    user: User | undefined
    postId: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ likes, user, postId }) => {
    const [optimisticLikes, updateOptimisticLike] = useOptimistic<
        Like[],
        'CREATE' | 'DELETE'
    >(likes, (state, action) => {
        if (action === 'DELETE') {
            return state.filter(
                (like) => !(like.userId === user?.id && like.postId === postId),
            )
        }
        return [
            ...state,
            {
                id: ObjectID().toHexString(),
                userId: user ? user.id : ObjectID().toHexString(),
                postId,
            },
        ]
    })

    const isUserLiked = optimisticLikes.some((like) => like.userId === user?.id)

    const handleLike = async () => {
        try {
            if (isUserLiked) {
                updateOptimisticLike('DELETE')
                await unlikePost(postId)
            } else {
                updateOptimisticLike('CREATE')
                await likePost(postId)
            }
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <Button
            variant='ghost'
            className={cn(
                'flex items-center gap-2',
                !user && 'cursor-not-allowed',
            )}
            disabled={!user}
            onClick={handleLike}
        >
            <Heart
                size={20}
                className={cn(
                    isUserLiked && 'fill-red-500 text-red-500 transition-all',
                )}
            />
            {optimisticLikes.length}
        </Button>
    )
}

export default LikeButton
