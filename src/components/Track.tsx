import Image from '@/components/Image'
import { useRef } from 'react'

export type TrackType = {
  title: string
  artist: string
  track: string
  cover: string
  contribution: string
}

export default function Track({ track }: { track: TrackType }) {
  const liRef = useRef<HTMLLIElement | null>(null)
  const handleClick = (audio: string) => {
    // console.log(liRef.current?.nextSibling)
    const audioElement = new Audio(audio)
    audioElement.play()
  }
  return (
    <li ref={liRef} className="font-sans text-sm flex p-3" onClick={() => handleClick(track.track)}>
      <Image src={track.cover} />
      <div className="flex flex-col">
        <span className="mb-2 text-white">{track.title}</span>
        <span className="text-white opacity-50">{track.artist}</span>
      </div>
    </li>
  )
}
