import Tracklist from '@/components/TrackList'
import { TracksContext } from '@/components/TracksContext'
import { StoreContext } from './StoreContext'
import { TrackType } from '@/components/Track'
import Current from './Current'
import { useEffect, useState } from 'react'
import useStore from '@/store'

export default function Layout() {
  const [tracks, setTracks] = useState<Array<TrackType>>([])
  const store = useStore()

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
        <StoreContext.Provider value={store}>
          <Current />
          <Tracklist />
        </StoreContext.Provider>
      </TracksContext.Provider>
    </div>
  )
}
