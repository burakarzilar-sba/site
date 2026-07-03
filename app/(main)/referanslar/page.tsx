import { Metadata } from 'next'
import { ReferanslarClient } from './referanslar-client'

export const metadata: Metadata = {
  title: 'Referanslar',
  description: 'SBA Elektronik olarak hizmet verdiğimiz seçkin müşterilerimiz ve tamamladığımız projeler.',
}

export default function ReferanslarPage() {
  return <ReferanslarClient />
}
