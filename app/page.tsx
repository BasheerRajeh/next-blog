import React from 'react'

import { PostList } from '@/components/post'
import PostPlaceholder from '@/components/post/post-placeholder'
import { getCurrentUser } from '@/lib/get-current-user'

import { getAllPosts } from './actions/post'

/**
 * Home Page
 */
export default async function Home() {
    const user = await getCurrentUser()
    const posts = await getAllPosts('PUBLIC')

    return (
        <React.Suspense
            fallback={[...Array.from({ length: 3 }).keys()].map((i) => (
                <PostPlaceholder key={i} />
            ))}
        >
            <PostList
                posts={posts}
                user={user}
            />
        </React.Suspense>
    )
}
