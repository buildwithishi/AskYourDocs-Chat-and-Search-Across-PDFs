export function request<T>(factory: () => T, delayMs = 350): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(factory())
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)))
      }
    }, delayMs)
  })
}
