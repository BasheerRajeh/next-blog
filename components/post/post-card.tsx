import { Like, Post, User } from '@prisma/client'
import { Heart } from 'lucide-react'
import Link from 'next/link'

import { formatPostDate } from '@/lib/format-post-date'

import UserAvatar from './user-avatar'

type PostCardProps = {
    post: Pick<
        Post,
        'id' | 'title' | 'description' | 'published' | 'createAt'
    > & { likes: Array<Pick<Like, 'id'>> } & {
        author: Pick<User, 'id' | 'image' | 'name'>
    }
    user?: User | null
    showAuthor?: boolean
}

const PostCard: React.FC<PostCardProps> = ({ post, showAuthor = true }) => {
    const { id, title, description, published, likes, createAt, author } = post
    return (
        <article className='flex items-start justify-between border-b px-1 py-4'>
            <div className='flex w-full flex-col gap-4'>
                <div className='flex items-center gap-1'>
                    {showAuthor && (
                        <Link
                            href={`/users/${author.id}`}
                            className='flex items-center gap-2 text-sm'
                        >
                            <UserAvatar
                                width={24}
                                height={24}
                                userId={author.id}
                                src={author.image}
                                alt={author.name}
                            />
                            <span>{author.name}</span>
                        </Link>
                    )}
                </div>
                <Link
                    href={`/${published ? 'posts' : 'editor'}/${id}`}
                    className='block space-y-2'
                >
                    <h2 className='text-lg font-semibold'>{title}</h2>
                    <p className='line-clamp-3 text-muted-foreground'>
                        {description}
                    </p>
                </Link>
                <div className='mt-4 flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                        <Heart size={20} />
                        {likes.length}
                    </div>
                    <span className='text-xs'>{formatPostDate(createAt)}</span>
                </div>
            </div>
        </article>
    )
}

export default PostCard
