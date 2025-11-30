import { useLocalStorage } from '@vueuse/core'

export function useDraftState<T extends Record<string, unknown>>(key: string, initialState: T) {
  return useLocalStorage(key, initialState, {
    serializer: {
      read: (value: string) => {
        try {
          return JSON.parse(value)
        } catch {
          return initialState
        }
      },
      write: (value: T) => JSON.stringify(value),
    },
  })
}
