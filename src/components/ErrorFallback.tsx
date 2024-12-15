export default function ErrorFallback({ error }: { error: Error | string | null }) {
  if (error instanceof Error)
    return (
      <div>
        <h1>Something went wrong!</h1>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
    )

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error}</p>
    </div>
  )
}
