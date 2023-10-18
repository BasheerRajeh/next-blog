'use server'

import { Visibility } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

const handleError = () => {
    throw new Error('Something went wrong. Please try again.')
}

const NOT_LOGGED_IN_ERROR = 'Not logged in error!'

export const createNewPost = async (title: string) => {
    const user = await getCurrentUser()

    if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

    try {
        const post = await db.post.create({
            data: {
                title,
                authorId: user.id,
            },
            select: {
                id: true,
            },
        })

        revalidatePath('/me/posts')

        return post.id
    } catch {
        handleError()

        return
    }
}

export const savePost = async (
    id: string,
    title: string,
    content: string | null,
    description: string | null,
    published: boolean,
) => {
    const user = await getCurrentUser()

    if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

    try {
        await db.post.update({
            where: {
                id,
                authorId: user.id,
            },
            data: {
                title,
                content,
                description,
                published,
                updatedAt: new Date(),
            },
        })

        revalidatePath(`/posts/${id}`)
    } catch {
        handleError()
    }
}

export const saveVisibility = async (id: string, visibility: Visibility) => {
    const user = await getCurrentUser()

    if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

    try {
        await db.post.update({
            where: {
                id,
                authorId: user.id,
            },
            data: {
                visibility,
            },
        })

        revalidatePath(`/posts/${id}`)
    } catch {
        handleError()
    }
}

export const getPostById = async (id: string, published = true) => {
    try {
        return await db.post.findUnique({
            where: {
                id,
                published,
            },
            select: {
                id: true,
                title: true,
                description: true,
                content: true,
                createAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                likes: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true,
                    },
                },
            },
        })
    } catch {
        handleError()
    }
}
