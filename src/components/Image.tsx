export default function Image({ src, style }: { src: string; style: string }) {
  return <img src={src} alt={src} className={style} />
}
