import { Dream } from '@prisma/client'
import axios from 'axios'

export async function getDreams({
    queryKey,
    pageParam,
}: {
    queryKey: [
        _key: string,
        {
            search: string | null
            category: string | null
            emotions: string[]
            tags: string[]
            sortBy: string | null
            sortByDir: string | null
            limit: string
        },
    ]
    pageParam: any
}) {
    const [
        _key,
        { search, category, emotions, sortBy, sortByDir, tags, limit },
    ] = queryKey

    console.log('queryKey: ', queryKey)
    console.log('pageParam: ', pageParam)

    const response = await axios
        .get<{
            dreams: Dream[]
            nextPage: number
            message: string
        }>('/api/dreams/get_dreams', {
            params: {
                search,
                category,
                tags,
                emotions,
                sortBy,
                sortByDir,
                limit,
                page: pageParam,
            },
        })
        .catch((err) => {
            console.log(err)
            throw new Error(err)
        })
    return response.data
}
