import useStore from '@/store'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

export default function Volume() {
  const [showVolume, setShowVolume] = useState(false)
  const [volume, setVolume] = useState('0.2')
  const currentAudioRef = useStore((state) => state.currentAudioRef)

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(e.target.value)
    if (currentAudioRef && currentAudioRef.current) currentAudioRef.current.volume = parseFloat(e.target.value)
  }

  function handleClick() {
    if (showVolume) {
      setShowVolume(false)
    } else {
      setShowVolume(true)
    }
  }

  return (
    <>
      {showVolume && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="accent-lime-500 mr-2"
          onMouseLeave={() => setShowVolume(false)}
        />
      )}
      <Icon
        icon="ri:volume-up-fill"
        width="30px"
        style={{ color: 'black' }}
        className="bg-lime-500 rounded-full p-3 mr-2"
        onMouseEnter={() => setShowVolume(true)}
        onClick={handleClick}
      />
    </>
  )
}
