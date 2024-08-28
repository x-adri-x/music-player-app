import { TrackType } from '@/components/Track'
import { MutableRefObject } from 'react'
import { create } from 'zustand'

export interface State {
  currentTrack: TrackType | null
  currentAudioRef: MutableRefObject<HTMLAudioElement | null> | null
  currentLIRef: HTMLLIElement | null
  isPlaying: boolean
  setAudioRef: (element: MutableRefObject<HTMLAudioElement | null>) => void
  setLIRef: (element: HTMLLIElement | null) => void
  setCurrentTrack: (track: TrackType | null) => void
  setIsPlaying: (playing: boolean) => void
}

const useStore = create<State>((set) => ({
  currentTrack: null,
  currentAudioRef: null,
  currentLIRef: null,
  isPlaying: false,
  setAudioRef: (element) => set(() => ({ currentAudioRef: element })),
  setLIRef: (element) => set(() => ({ currentLIRef: element })),
  setCurrentTrack: (track) => set(() => ({ currentTrack: track })),
  setIsPlaying: (playing) => set(() => ({ isPlaying: playing })),
}))

export default useStore
