import useStore from '@/store'
import { Icon } from '@iconify-icon/react'

export default function PlayButton({ style, className }: { style: React.CSSProperties; className: string }) {
  const isPlaying = useStore((state) => state.isPlaying)
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const currentAudioRef = useStore((state) => state.currentAudioRef)

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
    <Icon
      icon={isPlaying ? 'ri:pause-fill' : 'ri:play-fill'}
      width="30px"
      style={style}
      className={className}
      onClick={handleClick}
    />
  )
}
