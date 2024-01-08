import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/clients/prisma'
import { getToken } from 'next-auth/jwt'

export async function GET(req: NextRequest) {
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECET,
    })

    if (!token || !token.sub) {
        return new Response('Not signed in!', {
            status: 401,
        })
    }

    try {
        let result = []
        const url = new URL(req.url)
        const id = url.searchParams.get('id')

        // Check If the user is requesting their own user info
        // TODO: edit this when admin roles are added
        if (id) {
            if (id !== token.sub) {
                // user is requesting not their own data
                throw new Error('Unauthorized')
            }

            const userData = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            })

            if (!userData) {
                throw new Error('User not found')
            }
            result.push(userData)
        }

        return NextResponse.json(
            {
                data: result,
                message: 'Success',
            },
            {
                status: 200,
            }
        )
    } catch (e) {
        return new Response('Error fetching profile', {
            status: 404,
        })
    }
}
