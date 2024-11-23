import Tracklist from '@/components/TrackList'
import { TracksContext } from '@/components/TracksContext'
import Current from '@/components/Current'
import { useFetch } from '@/hooks/useFetch'
import Loader from '@/components/Loader'

function App() {
  const { tracks, loading, error } = useFetch()

  if (loading) return <Loader />
  if (error) return <p>Error fetching songs: {error}</p>

  return (
    <div className={`md:flex lg:flex pb-[10vh]`}>
      <TracksContext.Provider value={tracks}>
        <Current />
        <Tracklist />
      </TracksContext.Provider>
    </div>
  )
}

export default App
