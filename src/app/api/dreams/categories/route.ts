import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/clients/prisma'

export async function GET(request: Request) {
    try {
        const categories = await prisma.dreamCategory.findMany()

        // Convert bigints to strings - otherwise they can't be serialized
        // const parsedCategories = categories.map((category) => {
        //     return {
        //         ...category,
        //         id: category.id.toString(),
        //     }
        // })
        return NextResponse.json(
            {
                categories: categories,
                message: 'Categories fetched successfully',
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
