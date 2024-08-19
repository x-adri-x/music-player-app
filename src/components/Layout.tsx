import Tracklist from '@/components/TrackList'
import { TracksContext } from '@/components/TracksContext'
import { TrackType } from '@/components/Track'
import Current from './Current'
import { useEffect, useState } from 'react'

export default function Layout() {
  const [tracks, setTracks] = useState<Array<TrackType>>([])

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
    <div className="md:flex lg:flex">
      <TracksContext.Provider value={tracks}>
        <Current />
        <Tracklist />
      </TracksContext.Provider>
    </div>
  )
}
