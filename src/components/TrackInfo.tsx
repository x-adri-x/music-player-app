export default function TrackInfo({
  title,
  artist,
  titleStyle,
  artistStyle,
}: {
  title: string
  artist: string
  titleStyle: string
  artistStyle: string
}) {
  return (
    <>
      <p className={`text-white ${titleStyle}`}>{title}</p>
      <p className={`text-white opacity-50 ${artistStyle}`}>{artist}</p>
    </>
  )
}
