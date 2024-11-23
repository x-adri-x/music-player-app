import { Track } from '@/utils/types'

const PIXABAY =
  'https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=176004'

export default function Contribution({ current }: { current: Track }) {
  return (
    <>
      <p className="text-white">
        Music by <a href={current.contribution}>{current.artist}</a> from <a href={PIXABAY}>Pixabay</a>
      </p>
    </>
  )
}
