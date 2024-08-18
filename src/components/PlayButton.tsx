import useStore from '@/store'
import { Icon } from '@iconify-icon/react'
import { useContext } from 'react'
import { TrackContext } from './TrackContext'

export default function PlayButton({ style, className }: { style: React.CSSProperties; className: string }) {
  const isPlaying = useStore((state) => state.isPlaying)
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const currentTrack = useStore((state) => state.currentTrack)
  const changeTrack = useStore((state) => state.changeTrack)
  const tracks = useContext(TrackContext)
  const current = currentTrack ? currentTrack : tracks[0]

  function handleClick() {
    if (!isPlaying) {
      setIsPlaying(true)
      currentAudioRef?.play()
      if (!currentTrack) changeTrack(current)
    } else {
      currentAudioRef?.pause()
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
