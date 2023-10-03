import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { authOptions } from './auth'

export const getCurrentUser = async (): Promise<User> => {
    const session = await getServerSession(authOptions)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return session?.user
}
