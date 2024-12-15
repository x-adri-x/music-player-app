import { Audio } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-[100dvh]">
      <Audio height="80" width="80" color="#84cc16" ariaLabel="loading" wrapperStyle={{}} wrapperClass="" />
    </div>
  )
}
