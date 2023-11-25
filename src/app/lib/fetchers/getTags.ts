import axios from 'axios'
import type { Tag } from '@prisma/client'

export async function getTags() {
    const response = await axios.get<{
        tags: Tag[]
        message: string
    }>('/api/tags')
    return response.data
}
