import { useContext, useEffect, useState } from 'react'
import PlayButton from './PlayButton'
import Volume from './Volume'
import { convertDuration } from '@/utils'
import useStore from '@/store'
import { TrackContext } from './TrackContext'

export default function Current() {
  const tracks = useContext(TrackContext)
  const [duration, setDuration] = useState<string | null>(null)
  const setAudioRef = useStore((state) => state.setAudioRef)
  const currentTrack = useStore((state) => state.currentTrack)
  const changeTrack = useStore((state) => state.changeTrack)
  const current = currentTrack ? currentTrack : tracks[0]

  useEffect(() => {
    const audio = new Audio(current.track)
    setAudioRef(audio)
    changeTrack(current)
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
      <img src={current.cover} alt={current.cover} className="w-40 py-4" />
      <p className="self-start text-3xl uppercase text-white font-bold">{current.title}</p>
      <p className="self-start text-white text-sm">{currentTrack?.artist}</p>

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
