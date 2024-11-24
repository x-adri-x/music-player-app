import { useContext } from 'react'
import Track from '@/components/Track'
import { TracksContext } from '@/components/TracksContext'
import Player from './Player'
import useStore from '@/store'

export default function TrackList() {
  const tracks = useContext(TracksContext)
  const currentTrackIndex = useStore((state) => state.currentTrackIndex)
  const currentTrack = tracks[currentTrackIndex]

  return (
    <div className="w-full">
      <ul>
        {tracks.map((track, i) => (
          <Track track={track} key={track.id} index={i} />
        ))}
      </ul>
      {currentTrack && <Player key={currentTrack.id} />}
    </div>
  )
}
