import PageHeader from '@/components/page-header'
import PostPlaceholder from '@/components/post/post-placeholder'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
    return (
        <>
            <PageHeader
                title='Your Posts'
                className='mb-8'
            />
            <div>
                <Skeleton className='h-8 w-[200px]' />
            </div>
            <div className='space-y-6'>
                <PostPlaceholder showAuthor={false} />
                <PostPlaceholder showAuthor={false} />
                <PostPlaceholder showAuthor={false} />
            </div>
        </>
    )
}

export default Loading
