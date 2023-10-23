import { File } from 'lucide-react'
import { notFound } from 'next/navigation'

import { PostList } from '@/components/post'
import UserAvatar from '@/components/post/user-avatar'
import { Separator } from '@/components/ui/separator'
import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

type UserPageProps = {
    params: {
        id: string
    }
}

const UserPage: React.FC<UserPageProps> = async ({ params: { id } }) => {
    const currentUser = await getCurrentUser()
    const user = await db.user.findUnique({
        where: {
            id,
        },
        select: {
            name: true,
            image: true,
            bio: true,
            posts: {
                where: {
                    published: true,
                    visibility: 'PUBLIC',
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    published: true,
                    visibility: true,
                    createAt: true,
                    likes: {
                        select: {
                            id: true,
                            postId: true,
                            userId: true,
                        },
                    },
                    author: {
                        select: {
                            name: true,
                            image: true,
                            id: true,
                        },
                    },
                },
                orderBy: {
                    createAt: 'desc',
                },
            },
        },
    })

    if (!user) {
        notFound()
    }

    const { name, image, bio, posts } = user

    return (
        <>
            <div className='flex items-center gap-4'>
                <div className='relative h-14 w-14 md:h-20 md:w-20'>
                    <UserAvatar
                        fill={true}
                        src={image}
                        alt={name}
                        userId={id}
                    />
                </div>
                <div className='text-xl font-semibold lg:text-3xl'>{name}</div>
            </div>
            {bio && <p className='mt-4 text-muted-foreground'>{bio}</p>}
            <Separator className='my-4' />
            {posts.length > 0 ? (
                <div className='mt-4'>
                    <PostList
                        posts={posts}
                        user={currentUser}
                        showAuthor={false}
                    />
                </div>
            ) : (
                <div className='my-24 flex flex-col items-center justify-center gap-3'>
                    <div className='flex h-24 w-24 items-center justify-center rounded-full bg-muted'>
                        <File size={56} />
                    </div>
                    <div className='text-2xl font-semibold'>No posts yet</div>
                </div>
            )}
        </>
    )
}

export default UserPage
