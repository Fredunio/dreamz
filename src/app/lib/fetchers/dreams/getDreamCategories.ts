// use axios
import axios from 'axios'
import type { DreamCategory } from '@prisma/client'

export async function getDreamCategories() {
    const response = await axios
        .get<{
            categories: DreamCategory[]
            message: string
        }>('/api/dreams/categories')
        .catch((err) => {
            console.log(err)
            throw new Error(err)
        })
    return response.data
}
