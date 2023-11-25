// use axios
import axios from 'axios'
import type { DreamCategory } from '@prisma/client'

export async function getDreamCategories() {
    const response = await axios.get<{
        categories: DreamCategory[]
        message: string
    }>('/api/dreams/categories')
    return response.data
}
