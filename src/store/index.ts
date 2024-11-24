import { MutableRefObject } from 'react'
import { create } from 'zustand'

export interface State {
  currentTrackIndex: number
  currentAudioRef: MutableRefObject<HTMLAudioElement | null> | null
  isPlaying: boolean
  setAudioRef: (element: MutableRefObject<HTMLAudioElement | null>) => void
  setCurrentTrackIndex: (i: number) => void
  setIsPlaying: (playing: boolean) => void
}

const useStore = create<State>((set) => ({
  currentTrackIndex: 0,
  currentAudioRef: null,
  isPlaying: false,
  setAudioRef: (element) => set(() => ({ currentAudioRef: element })),
  setCurrentTrackIndex: (i) => set(() => ({ currentTrackIndex: i })),
  setIsPlaying: (playing) => set(() => ({ isPlaying: playing })),
}))

export default useStore
