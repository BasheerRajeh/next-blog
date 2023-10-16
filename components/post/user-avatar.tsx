import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

type UserAvatarProps = {
    userId: string
    src: string | null
    alt: string | null
} & Omit<ImageProps, 'src' | 'alt'>

const UserAvatar: React.FC<UserAvatarProps> = ({
    userId,
    src,
    alt,
    className,
    ...rest
}) => {
    return (
        <Image
            src={src ?? `https://robohash.org/${userId}`}
            alt={alt ?? `${userId}'s avatar`}
            className={cn('rounded-full', className)}
            quality={100}
            {...rest}
        />
    )
}

export default UserAvatar
