import Image from '@/components/Image'
import TrackInfo from './TrackInfo'
import Favorite from './Favorite'
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
  const liRef = useRef<HTMLLIElement>(null)
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const setLIRef = useStore((state) => state.setLIRef)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const currentLIRef = useStore((state) => state.currentLIRef)
  const setCurrentTrack = useStore((state) => state.setCurrentTrack)

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    if (target.tagName !== 'ICONIFY-ICON') {
      currentLIRef?.classList.remove('bg-stone-300/10')
      liRef.current?.classList.add('bg-stone-300/10')
      if (currentAudioRef && currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current.src = track.track
        currentAudioRef.current.load()
        currentAudioRef.current.oncanplay = () => {
          if (currentAudioRef.current) currentAudioRef.current.play()
        }
      }

      setLIRef(liRef.current)
      setIsPlaying(true)
      setCurrentTrack(track)
    }
  }
  return (
    <li
      ref={liRef}
      className="font-sans text-sm flex p-3 justify-between"
      onClick={(e) => handleClick(e)}
      id={track.id}
    >
      <div className="flex">
        <Image src={track.cover} style="w-16 pr-4" />
        <div className="flex flex-col">
          <TrackInfo title={track.title} artist={track.artist} titleStyle="mb-2" artistStyle="" />
        </div>
      </div>
      <Favorite />
    </li>
  )
}
