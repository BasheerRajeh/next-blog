import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPostById } from '@/app/actions'
import BackButton from '@/components/back-button'
import MDX from '@/components/mdx'
import UserAvatar from '@/components/post/user-avatar'
import { site } from '@/config/site'
import db from '@/lib/db'
import { formatPostDate } from '@/lib/format-post-date'
import { getCurrentUser } from '@/lib/get-current-user'
import { getMdxSource } from '@/lib/get-mdx-source'

import LikeButton from './like-button'

type PostPageProps = {
    params: {
        id: string
    }
}

export const generateMetadata = async (
    props: PostPageProps,
): Promise<Metadata> => {
    const { params } = props
    const post = await db.post.findUnique({
        where: {
            id: params.id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            createAt: true,
            updatedAt: true,
            authorId: true,
            author: {
                select: {
                    name: true,
                },
            },
        },
    })

    if (!post) return {}

    const ISOPublishedTime = new Date(post.createAt).toISOString()
    const ISOModifiedTime = new Date(post.updatedAt).toISOString()

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            url: `${site.url}/posts/${post.id}`,
            type: 'article',
            title: post.title,
            description: post.description || undefined,
            publishedTime: ISOPublishedTime,
            modifiedTime: ISOModifiedTime,
            authors: `${site.url}/users/${post.authorId}`,
            images: [
                {
                    url: `${site.url}/api/og?title=${post.title}&author=${post.author.name}`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                    type: 'image/png',
                },
            ],
        },
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
