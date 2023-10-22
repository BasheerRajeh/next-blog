'use client'

import { User } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { PostList } from '@/components/post'
import { PostCardProps } from '@/components/post/post-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type PostsProps = {
    posts: Array<PostCardProps['post']>
    user: User
}

const Posts: React.FC<PostsProps> = ({ posts, user }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tap = searchParams.get('tap') || 'drafts'
    const [activeTab, setActiveTab] = useState(tap)

    const drafts = posts.filter((post) => !post.published)
    const published = posts.filter((post) => post.published)

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        router.push(`/me/posts?tap=${value}`)
    }

    return (
        <Tabs
            defaultValue='drafts'
            value={activeTab}
            onValueChange={handleTabChange}
        >
            <TabsList>
                <TabsTrigger value='drafts'>
                    Drafts {drafts.length > 0 && <>({drafts.length})</>}
                </TabsTrigger>
                <TabsTrigger value='published'>
                    Published{' '}
                    {published.length > 0 && <>({published.length})</>}
                </TabsTrigger>
            </TabsList>
            <TabsContent value='drafts'>
                {drafts.length === 0 && (
                    <div className='py-8 text-center'>
                        You don&apos;t have any drafts yet.
                    </div>
                )}
                <PostList
                    posts={drafts}
                    user={user}
                    showAuthor={false}
                />
            </TabsContent>
            <TabsContent value='published'>
                {published.length === 0 && (
                    <div className='py-8 text-center'>
                        You haven&apos;t published any posts yet.
                    </div>
                )}
                <PostList
                    posts={published}
                    user={user}
                    showAuthor={false}
                />
            </TabsContent>
        </Tabs>
    )
}

export default Posts
