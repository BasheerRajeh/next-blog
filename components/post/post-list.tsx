import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

import PostCard from './post-card'

export const PostList = async () => {
    const user = await getCurrentUser()
    const posts = await db.post.findMany({
        where: {
            published: true,
            visibility: 'PUBLIC',
        },
        select: {
            id: true,
            title: true,
            description: true,
            createAt: true,
            published: true,
            author: {
                select: {
                    name: true,
                    image: true,
                    id: true,
                },
            },
            likes: {
                select: {
                    id: true,
                },
            },
        },
        orderBy: {
            createAt: 'desc',
        },
    })

    if (posts.length === 0) {
        return <div className='text-center'>No posts yet.</div>
    }

    return (
        <div>
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    user={user}
                />
            ))}
        </div>
    )
}
