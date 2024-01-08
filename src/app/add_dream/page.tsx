import FormLayout from '../components/layout/forms/FormLayout'

import * as React from 'react'

import AddDreamForm from './AddDreamForm'
import getQueryClient from '../lib/clients/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getDreamCategories } from '../lib/fetchers/dreams/getDreamCategories'
import { getDreamTags } from '../lib/fetchers/dreams/getDreamTags'
import { getEmotions } from '../lib/fetchers/getEmotions'

export default async function AddDreamPage() {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['dream_categories'],
        queryFn: getDreamCategories,
    })

    await queryClient.prefetchQuery({
        queryKey: ['emotions'],
        queryFn: getEmotions,
    })

    await queryClient.prefetchQuery({
        queryKey: ['dream_tags'],
        queryFn: getDreamTags,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FormLayout title="Add Dream ✨">
                <AddDreamForm />
            </FormLayout>
        </HydrationBoundary>
    )
}
