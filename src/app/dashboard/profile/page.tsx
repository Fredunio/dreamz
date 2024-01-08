import * as React from 'react'
import { getUser } from '../../lib/fetchers/users/getUser'
import { HydrationBoundary, dehydrate, useQuery } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import getQueryClient from '../../lib/clients/getQueryClient'
import ProfileForm from './ProfileForm'
import { authOptions } from '../../api/auth/[...nextauth]/options'
import { getZodiacSigns } from '../../lib/fetchers/zodiacSigns/getZodiacSigns'
import ProfileData from './ProfileData'

export default async function DashboardProfile() {
    const session = await getServerSession(authOptions)
    const queryClient = getQueryClient()

    const userId = session?.user.id

    if (userId) {
        await queryClient.prefetchQuery({
            queryKey: ['profile'],
            queryFn: () => getUser(userId),
        })
    }

    await queryClient.prefetchQuery({
        queryKey: ['zodiacs'],
        queryFn: () => getZodiacSigns(),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProfileData id={userId} />
        </HydrationBoundary>
    )
}
