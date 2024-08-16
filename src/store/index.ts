import { TrackType } from '@/components/Track'
import { create } from 'zustand'

export interface State {
  currentTrack: TrackType | null
  currentAudioRef: HTMLAudioElement | null
  currentLIRef: HTMLLIElement | null
  setAudioRef: (element: HTMLAudioElement | null) => void
  setLIRef: (element: HTMLLIElement | null) => void
  changeTrack: (track: TrackType) => void
}

const useStore = create<State>((set) => ({
  currentTrack: null,
  currentAudioRef: null,
  currentLIRef: null,
  setAudioRef: (element) => set(() => ({ currentAudioRef: element })),
  setLIRef: (element) => set(() => ({ currentLIRef: element })),
  changeTrack: (track) => set(() => ({ currentTrack: track })),
}))

export default useStore
