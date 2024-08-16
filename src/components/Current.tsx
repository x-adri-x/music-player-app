import { useEffect, useState } from 'react'
import { TrackType } from './Track'
import { Icon } from '@iconify-icon/react'
import { convertDuration } from '@/utils'
import useStore from '@/store'

export default function Current({ track }: { track: TrackType }) {
  const [duration, setDuration] = useState<string | null>(null)
  const changeTrack = useStore((state) => state.changeTrack)
  const audio = new Audio(track.track)

  useEffect(() => {
    audio.addEventListener('loadedmetadata', () => {
      setDuration(convertDuration(audio.duration))
    })

    return () => {
      audio.removeEventListener('loadedmetadata', () => {
        setDuration(convertDuration(audio.duration))
      })
    }
  }, [])

  function handleClick() {
    changeTrack(track)
    audio.play()
  }

  return (
    <div className="h-2/4 flex items-center p-4 flex-col">
      <img src={track.cover} alt={track.cover} className="w-40 py-4" />
      <p className="self-start text-3xl uppercase text-white font-bold">{track.title}</p>
      <p className="self-start text-white text-sm">{track.artist}</p>

      <div className="self-end w-full">
        <div className="flex justify-between items-center">
          <p className="text-white">{duration}</p>
          <Icon
            icon="ri:play-fill"
            width="30px"
            style={{ color: 'black' }}
            className="bg-lime-500 rounded-full p-3"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}
