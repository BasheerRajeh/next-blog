import { redirect } from 'next/navigation'

import { getPersonalPosts } from '@/app/actions'
import PageHeader from '@/components/page-header'
import { getCurrentUser } from '@/lib/get-current-user'

import Posts from './posts'

const PostsPage = async () => {
    const user = await getCurrentUser()

    if (!user) redirect('/login?redirect=/me/posts')

    const posts = await getPersonalPosts()

    if (!posts || posts.length === 0)
        return <div className='text-center'>No posts yet.</div>

    return (
        <>
            <PageHeader
                title='Your Posts'
                className='mb-8'
            />
            <Posts
                posts={posts}
                user={user}
            />
        </>
    )
}

export default PostsPage
