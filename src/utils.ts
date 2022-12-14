// Delay helper
export const delay = <T>(ms: number): Promise<T> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
