import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPostById } from '@/app/actions'
import BackButton from '@/components/back-button'
import MDX from '@/components/mdx'
import UserAvatar from '@/components/post/user-avatar'
import { formatPostDate } from '@/lib/format-post-date'
import { getCurrentUser } from '@/lib/get-current-user'
import { getMdxSource } from '@/lib/get-mdx-source'

import LikeButton from './like-button'

type PostPageProps = {
    params: {
        id: string
    }
}

const PostPage: React.FC<PostPageProps> = async ({ params: { id } }) => {
    const user = await getCurrentUser()

    const post = await getPostById(id)

    if (!post) notFound()

    const { title, description, content, likes, author, createAt } = post
    const source = await getMdxSource(content)

    return (
        <>
            <div className='flex items-center justify-between'>
                <BackButton />
            </div>
            <div className='my-8'>
                <h1 className='text-2xl font-bold sm:text-3xl'>{title}</h1>
                <p className='mt-4 text-muted-foreground'>{description}</p>
            </div>
            <Link
                href={`/users/${author.id}`}
                className='flex w-fit items-center gap-3'
            >
                <UserAvatar
                    width={40}
                    height={40}
                    src={author.image}
                    alt={author.name}
                    userId={author.id}
                />
                <div className='text-sm'>
                    <div>{author.name}</div>
                    <div className='text-xs text-muted-foreground'>
                        {formatPostDate(createAt)}
                    </div>
                </div>
            </Link>
            <MDX source={source} />
            <LikeButton
                likes={likes}
                postId={id}
                user={user}
            />
        </>
    )
}

export default PostPage
