export function useDebounce(): (fn: () => void, d: number) => void {
  let timer: NodeJS.Timeout
  return function (fn: () => void, d: number): void {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, d)
  }
}
