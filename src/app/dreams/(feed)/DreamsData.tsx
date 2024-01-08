'use client'

import React, { Suspense, useCallback, useEffect, useRef } from 'react'
import { CircularProgress, Grid, Skeleton } from '@mui/joy'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { getDreams } from '../../lib/fetchers/dreams/getDreams'
import DreamCard from '../../components/cards/DreamCard'

export default function DreamData() {
    const searchParams = useSearchParams()!

    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const emotions = searchParams.getAll('emotion')
    const tags = searchParams.getAll('tag')
    const sortBy = searchParams.get('sortBy')
    const sortByDir = searchParams.get('sortByDir')

    const limit = searchParams.get('limit') || '6'

    const {
        isFetchingNextPage,
        data: dreamsData,
        fetchStatus,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
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
        initialPageParam: 1,

        queryFn: ({ pageParam, queryKey }) => {
            console.log('pageParam, queryKey: ', pageParam, queryKey)
            return getDreams({ queryKey, pageParam })
        },
        getNextPageParam: (lastPage, _pages) => {
            console.log('lastPage.nextPage: ', lastPage.nextPage)
            return lastPage.nextPage ?? undefined
        },
    })

    const lastElementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const lastElementRefCurrent = lastElementRef.current
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        }

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (entry.isIntersecting && hasNextPage) {
                fetchNextPage()
                console.log('fetchNextPage')
            }
        }, options)

        if (lastElementRefCurrent) {
            observer.observe(lastElementRefCurrent)
        }

        return () => {
            if (lastElementRefCurrent) {
                observer.unobserve(lastElementRefCurrent)
            }
        }
    }, [fetchNextPage, hasNextPage])

    console.log('dreamsData: ', dreamsData)

    return (
        <Suspense fallback={<Skeleton loading={isLoading} />}>
            <Grid
                container
                spacing={2}
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    mt: 2,
                }}
            >
                {dreamsData?.pages.map((item, index) => {
                    return (
                        <React.Fragment key={item.nextPage}>
                            {item.dreams.map((dream, dreamIndex) => (
                                <Grid
                                    justifyContent="space-between"
                                    alignItems="stretch"
                                    xs={12}
                                    md={6}
                                    xl={4}
                                    key={dream.id}
                                >
                                    <DreamCard
                                        dream={dream}
                                        key={dream.id}
                                        ref={
                                            dreamIndex ===
                                            item.dreams.length - 1
                                                ? lastElementRef
                                                : null
                                        }
                                    />
                                </Grid>
                            ))}
                        </React.Fragment>
                    )
                })}
            </Grid>
            {isFetchingNextPage && (
                <CircularProgress color="primary" size="md" variant="soft" />
            )}
        </Suspense>
    )
}
