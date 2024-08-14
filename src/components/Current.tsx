import { useEffect, useState } from 'react'
import { TrackType } from './Track'
import { Icon } from '@iconify-icon/react'
import { convertDuration } from '@/utils'

export default function Current({ track }: { track: TrackType }) {
  const [duration, setDuration] = useState<string | null>(null)
  useEffect(() => {
    const audio = new Audio(track.track)
    audio.addEventListener('loadedmetadata', () => {
      setDuration(convertDuration(audio.duration))
    })
  }, [])

  return (
    <div className="h-2/4 flex items-center p-4 flex-col">
      <img src={track.cover} alt={track.cover} className="w-40 py-4" />
      <p className="self-start text-3xl uppercase text-white font-bold">{track.title}</p>
      <p className="self-start text-white text-sm">{track.artist}</p>

      <div className="self-end">
        <p>{duration}</p>
        <Icon icon="ri:play-fill" width="30px" style={{ color: 'black' }} className="bg-lime-500 rounded-full p-3" />
      </div>
    </div>
  )
}
