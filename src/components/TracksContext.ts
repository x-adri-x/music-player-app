import { createContext } from 'react'
import { TrackType } from './Track'

export const TracksContext = createContext<TrackType[]>([])
