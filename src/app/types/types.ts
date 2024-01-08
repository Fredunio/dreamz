import { Dream, Emotion, DreamTag, User } from '@prisma/client'

export type TEntityType = 'dream' | 'dreamon'

export type TDreamInput = Omit<
    Dream,
    'id' | 'createdAt' | 'updatedAt' | 'image' | 'userId'
> & {
    image?: File
}

export type TDreamTagInput = DreamTag['name']

// id is a BigInt, but it can't be serialized to JSON
export type TEmotionInput = Emotion['id']

export type TDreamWithImageUrl = Dream & {
    imageUrl?: string
}

export type TPublicProfile = Omit<
    User,
    'password_hash' | 'emailVerified' | 'verifyEmailToken'
>

// For updating profile
export type TProfileUpdate = Partial<
    Omit<
        User,
        | 'id'
        | 'email'
        | 'emailVerified'
        | 'verifyEmailToken'
        | 'password_hash'
        | 'created_at'
        | 'updated_at'
    >
>
