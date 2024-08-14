import { TrackType } from './Track'

export default function Current({ track }: { track: TrackType }) {
  return (
    <div className="h-2/4 flex items-center p-4 flex-col">
      <img src={track.cover} alt={track.cover} className="w-40 py-4" />
      <p className="self-start text-3xl uppercase text-white font-bold">{track.title}</p>
      <p className="self-start text-white text-sm">{track.artist}</p>
    </div>
  )
}
