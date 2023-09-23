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
    url: 'http://127.0.0.1:3000',
    title: 'Next Project Template',
    name: 'TNext',
    keywords: ['template', 'next-template', 'full-stack next'],
    titleTemplate: '',
    description: '',
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
