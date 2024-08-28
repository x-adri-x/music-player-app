import Image from '@/components/Image'
import PlayButton from './PlayButton'
import { Icon } from '@iconify-icon/react'
import { useContext, useEffect, useState } from 'react'
import TrackInfo from './TrackInfo'
import { TracksContext } from './TracksContext'
import useStore from '@/store'

export default function Player() {
  const tracks = useContext(TracksContext)
  const [progress, setProgress] = useState('0')
  const isPlaying = useStore((state) => state.isPlaying)
  const setLIRef = useStore((state) => state.setLIRef)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const currentTrack = useStore((state) => state.currentTrack)
  const setCurrentTrack = useStore((state) => state.setCurrentTrack)
  const currentLIRef = useStore((state) => state.currentLIRef)
  const setIsPlaying = useStore((state) => state.setIsPlaying)

  useEffect(() => {
    function updateProgress() {
      if (currentAudioRef && currentAudioRef.current) {
        const currentTime = currentAudioRef.current.currentTime
        setProgress(((currentTime / currentAudioRef.current.duration) * 100).toString())
      }
    }
    const interval = setInterval(updateProgress, 1000)

    if (!isPlaying) clearInterval(interval)
    return () => clearInterval(interval)
  }, [isPlaying, currentAudioRef])

  function handleSkipForward() {
    currentLIRef?.classList.remove('bg-stone-300/10')
    if (currentLIRef?.nextElementSibling) {
      currentLIRef?.nextElementSibling?.classList.add('bg-stone-300/10')
      setLIRef(currentLIRef?.nextElementSibling as HTMLLIElement)
      const next = tracks.find((el) => el.id === currentLIRef?.nextElementSibling?.id)
      if (next) {
        setCurrentTrack(next)
        if (currentAudioRef && currentAudioRef.current) {
          currentAudioRef.current.pause()
          currentAudioRef.current.src = next.track
          currentAudioRef.current.load()
          currentAudioRef.current.oncanplay = () => {
            if (currentAudioRef.current) currentAudioRef.current.play()
          }
        }
        setIsPlaying(true)
      }
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
        <progress max="100" value={progress} className="h-0.5 mb-2 mx-5 w-auto accent-white progress" />
      </div>
    </div>
  )
}
