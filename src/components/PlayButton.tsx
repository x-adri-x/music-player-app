import { Icon } from '@iconify-icon/react'
import useStore from '@/store'

export default function PlayButton({ style, className }: { style: React.CSSProperties; className: string }) {
  const isPlaying = useStore((state) => state.isPlaying)
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const currentAudioRef = useStore((state) => state.currentAudioRef)

  function handleClick() {
    if (!isPlaying) {
      setIsPlaying(true)

      if (currentAudioRef && currentAudioRef.current) currentAudioRef.current.play()
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
