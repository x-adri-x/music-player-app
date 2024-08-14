export default function Image({ src }: { src: string }) {
  return <img src={src} alt={src} className="w-16 pr-4" />
}
