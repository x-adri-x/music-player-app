import Image from '@/components/Image'
import TrackInfo from './TrackInfo'
import Favorite from './Favorite'
import useStore from '@/store'
import { type Track } from '@/utils/types'

export default function Track({ track, index }: { track: Track; index: number }) {
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const currentTrackIndex = useStore((state) => state.currentTrackIndex)
  const setCurrentTrackIndex = useStore((state) => state.setCurrentTrackIndex)
  const selected = index === currentTrackIndex ? 'bg-stone-300/10' : ''

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    if (target.tagName !== 'ICONIFY-ICON') {
      if (currentAudioRef && currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current.src = track.track
        currentAudioRef.current.load()
        currentAudioRef.current.oncanplay = () => {
          if (currentAudioRef.current) currentAudioRef.current.play()
        }
      }

      setIsPlaying(true)
      setCurrentTrackIndex(index)
    }
  }
  return (
    <li
      className={`font-sans text-sm flex p-3 justify-between ${selected}`}
      onClick={(e) => handleClick(e)}
      id={track.id}
    >
      <div className="flex">
        <Image src={track.cover} style="w-16 pr-4" />
        <div className="flex flex-col">
          <TrackInfo title={track.title} artist={track.artist} titleStyle="mb-2" artistStyle="" />
        </div>
      </div>
      <Favorite />
    </li>
  )
}
