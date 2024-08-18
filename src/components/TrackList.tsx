import { useEffect, useState } from 'react'
import Track, { TrackType } from '@/components/Track'
import { TracksContext } from '@/components/TracksContext'
import Current from './Current'
import Player from './Player'
import useStore from '@/store'

export default function Layout() {
  const [tracks, setTracks] = useState<Array<TrackType>>([])
  const currentTrack = useStore((state) => state.currentTrack)

  useEffect(() => {
    async function getData() {
      const result = await fetch('./data.json')
        .then((response) => response.json())
        .then((data) => data.data)
      if (!ignore) {
        setTracks(result)
      }
    }

    let ignore = false
    getData()
    return () => {
      ignore = true
    }
  }, [])

  {
    if (tracks.length === 0) return <p className="font-sans text-slate-200">Loading ...</p>
  }
  return (
    <TracksContext.Provider value={tracks}>
      <Current />
      <ul>
        {tracks.slice(1).map((track) => (
          <Track track={track} key={track.id} />
        ))}
      </ul>
      {currentTrack && <Player />}
    </TracksContext.Provider>
  )
}
