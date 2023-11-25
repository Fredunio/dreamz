import { NextResponse } from 'next/server'
import { prisma } from '../../lib/clients/prisma'

export async function GET(request: Request) {
    try {
        const tags = await prisma.tag.findMany()

        return NextResponse.json(
            {
                tags: tags,
                message: 'Tags fetched successfully',
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
