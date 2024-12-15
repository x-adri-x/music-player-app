export default function ErrorFallback({ error }: { error: Error | string | null }) {
  if (error instanceof Error)
    return (
      <div className="text-stone-50 text-lg font-semibold flex flex-col justify-center items-center h-[100dvh] tracking-wide">
        <h1>Something went wrong!</h1>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
    )

  return (
    <div className="text-stone-50 text-xl font-semibold flex flex-col justify-center items-center h-[100dvh] tracking-wide">
      <h1>Something went wrong!</h1>
      <p>{error}</p>
    </div>
  )
}
