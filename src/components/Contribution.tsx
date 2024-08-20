import { TrackType } from './Track'

const PIXABAY =
  'https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=176004'

export default function Contribution({ current }: { current: TrackType }) {
  return (
    <>
      <p>
        Music by <a href={current.contribution}>{current.artist}</a> from <a href={PIXABAY}>Pixabay</a>
      </p>
    </>
  )
}
