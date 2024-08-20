import Image from '@/components/Image'
import PlayButton from './PlayButton'
import { Icon } from '@iconify-icon/react'
import { useContext, useEffect, useState } from 'react'
import useStore from '@/store'
import TrackInfo from './TrackInfo'
import { TracksContext } from './TracksContext'

export default function Player() {
  const tracks = useContext(TracksContext)
  const [progress, setProgress] = useState('0')
  const currentTrack = useStore((state) => state.currentTrack)
  const currentLIRef = useStore((state) => state.currentLIRef)
  const isPlaying = useStore((state) => state.isPlaying)
  const setLIRef = useStore((state) => state.setLIRef)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const setAudioRef = useStore((state) => state.setAudioRef)
  const changeTrack = useStore((state) => state.changeTrack)

  useEffect(() => {
    function updateProgress() {
      if (currentAudioRef) {
        const currentTime = currentAudioRef.currentTime
        setProgress(((currentTime / currentAudioRef.duration) * 100).toString())
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
        changeTrack(next)
        const audio = new Audio(next.track)
        currentAudioRef?.pause()
        audio.play()
        setAudioRef(audio)
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
