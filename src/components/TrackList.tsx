import { useEffect, useState } from 'react'
import Track, { TrackType } from '@/components/Track'
import Current from './Current'

export default function Layout() {
  const [tracks, setTracks] = useState<Array<TrackType>>([])
  useEffect(() => {
    async function getData() {
      const result = await fetch('./data.json')
        .then((response) => response.json())
        .then((data) => data.data)
      if (!ignore) {
        console.log(result)
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
    <>
      <Current track={tracks[0]} />
      <ul>
        {tracks.slice(1).map((track) => (
          <Track track={track} key={track.title} />
        ))}
      </ul>
    </>
  )
}
