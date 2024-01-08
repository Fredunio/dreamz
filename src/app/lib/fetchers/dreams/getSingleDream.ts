import axios from 'axios'
import type { Emotion } from '@prisma/client'
import { TDreamWithImageUrl } from '../../../types/types'

export async function getSingleDream({ id }: { id: string }) {
    const response = await axios.get<{
        dreams: TDreamWithImageUrl[]
        message: string
    }>('/api/dreams?id=' + id)

    return response.data
}
