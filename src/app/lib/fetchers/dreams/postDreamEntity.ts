import axios from 'axios'
import { TDreamInput, TEmotionInput, TTagInput } from '../../../types/types'

// {
//     dreamInput,
//     tags,
//     emotions,
// }: {
//     dreamInput: TDreamInput
//     tags?: TTagInput[]
//     emotions?: TEmotionInput[]
// }
export async function postDreamEntity(form: FormData) {
    await axios
        .post<
            {
                form: FormData
                // dreamInput: TDreamInput
                // tags?: TTagInput[]
                // emotions?: TEmotionInput[]
            },
            void
        >('/api/dreams/add_dream', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .catch((err) => {
            console.log(err)
            throw new Error(err)
        })
}
