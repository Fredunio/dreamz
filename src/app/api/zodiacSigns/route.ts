import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/clients/prisma'

export async function GET(request: NextRequest) {
    try {
        const zodiacs = await prisma.zodiacSign.findMany()

        return NextResponse.json(
            {
                zodiacSigns: zodiacs,
                message: 'Zodiac signs fetched successfully',
            },
            {
                status: 200,
            }
        )
    } catch (e) {
        return new Response('Fetching zodiac signs  failed', {
            status: 404,
        })
    }
}
