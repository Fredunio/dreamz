export function excludeFields<
    Obj extends {},
    Key extends 'string | number | symbol',
>(user: Obj, keys: Key[]): Omit<Obj, Key> {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    ) as Omit<Obj, Key>
}
