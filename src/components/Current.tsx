import { useContext, useEffect, useState } from 'react'
import { Icon } from '@iconify-icon/react'
import { convertDuration } from '@/utils'
import useStore from '@/store'
import { TrackContext } from './TrackContext'

export default function Current() {
  const tracks = useContext(TrackContext)
  const [duration, setDuration] = useState<string | null>(null)
  const setAudioRef = useStore((state) => state.setAudioRef)
  const currentAudio = useStore((state) => state.currentAudioRef)
  const currentTrack = useStore((state) => state.currentTrack)
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const isPlaying = useStore((state) => state.isPlaying)
  const changeTrack = useStore((state) => state.changeTrack)
  const [showVolume, setShowVolume] = useState(false)
  const [volume, setVolume] = useState('0.2')
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

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(e.target.value)
    currentAudio!.volume = parseFloat(e.target.value)
  }

  function handleClick() {
    if (!isPlaying) {
      setIsPlaying(true)
      currentAudio?.play()
      changeTrack(current)
    } else {
      currentAudio?.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="h-2/4 flex items-center p-4 flex-col">
      <img src={current.cover} alt={current.cover} className="w-40 py-4" />
      <p className="self-start text-3xl uppercase text-white font-bold">{current.title}</p>
      <p className="self-start text-white text-sm">{currentTrack?.artist}</p>

      <div className="self-end w-full">
        <div className="flex justify-between items-center">
          <p className="text-white">{duration}</p>

          <div className="flex items-center">
            {showVolume && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="accent-lime-500 mr-2"
                onMouseLeave={() => setShowVolume(false)}
              />
            )}
            <Icon
              icon="ri:volume-up-fill"
              width="30px"
              style={{ color: 'black' }}
              className="bg-lime-500 rounded-full p-3 mr-2"
              onMouseEnter={() => setShowVolume(true)}
              onClick={() => setShowVolume(true)}
            />
            <Icon
              icon={isPlaying ? 'ri:pause-fill' : 'ri:play-fill'}
              width="30px"
              style={{ color: 'black' }}
              className="bg-lime-500 rounded-full p-3"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
