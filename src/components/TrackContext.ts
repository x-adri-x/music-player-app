import { createContext } from 'react'
import { TrackType } from './Track'

export const TrackContext = createContext<TrackType[]>([])
