import axios from 'axios'
import type { Emotion, ZodiacSign } from '@prisma/client'

export async function getZodiacSigns() {
    const response = await axios.get<{
        zodiacSigns: ZodiacSign[]
        message: string
    }>('/api/zodiacSigns')

    return response.data
}
