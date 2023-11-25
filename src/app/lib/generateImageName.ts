export function generateImageName(fileType: File['type']) {
    const fileExtension = fileType.split('/')[1]
    const imageName = `${crypto.randomUUID()}.${fileExtension}`

    return imageName
}
