'use client'

import React, { Suspense } from 'react'
import { getZodiacSigns } from '../../lib/fetchers/zodiacSigns/getZodiacSigns'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../lib/fetchers/users/getUser'
import ProfileForm from './ProfileForm'
import { Skeleton } from '@mui/joy'
// import { useSession } from 'next-auth/react'

function ProfileData({ id }: { id?: string | undefined }) {
    // const session = useSession()
    //  const id =  session.data?.user.id

    const {
        data: profileData,
        isLoading,
        isError,
        error,
        isFetching,
    } = useQuery({
        queryKey: ['profile'],
        enabled: id !== undefined,
        queryFn: () => {
            return getUser(id!)
        },
    })

    const { data: zodiacData } = useQuery({
        queryKey: ['zodiacs'],
        queryFn: getZodiacSigns,
    })
    return (
        <Suspense fallback={<Skeleton />}>
            {profileData && zodiacData && (
                <ProfileForm
                    user={profileData?.data[0]}
                    zodiacSigns={zodiacData?.zodiacSigns || []}
                />
            )}
        </Suspense>
    )
}

export default ProfileData
