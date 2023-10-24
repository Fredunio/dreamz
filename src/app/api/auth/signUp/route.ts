import { hashPassword } from '@/app/lib/passwordFunctions'
import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { user: null, message: 'Email and password are required' },
                {
                    status: 400,
                }
            )
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        // User could have used the same email to sign up with a different provider like Google
        // TODO: check if user is already signed up with a different provider
        if (user) {
            return NextResponse.json(
                {
                    user: null,
                    message: 'User with this email adress already exists',
                },
                {
                    status: 404,
                }
            )
        }

        const passwordHash = await hashPassword(password)

        const newUser = await prisma.user.create({
            data: {
                email,
                password_hash: passwordHash,
            },
        })

        const { password_hash, ...userWithoutPassword } = newUser

        return NextResponse.json(
            { user: userWithoutPassword, message: 'User created successfully' },
            {
                status: 200,
            }
        )
    } catch (e) {
        return new Response('Error', {
            status: 404,
        })
    }
}
