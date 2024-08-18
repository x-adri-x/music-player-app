import Image from '@/components/Image'
import { useRef } from 'react'
import useStore from '@/store'

export type TrackType = {
  id: string
  title: string
  artist: string
  track: string
  cover: string
  contribution: string
}

export default function Track({ track }: { track: TrackType }) {
  const liRef = useRef<HTMLLIElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const changeTrack = useStore((state) => state.changeTrack)
  const setAudioRef = useStore((state) => state.setAudioRef)
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const setLIRef = useStore((state) => state.setLIRef)
  const currentTrack = useStore((state) => state.currentTrack)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const currentLIRef = useStore((state) => state.currentLIRef)

  const handleClick = () => {
    // console.log(liRef.current?.nextSibling)
    currentLIRef?.classList.remove('bg-stone-300/10')
    liRef.current?.classList.add('bg-stone-300/10')

    if (currentTrack?.id !== track.id) currentAudioRef?.pause()
    audioRef.current?.play()
    setLIRef(liRef.current)
    setAudioRef(audioRef.current)
    setIsPlaying(true)
    changeTrack(track)
  }
  return (
    <li ref={liRef} className="font-sans text-sm flex p-3" onClick={handleClick}>
      <Image src={track.cover} style="w-16 pr-4" />
      <div className="flex flex-col">
        <span className="mb-2 text-white">{track.title}</span>
        <span className="text-white opacity-50">{track.artist}</span>
      </div>
      <audio ref={audioRef}>
        <source src={track.track}></source>
      </audio>
    </li>
  )
}
