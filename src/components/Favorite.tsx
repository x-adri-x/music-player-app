import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

export default function Favorite() {
  const [icon, setIcon] = useState('ri:heart-line')
  function onClick() {
    if (icon === 'ri:heart-line') {
      setIcon('ri:heart-fill')
    } else {
      setIcon('ri:heart-line')
    }
  }
  return <Icon icon={icon} width="30px" style={{ color: 'white' }} className="justify-self-end" onClick={onClick} />
}
