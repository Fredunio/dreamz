import { TTagInput } from '../../types/types'
import { prisma } from '../clients/prisma'

export function createTags(tagNames: TTagInput[]) {
    try {
        const payload = prisma.tag.createMany({
            data: tagNames.map((name) => {
                return {
                    name,
                }
            }),
            skipDuplicates: true,
        })
    } catch (e) {
        throw new Error(e)
    }
}
