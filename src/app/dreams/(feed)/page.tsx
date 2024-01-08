import React from 'react'
import DreamsPageFilters from './DreamsPageFilters'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getDreamCategories } from '../../lib/fetchers/dreams/getDreamCategories'
import { getEmotions } from '../../lib/fetchers/getEmotions'
import { getDreamTags } from '../../lib/fetchers/dreams/getDreamTags'
import { getDreams } from '../../lib/fetchers/dreams/getDreams'
import DreamData from './DreamsData'
import getQueryClient from '../../lib/clients/getQueryClient'

export default async function DreamsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = searchParams['search']
    const category = searchParams['category']
    const emotions = searchParams['emotion']
    const tags = searchParams['tag']
    const sortBy = searchParams['sortBy']
    const sortByDir = searchParams['sortByDir']
    const limit = searchParams['limit'] || '6'

    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: getDreamCategories,
    })
    await queryClient.prefetchQuery({
        queryKey: ['emotions'],
        queryFn: getEmotions,
    })
    await queryClient.prefetchQuery({
        queryKey: ['tags'],
        queryFn: getDreamTags,
    })

    await queryClient.prefetchInfiniteQuery({
        initialPageParam: 1,
        queryKey: [
            'dreams',
            {
                search,
                category,
                emotions,
                tags,
                sortBy,
                sortByDir,
                limit,
            },
        ],
        getNextPageParam: (lastPage, _pages) => {
            console.log(
                'prefetch stage - lastPage.nextPage: ',
                lastPage.nextPage
            )
            return lastPage.nextPage ?? undefined
        },
        queryFn: ({ pageParam, queryKey }) =>
            getDreams({ queryKey, pageParam }),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DreamsPageFilters />
            <DreamData />
        </HydrationBoundary>
    )
}
