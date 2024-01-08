import { NextResponse } from 'next/server'
import { prisma } from '../../lib/clients/prisma'

export async function GET(request: Request) {
    try {
        const emotions = await prisma.emotion.findMany()

        return NextResponse.json(
            {
                emotions: emotions,
                message: 'Emotions fetched successfully',
            },
            {
                status: 200,
            }
        )
    } catch (e) {
        return new Response('Something went wrong!', {
            status: 404,
        })
    }
}
