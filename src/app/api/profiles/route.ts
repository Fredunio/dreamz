import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/clients/prisma'
import { getToken } from 'next-auth/jwt'
import { TProfileUpdate } from '../../types/types'

export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
        return new Response('Missing id!', {
            status: 400,
        })
    }

    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECET,
    })

    if (!token || !token.sub) {
        return new Response('Not signed in!', {
            status: 401,
        })
    }

    if (token.sub !== id) {
        return new Response('Not authorized!', {
            status: 403,
        })
    }

    const body = await req.json()
    console.log('profile update body: ', body)
    let prepareData: any = {}
    // let prepareData: TProfileUpdate & {
    //     zodiacSign?: {
    //         connect: {
    //             name: string
    //         }
    //     }
    // } = {}

    for (const key in body) {
        // Connect zodiac sign
        if (key === 'zodiac') {
            prepareData.zodiacSign = {
                connect: {
                    name: body[key],
                },
            }
            continue
        }
        // Convert birthday to Date - it is a string in the body
        // if (key === 'birthday' && body[key]) {
        //     prepareData[key] = new Date(body[key])
        //     continue
        // }
        prepareData[key] = body[key]
    }

    console.log('profile update prepareData: ', prepareData)

    try {
        await prisma.user.update({
            where: {
                id: id,
            },
            data: prepareData,
        })

        return NextResponse.json(
            {
                message: 'Profile updated successfully',
            },
            {
                status: 200,
            }
        )
    } catch (e) {
        console.log('profile update error: ', e)
        return NextResponse.json(
            { message: 'Error updating profile' },
            {
                status: 404,
            }
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        let result
        const url = new URL(req.url)
        const id = url.searchParams.get('id')

        if (id) {
            result = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            })
            // TODO: exclude data that is not public
        }

        return NextResponse.json(
            {
                // data: result,
                data: [],
                message: 'Emotions fetched successfully',
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
