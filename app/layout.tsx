import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/public/styles/globals.css'
import Footer from '@/components/footer'
import { Header } from '@/components/header'
import Toaster from '@/components/toaster'
import { ScrollArea } from '@/components/ui/scroll-area'
import { site } from '@/config/site'
import { cn } from '@/lib/utils'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: site.title,
        template: `%s ${site.titleTemplate}`,
    },
    description: site.description,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: site.name,
        card: 'summary_large_image',
        site: 'BasheerRajeh',
        creator: 'BasheerRajeh',
    },
    keywords: site.keywords,
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: '#ffffff',
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: '#000000',
        },
    ],
    creator: 'BasheerRajeh',
    openGraph: {
        url: `${site.url}`,
        type: 'website',
        title: site.title,
        siteName: site.title,
        description: site.description,
        locale: 'en-US',
        images: [
            {
                url: '/images/cover.png',
                width: 1200,
                height: 630,
                alt: site.description,
                type: 'image/png',
            },
        ],
    },
    manifest: '/favicon/site.webmanifest',
    icons: {
        icon: '/favicon/favicon.svg',
        shortcut: '/favicon/favicon.svg',
        apple: [
            {
                url: '/favicon/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
        other: [...site.favicons],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang='en'
            className={cn(inter.variable, 'dark scroll-smooth')}
        >
            <body className='font-default'>
                <Header className='fixed inset-x-0 top-0 z-40' />
                <ScrollArea className='h-[calc(100vh-68px)]'>
                    <main className='mx-auto max-w-4xl px-8 pb-16 pt-24'>
                        {children}
                    </main>
                </ScrollArea>
                <Footer />
                <Toaster />
            </body>
        </html>
    )
}
