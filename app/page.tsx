import React from 'react'

import { PostList } from '@/components/post'
import PostPlaceholder from '@/components/post/post-placeholder'

/**
 * Home Page
 */
export default function Home() {
    return (
        <React.Suspense
            fallback={[...Array.from({ length: 5 }).keys()].map((i) => (
                <PostPlaceholder key={i} />
            ))}
        >
            <PostList />
        </React.Suspense>
    )
}
