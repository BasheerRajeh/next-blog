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

export const likePost = async (id: string) => {
    const user = await getCurrentUser()

    if (!user) throw new Error('Please log in to like this post')

    try {
        await db.like.create({
            data: {
                postId: id,
                userId: user.id,
            },
        })

        revalidatePath(`/posts/${id}`)
    } catch {
        revalidatePath(`/posts/${id}`)
        handleError()
    }
}

export const unlikePost = async (id: string) => {
    const user = await getCurrentUser()

    if (!user) throw new Error('Please log in to unlike this post.')

    try {
        const like = await db.like.findFirst({
            where: {
                postId: id,
                userId: user.id,
            },
            select: {
                id: true,
            },
        })

        if (!like) throw new Error('You have not liked this post.')

        await db.like.delete({
            where: {
                id: like.id,
            },
        })

        revalidatePath(`/posts/${id}`)
    } catch {
        handleError()
    }
}

export const deletePost = async (id: string) => {
    const user = await getCurrentUser()

    if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

    try {
        await db.post.delete({
            where: {
                id,
                authorId: user.id,
            },
        })

        revalidatePath('/me/posts')
    } catch {
        handleError()
    }
}

export const getAllPosts = async (visibility: Visibility) => {
    try {
        return await db.post.findMany({
            where: {
                published: true,
                visibility,
            },
            select: {
                id: true,
                title: true,
                description: true,
                createAt: true,
                published: true,
                author: {
                    select: {
                        name: true,
                        image: true,
                        id: true,
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
            orderBy: {
                createAt: 'desc',
            },
        })
    } catch {
        handleError()
    }
}

export const getPersonalPosts = async () => {
    const user = await getCurrentUser()

    if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

    try {
        return await db.post.findMany({
            where: {
                authorId: user.id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                published: true,
                createAt: true,
                likes: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true,
                    },
                },
                author: {
                    select: {
                        name: true,
                        image: true,
                        id: true,
                    },
                },
            },
            orderBy: {
                createAt: 'desc',
            },
        })
    } catch {
        handleError()
        return []
    }
}
