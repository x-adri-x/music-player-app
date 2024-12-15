import useStore from '@/store'
import { useEffect, useState } from 'react'

export function useFetch() {
  const setTracks = useStore((state) => state.setTracks)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetch('./data.json')
          .then((response) => response.json())
          .then((data) => data.data)

        if (!result) throw new Error()
        setTracks(result)
      } catch (error) {
        if (error instanceof Error) setError(`An error occured while fetching tracks data: ${error.message}`)
        setError('An error occured while fetching tracks data.')
      }
    }

    getData()
  })

  return { error }
}
