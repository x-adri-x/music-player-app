import { create } from 'zustand'

export interface State {
  currentTrack: string | null
  ref: HTMLAudioElement | null
  setRef: (element: HTMLAudioElement | null) => void
  changeTrack: (id: string) => void
}

const useStore = create<State>((set) => ({
  currentTrack: null,
  ref: null,
  setRef: (element) => set(() => ({ ref: element })),
  changeTrack: (id) => set(() => ({ currentTrack: id })),
}))

export default useStore
