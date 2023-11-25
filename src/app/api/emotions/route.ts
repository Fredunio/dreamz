import { NextResponse } from 'next/server'
import { prisma } from '../../lib/clients/prisma'

export async function GET(request: Request) {
    try {
        const emotions = await prisma.emotion.findMany()

        // Convert bigints to strings - otherwise they can't be serialized
        const parsedEmotions = emotions.map((emotion) => {
            return {
                ...emotion,
                id: emotion.id.toString(),
            }
        })
        return NextResponse.json(
            {
                emotions: parsedEmotions,
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
