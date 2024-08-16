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
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const changeTrack = useStore((state) => state.changeTrack)
  const setRef = useStore((state) => state.setRef)
  const currentTrack = useStore((state) => state.currentTrack)
  const ref = useStore((state) => state.ref)

  const handleClick = () => {
    // console.log(liRef.current?.nextSibling)
    if (currentTrack !== track.id) ref?.pause()
    audioRef.current?.play()
    setRef(audioRef.current)
    changeTrack(track.id)
  }
  return (
    <li className="font-sans text-sm flex p-3" onClick={handleClick}>
      <Image src={track.cover} />
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
