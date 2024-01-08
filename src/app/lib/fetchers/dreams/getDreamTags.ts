import axios from 'axios'
import type { DreamTag } from '@prisma/client'

export async function getDreamTags() {
    const response = await axios
        .get<{
            tags: DreamTag[]
            message: string
        }>('/api/dreams/tags')
        .catch((err) => {
            console.log(err)
            throw new Error(err)
        })
    return response.data
}
