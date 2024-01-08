import { TDreamTagInput } from '../../types/types'
import { prisma } from '../clients/prisma'

export function createTags(tagNames: TDreamTagInput[]) {
    try {
        const payload = prisma.dreamTag.createMany({
            data: tagNames.map((name) => {
                return {
                    name,
                }
            }),
            skipDuplicates: true,
        })
    } catch (e) {
        throw new Error(e as any)
    }
}
