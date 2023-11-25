export function parseDatabaseName(text_from_db: string | undefined) {
    // split then replace underscores with spaces and each word with first letter capitalized

    if (!text_from_db) {
        return ''
    }

    return text_from_db
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
