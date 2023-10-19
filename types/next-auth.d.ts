// eslint-disable-next-line unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Session {
        user: {
            id: string
            // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        } & DefaultSession['user']
    }
}

declare module 'objectid'
