import axios from 'axios'
import type { Emotion } from '@prisma/client'
import { TDreamWithImageUrl } from '../../../types/types'

export async function getUserDreams({ id }: { id: string }) {
    const response = await axios.get<{
        dreams: TDreamWithImageUrl[]
        message: string
    }>('/api/dreams?userId=' + id)

    return response.data
}
