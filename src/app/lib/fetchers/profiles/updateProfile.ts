import axios from 'axios'
import { TProfileUpdate } from '../../../types/types'

export async function updateProfile({
    id,
    body,
}: {
    id: string
    body: TProfileUpdate
}) {
    const response = await axios.put<{
        message: string
    }>(`/api/profiles?id=${id}`, body)
    return response.data
}
