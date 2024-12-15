import { useEffect, useRef, useState } from 'react'
import PlayButton from './PlayButton'
import Volume from './Volume'
import Image from './Image'
import { convertDuration } from '@/utils'
import TrackInfo from './TrackInfo'
import Contribution from './Contribution'
import useStore from '@/store'

export default function Current() {
  const tracks = useStore((state) => state.tracks)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState<string | null>(null)
  const currentAudioRef = useStore((state) => state.currentAudioRef)
  const setAudioRef = useStore((state) => state.setAudioRef)
  const currentTrackIndex = useStore((state) => state.currentTrackIndex)
  const currentTrack = tracks[currentTrackIndex ? currentTrackIndex : 0]

  useEffect(() => {
    if (audioRef) {
      const ref = audioRef
      setAudioRef(ref)

      if (ref.current) ref.current.volume = 0.2
      function onMetaDataLoaded() {
        if (ref.current) setDuration(convertDuration(ref.current.duration))
      }
      if (ref.current) ref.current.addEventListener('loadedmetadata', onMetaDataLoaded)

      return () => {
        if (ref.current) ref.current.removeEventListener('loadedmetadata', onMetaDataLoaded)
      }
    }
  }, [currentAudioRef, tracks, setAudioRef, audioRef])

  return (
    <div className="h-2/4 flex items-center p-4 flex-col md:w-2/3 lg:w-2/5">
      <audio ref={audioRef} src={currentTrack.track} />
      <Image src={currentTrack.cover} style="w-40 py-4" />
      <TrackInfo
        title={currentTrack.title}
        artist={currentTrack.artist}
        titleStyle="self-start text-3xl uppercase font-bold"
        artistStyle="self-start"
      />
      <div className="self-end w-full">
        <div className="flex justify-between items-center">
          <p className="text-white">{duration}</p>
          <div className="flex items-center">
            <Volume />
            <PlayButton style={{ color: 'black' }} className="bg-lime-500 rounded-full p-3" />
          </div>
        </div>
        <Contribution current={currentTrack} />
      </div>
    </div>
  )
}
