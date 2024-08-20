import { useContext } from 'react'
import Track from '@/components/Track'
import { TracksContext } from '@/components/TracksContext'

import Player from './Player'
import useStore from '@/store'

export default function TrackList() {
  const tracks = useContext(TracksContext)
  const currentTrack = useStore((state) => state.currentTrack)

  return (
    <div className="w-full">
      <ul>
        {tracks.map((track) => (
          <Track track={track} key={track.id} />
        ))}
      </ul>
      {currentTrack && <Player key={currentTrack.id} />}
    </div>
  )
}
