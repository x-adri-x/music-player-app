import { useFetch } from '@/hooks/useFetch'
import Loader from '@/components/Loader'
import { lazy, Suspense } from 'react'
import ErrorBoundary from '@/components/ErrorBoundry'
import ErrorFallback from '@/components/ErrorFallback'
const Tracklist = lazy(() => import('@/components/TrackList'))
const Current = lazy(() => import('@/components/Current'))

function App() {
  const { error } = useFetch()

  return (
    <ErrorBoundary fallback={<ErrorFallback error={error} />}>
      <Suspense fallback={<Loader />}>
        <div className={`md:flex lg:flex pb-[10vh]`}>
          <Current />
          <Tracklist />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
