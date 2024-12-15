import { Track } from '@/utils/types'
import { MutableRefObject } from 'react'
import { create } from 'zustand'

export interface State {
  tracks: Track[]
  currentTrackIndex: number | null
  currentAudioRef: MutableRefObject<HTMLAudioElement | null> | null
  isPlaying: boolean
  setTracks: (tracks: Track[]) => void
  setAudioRef: (element: MutableRefObject<HTMLAudioElement | null>) => void
  setCurrentTrackIndex: (i: number) => void
  setIsPlaying: (playing: boolean) => void
}

const useStore = create<State>((set) => ({
  tracks: [],
  currentTrackIndex: null,
  currentAudioRef: null,
  isPlaying: false,
  setTracks: (tracks) => set(() => ({ tracks: tracks })),
  setAudioRef: (element) => set(() => ({ currentAudioRef: element })),
  setCurrentTrackIndex: (i) => set(() => ({ currentTrackIndex: i })),
  setIsPlaying: (playing) => set(() => ({ isPlaying: playing })),
}))

export default useStore
