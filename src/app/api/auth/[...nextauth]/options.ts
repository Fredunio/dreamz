import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { verifyPassword } from '../../../lib/passwordFunctions'
import { prisma } from '../../../lib/clients/prisma'
import { JWT } from 'next-auth/jwt'

export const options: NextAuthOptions = {
    pages: {
        signIn: '/auth/signIn',
        // signOut: '/auth/signOut',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // newUser: '/auth/newuser', // If set, new users will be directed here on first sign in
    },

    adapter: PrismaAdapter(prisma),
    callbacks: {
        // token.sub is the id of the user
        async jwt({ account, token, user, profile, session, trigger }) {
            return {
                ...token,
                userId: token.sub,
            }
        },

        // async session(params) {
        //     console.log('params', params)
        //     return {
        //         expires: params.session.expires,
        //         user: {
        //             ...params.session.user,
        //             // id: params.token.userId,
        //             // testAccount: params.token.account || 'testFailed',
        //         },
        //     }
        // },
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null

                const { email, password } = credentials

                // TODO: fetch user from database and verify credentials
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                })

                if (!user || !user.password_hash) return null

                const isVeryfied = verifyPassword(password, user.password_hash)

                if (!isVeryfied) return null

                return user
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECET,
    debug: process.env.NODE_ENV === 'development',
}
