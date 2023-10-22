'use client'

import { User } from '@prisma/client'
import React, { experimental_useOptimistic as useOptimistic } from 'react'

import PostCard, { PostCardProps } from './post-card'

type PostListProps = {
    posts: Array<PostCardProps['post']> | undefined
    user: User
    showAuthor?: boolean
}

export const PostList: React.FC<PostListProps> = ({
    posts,
    user,
    showAuthor = true,
}) => {
    const [optimisticPosts, setOptimisticPosts] = useOptimistic(posts)

    if (!posts || !optimisticPosts || (posts && posts.length === 0)) {
        return <div className='text-center'>No posts yet.</div>
    }

    const handleDelete = (postId: string) => {
        setOptimisticPosts((prev) => {
            return prev?.filter((post) => post.id !== postId)
        })
    }

    return (
        <div>
            {optimisticPosts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    user={user}
                    showAuthor={showAuthor}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    )
}
