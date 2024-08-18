import Image from '@/components/Image'
import PlayButton from './PlayButton'
import { useEffect, useState } from 'react'
import useStore from '@/store'

export default function Player() {
  const currentTrack = useStore((state) => state.currentTrack)
  const isPlaying = useStore((state) => state.isPlaying)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const [currentTime, setCurrentTime] = useState(currentAudioRef?.currentTime)
  const [progress, setProgress] = useState('0')

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

  return (
    <div className="bg-zinc-950 fixed bottom-0 left-0 right-0">
      <div className="flex flex-col">
        <div className="bg-stone-700 mx-2 rounded-md p-2 flex items-center">
          <Image src={currentTrack!.cover} />
          <div className="flex flex-col w-full">
            <span className="text-white">{currentTrack?.title}</span>
            <span className="text-white opacity-50">{currentTrack?.artist}</span>
          </div>
          <PlayButton style={{ color: 'white' }} className="justify-self-end" />
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
