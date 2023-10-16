import { Skeleton } from '@/components/ui/skeleton'

const PostPlaceholder = () => {
    return (
        <div className='flex items-start justify-between border-b px-1 py-4'>
            <div className='flex w-full flex-col gap-4'>
                <div className='flex items-center gap-1'>
                    <Skeleton className='h-6 w-6 rounded-full' />
                    <Skeleton className='h-6 w-20' />
                </div>
                <div className='block space-y-2'>
                    <Skeleton className='h-7 max-w-xs' />
                    <Skeleton className='h-16 max-w-lg' />
                </div>
                <div className='mt-4 flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                        <Skeleton className='h-5 w-5' />
                        <Skeleton className='h-4 w-4' />
                    </div>
                    <Skeleton className='h-4 w-10' />
                </div>
            </div>
        </div>
    )
}

export default PostPlaceholder
