import { useContext, useEffect, useState } from 'react'
import PlayButton from './PlayButton'
import Volume from './Volume'
import Image from './Image'
import { convertDuration } from '@/utils'
import useStore from '@/store'
import { TracksContext } from './TracksContext'
import TrackInfo from './TrackInfo'

export default function Current() {
  const tracks = useContext(TracksContext)
  const [duration, setDuration] = useState<string | null>(null)
  const setAudioRef = useStore((state) => state.setAudioRef)
  const currentTrack = useStore((state) => state.currentTrack)
  const current = currentTrack ? currentTrack : tracks[0]

  useEffect(() => {
    const audio = new Audio(current.track)
    setAudioRef(audio)
    audio.volume = 0.2
    audio.addEventListener('loadedmetadata', () => {
      setDuration(convertDuration(audio.duration))
    })

    return () => {
      audio.removeEventListener('loadedmetadata', () => {
        setDuration(convertDuration(audio.duration))
      })
    }
  }, [])

  return (
    <div className="h-2/4 flex items-center p-4 flex-col">
      <Image src={current.cover} style="w-40 py-4" />
      <TrackInfo
        title={current.title}
        artist={current.artist}
        titleStyle="self-start text-3xl uppercase font-bold"
        artistStyle="self-start"
      />
      <div className="self-end w-full">
        <div className="flex justify-between items-center">
          <p className="text-white">{duration}</p>
          <div className="flex items-center">
            <Volume />
            <PlayButton style={{ color: 'black' }} className="bg-lime-500 rounded-full p-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
