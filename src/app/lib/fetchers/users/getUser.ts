import axios from 'axios'
import type { User } from '@prisma/client'

export async function getUser(id: string) {
    const response = await axios.get<{
        data: User[]
        message: string
    }>(`/api/users?id=${id}`)

    return response.data
}
