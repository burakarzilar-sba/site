import { Metadata } from 'next'
import { GirisClient } from './giris-client'

export const metadata: Metadata = { title: 'Giri\u015f' }

export default function GirisPage() {
  return <GirisClient />
}
