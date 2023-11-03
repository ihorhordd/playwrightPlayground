export const sleep = async (ms: number) => {
    await new Promise(r => setTimeout(r, ms))
}

export const stringifyObject = (object: any): string => {
    return JSON.stringify(object, null, 2)
}