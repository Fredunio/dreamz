export function createUrlParams(
    paramName: string,
    paramValue: string | string[]
) {
    let urlParams = new URLSearchParams()
    if (Array.isArray(paramValue)) {
        paramValue.forEach((value) => {
            urlParams.append(paramName, value)
        })
    } else {
        urlParams.set(paramName, paramValue)
    }
    return urlParams
}
