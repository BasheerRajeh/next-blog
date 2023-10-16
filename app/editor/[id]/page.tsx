import { notFound, redirect } from 'next/navigation'

import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

import EditorForm from './form'

type EditorPageProps = {
    params: {
        id: string
    }
}

const EditorPage: React.FC<EditorPageProps> = async ({ params }) => {
    const { id } = params

    const user = await getCurrentUser()
    if (!user) redirect(`/loging?redirect=/editor/${id}`)

    const post = await db.post.findUnique({
        where: {
            id,
            authorId: user.id,
        },
    })

    if (!post) notFound()

    return <EditorForm post={post} />
}

export default EditorPage
