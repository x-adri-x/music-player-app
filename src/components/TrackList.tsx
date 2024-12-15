import Track from '@/components/Track'
import Player from './Player'
import useStore from '@/store'

export default function TrackList() {
  const tracks = useStore((state) => state.tracks)
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
