import { StoreContext } from '@/components/StoreContext'
import { State } from '@/store'
import { useContext } from 'react'

export const useStoreContext = (): State => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider')
  }
  return context
}
