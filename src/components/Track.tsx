import Image from '@/components/Image'
import TrackInfo from './TrackInfo'
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
    const audio = new Audio(track.track)
    audio.play()
    setLIRef(liRef.current)
    setAudioRef(audio)
    setIsPlaying(true)
    changeTrack(track)
  }
  return (
    <li ref={liRef} className="font-sans text-sm flex p-3" onClick={handleClick}>
      <Image src={track.cover} style="w-16 pr-4" />
      <div className="flex flex-col">
        <TrackInfo title={track.title} artist={track.artist} titleStyle="mb-2" artistStyle="" />
      </div>
    </li>
  )
}
