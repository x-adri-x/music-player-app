// import useStore from '@/store'
import { Icon } from '@iconify-icon/react'
import { useContext } from 'react'
import { TracksContext } from './TracksContext'
import useStore from '@/store'

export default function PlayButton({ style, className }: { style: React.CSSProperties; className: string }) {
  const isPlaying = useStore((state) => state.isPlaying)
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const currentTrack = useStore((state) => state.currentTrack)
  const setCurrentTrack = useStore((state) => state.setCurrentTrack)
  const tracks = useContext(TracksContext)
  const current = currentTrack ? currentTrack : tracks[0]

  function handleClick() {
    if (!isPlaying) {
      setIsPlaying(true)
      if (currentAudioRef && currentAudioRef.current) currentAudioRef.current.play()
      if (!currentTrack) setCurrentTrack(current)
    } else {
      if (currentAudioRef && currentAudioRef.current) currentAudioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <Icon
      icon={isPlaying ? 'ri:pause-fill' : 'ri:play-fill'}
      width="30px"
      style={style}
      className={className}
      onClick={handleClick}
    />
  )
}
