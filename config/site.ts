import { IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

type Site = {
    url: string
    title: string
    name: string
    keywords: string[]
    titleTemplate: string
    description: string
    favicons: IconDescriptor[]
}

export const site: Site = {
    url: 'https://one-blog-next.vercel.app/',
    title: 'Blogs',
    name: 'Rajeh',
    keywords: ['blog', 'one-blog', 'full-stack blog', 'nextjs blog'],
    titleTemplate: '- One Blog',
    description:
        'Welcome to our dynamic blogging platform, where you can sign in, share your thoughts, and engage with a vibrant community of bloggers. Effortlessly manage your account, craft compelling articles, and explore the world of online content creation. Join us to make your mark in the blogosphere.',
    favicons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon/favicon-16x16.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon/favicon-32x32.png',
        },
    ],
}
