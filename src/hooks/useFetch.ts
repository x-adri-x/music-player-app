import { Track } from '@/utils/types'
import { useEffect, useState } from 'react'

export function useFetch() {
  const [tracks, setTracks] = useState<Array<Track>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetch('./data.json')
          .then((response) => response.json())
          .then((data) => data.data)

        if (!result) throw new Error('An error occured while fetching tracks data.')
        setTracks(result)
      } catch (error) {
        if (error instanceof Error) setError(`An error occured while fetching tracks data: ${error.message}`)
        setError('An error occured while fetching tracks data.')
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  return { tracks, loading, error }
}
