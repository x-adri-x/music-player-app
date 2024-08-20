// import useStore from '@/store'
import { Icon } from '@iconify-icon/react'
import { useContext } from 'react'
import { TracksContext } from './TracksContext'
import { useStoreContext } from '@/hooks/useStoreContext'

export default function PlayButton({ style, className }: { style: React.CSSProperties; className: string }) {
  const { isPlaying, setIsPlaying, currentAudioRef, currentTrack, changeTrack } = useStoreContext()
  const tracks = useContext(TracksContext)
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
