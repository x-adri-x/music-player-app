import { createContext } from 'react'
import { Track } from '@/utils/types'

export const TracksContext = createContext<Track[]>([])
