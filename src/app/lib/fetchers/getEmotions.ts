import axios from 'axios'
import type { Emotion } from '@prisma/client'

export async function getEmotions() {
    const response = await axios.get<{
        emotions: Emotion[]
        message: string
    }>('/api/emotions')

    return response.data
}
