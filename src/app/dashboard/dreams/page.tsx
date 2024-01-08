'use client'

import React from 'react'
import DashboardSectionHeader from '../DashboardSectionHeader'
import { useSession } from 'next-auth/react'
import { getUserDreams } from '../../lib/fetchers/dreams/getUserDreams'
import { useQuery } from '@tanstack/react-query'
import { Grid } from '@mui/joy'
import DashboardDreamCard from '../../components/cards/DashboardDreamCard'

export default function DashboardDreamsPage() {
    const session = useSession()
    const userId = session.data?.user.id

    const {
        data: dreamsData,
        isLoading,
        isError,
        error,
        isFetching,
    } = useQuery({
        queryKey: ['dreams'],
        enabled: userId !== undefined,
        queryFn: () => getUserDreams({ id: userId! }),
    })

    const onDreamEdit = (id: string) => {}
    const onDreamDelete = (id: string) => {}
    return (
        <div>
            <DashboardSectionHeader title="Dreams" />
            <Grid
                container
                spacing={2}
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    mt: 2,
                }}
            >
                {dreamsData?.dreams.map((dream) => (
                    <Grid
                        justifyContent="space-between"
                        alignItems="stretch"
                        xs={12}
                        md={6}
                        xl={4}
                        key={dream.id}
                    >
                        <DashboardDreamCard
                            onEdit={onDreamEdit}
                            onDelete={onDreamDelete}
                            dream={dream}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
