import axios from 'axios'
import {
    TDreamInput,
    TEmotionInput,
    TDreamTagInput,
} from '../../../types/types'

// {
//     dreamInput,
//     tags,
//     emotions,
// }: {
//     dreamInput: TDreamInput
//     tags?: TDreamTagInput[]
//     emotions?: TEmotionInput[]
// }
export async function postDream(form: FormData) {
    await axios
        .post<
            {
                form: FormData
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
