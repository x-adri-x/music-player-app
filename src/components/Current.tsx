import { useContext, useEffect, useState } from 'react'
import PlayButton from './PlayButton'
import Volume from './Volume'
import Image from './Image'
import { convertDuration } from '@/utils'
import { TracksContext } from './TracksContext'
import TrackInfo from './TrackInfo'
import Contribution from './Contribution'
import { useStoreContext } from '@/hooks/useStoreContext'

export default function Current() {
  const tracks = useContext(TracksContext)
  const [duration, setDuration] = useState<string | null>(null)
  const { currentAudioRef, setAudioRef, currentTrack, setLIRef } = useStoreContext()
  const current = currentTrack ? currentTrack : tracks[0]

  useEffect(() => {
    const audioRef = currentAudioRef ? currentAudioRef : new Audio(tracks[0].track)
    setAudioRef(audioRef)

    audioRef.volume = 0.2
    function onMetaDataLoaded() {
      setDuration(convertDuration(audioRef.duration))
    }
    audioRef.addEventListener('loadedmetadata', onMetaDataLoaded)

    return () => {
      audioRef.removeEventListener('loadedmetadata', onMetaDataLoaded)
    }
  }, [currentAudioRef, tracks, setAudioRef])

  useEffect(() => {
    setLIRef(document.getElementsByTagName('li')[0])
  }, [setLIRef])

  return (
    <div className="h-2/4 flex items-center p-4 flex-col md:w-2/3 lg:w-2/5">
      <Image src={current.cover} style="w-40 py-4" />
      <TrackInfo
        title={current.title}
        artist={current.artist}
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
        <Contribution current={current} />
      </div>
    </div>
  )
}
