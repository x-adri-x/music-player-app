import Image from '@/components/Image'
import { Icon } from '@iconify-icon/react'
import { useEffect, useRef, useState } from 'react'
import { convertDuration } from '@/utils'
import useStore from '@/store'

export default function Player() {
  const currentTrack = useStore((state) => state.currentTrack)
  const isPlaying = useStore((state) => state.isPlaying)
  // const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const icon = isPlaying ? 'ri:pause-fill' : 'ri:play-fill'
  const [currentTime, setCurrentTime] = useState(currentAudioRef?.currentTime)
  const [progress, setProgress] = useState('0')
  const setIsPlaying = useStore((state) => state.setIsPlaying)

  useEffect(() => {
    currentAudioRef?.addEventListener('ontimeupdate', () => console.log('yoo'))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        // console.log((prevTime! / currentAudioRef!.duration) * 100)
        setProgress(((prevTime! / currentAudioRef!.duration) * 100).toString())
        return prevTime! + 1
      })
    }, 1000)

    if (!isPlaying) clearInterval(interval)
    return () => clearInterval(interval)
  }, [currentTime])

  function handleClick() {
    if (!isPlaying) {
      setIsPlaying(true)
      currentAudioRef?.play()
    } else {
      currentAudioRef?.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="bg-zinc-950 fixed bottom-0 left-0 right-0">
      <div className="flex flex-col">
        <div className="bg-stone-700 mx-2 rounded-md p-2 flex items-center">
          <Image src={currentTrack!.cover} />
          <div className="flex flex-col w-full">
            <span className="text-white">{currentTrack?.title}</span>
            <span className="text-white opacity-50">{currentTrack?.artist}</span>
          </div>
          <Icon
            icon={icon}
            width="30px"
            style={{ color: 'white' }}
            className="justify-self-end"
            onClick={handleClick}
          />
        </div>
        <progress
          max={currentAudioRef!.duration.toString()}
          value={progress}
          className="h-0.5 mb-2 mx-5 w-auto accent-white progress"
        />
      </div>
    </div>
  )
}
