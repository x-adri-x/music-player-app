import Image from '@/components/Image'
import { TrackType } from './Track'
import { Icon } from '@iconify-icon/react'
import { useEffect, useRef, useState } from 'react'
import { convertDuration } from '@/utils'

export default function Player({ track }: { track: TrackType }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState<string>('0')

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current?.addEventListener('loadedmetadata', () => {
        setDuration(convertDuration(audioRef.current!.duration))
      })
    }

    return () => {
      audioRef.current?.removeEventListener('loadedmetadata', () => {
        setDuration(convertDuration(audioRef.current!.duration))
      })
    }
  }, [])

  return (
    <div className="bg-zinc-950 fixed bottom-0 left-0 right-0">
      <div className="flex flex-col">
        <div className="bg-stone-700 mx-2 rounded-md p-2 flex items-center">
          <Image src={track.cover} />
          <div className="flex flex-col w-full">
            <span className="text-white">{track.title}</span>
            <span className="text-white opacity-50">{track.artist}</span>
          </div>
          <Icon icon="ri:play-fill" width="30px" style={{ color: 'white' }} className="justify-self-end" />
        </div>
        <audio ref={audioRef}>
          <source src={track.track}></source>
        </audio>
        <progress max="100" value="70" className="h-0.5 mb-2 mx-5 w-auto accent-white progress" />
      </div>
    </div>
  )
}
