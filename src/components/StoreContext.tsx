import { createContext } from 'react'
import { State } from '@/store/index'

export const StoreContext = createContext<State | null>(null)
