import Image from '@/components/Image'
import PlayButton from './PlayButton'
import { Icon } from '@iconify-icon/react'
import { useEffect, useState } from 'react'
import useStore from '@/store'
import TrackInfo from './TrackInfo'

export default function Player() {
  const currentTrack = useStore((state) => state.currentTrack)
  const currentLIRef = useStore((state) => state.currentLIRef)
  const isPlaying = useStore((state) => state.isPlaying)
  const setLIRef = useStore((state) => state.setLIRef)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const setAudioRef = useStore((state) => state.setAudioRef)
  const [currentTime, setCurrentTime] = useState(currentAudioRef?.currentTime)
  const [progress, setProgress] = useState('0')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        setProgress(((prevTime! / currentAudioRef!.duration) * 100).toString())
        return prevTime! + 1
      })
    }, 1000)

    if (!isPlaying) clearInterval(interval)
    return () => clearInterval(interval)
  }, [currentTime])

  function handleSkipForward() {
    currentLIRef?.classList.remove('bg-stone-300/10')
    if (currentLIRef?.nextElementSibling) {
      currentLIRef?.nextElementSibling?.classList.add('bg-stone-300/10')
      setLIRef(currentLIRef?.nextElementSibling as HTMLLIElement)
      const audio = new Audio(currentLIRef?.nextElementSibling?.id)
      currentAudioRef?.pause()
      audio.play()
      setAudioRef(audio)
    }
  }

  return (
    <div className="bg-zinc-950 fixed bottom-0 left-0 right-0 text-sm">
      <div className="flex flex-col">
        <div className="bg-stone-700 mx-2 rounded-md p-2 flex items-center">
          <Image src={currentTrack!.cover} style="w-16 pr-4" />
          <div className="flex flex-col w-full">
            <TrackInfo title={currentTrack!.title} artist={currentTrack!.artist} titleStyle="" artistStyle="" />
          </div>
          <Icon icon="ri:skip-forward-fill" style={{ color: 'white' }} width="30px" onClick={handleSkipForward} />
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
