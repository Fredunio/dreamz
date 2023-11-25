import { Dream, Emotion, Tag } from '@prisma/client'

export type TEntityType = 'dream' | 'dreamon'

export type TDreamInput = Omit<
    Dream,
    'id' | 'createdAt' | 'updatedAt' | 'image' | 'userId'
> & {
    image?: File
}

export type TTagInput = Tag['name']

// id is a BigInt, but it can't be serialized to JSON
export type TEmotionInput = Emotion['id']
