'use client'

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote'

type MDXProps = {
    source: MDXRemoteProps
}

const MDX: React.FC<MDXProps> = ({ source }) => {
    return (
        <article className='prose prose-invert max-w-none px-2 py-6'>
            <MDXRemote {...source} />
        </article>
    )
}

export default MDX
