import { Metadata } from 'next'
import { SepetClient } from './sepet-client'

export const metadata: Metadata = { title: 'Sepet' }

export default function SepetPage() {
  return <SepetClient />
}
