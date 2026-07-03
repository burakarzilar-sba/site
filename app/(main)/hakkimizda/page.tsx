import { Metadata } from 'next'
import { HakkimizdaClient } from './hakkimizda-client'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'SBA Elektronik Elektrik Mühendislik Ltd. Şti. hakkında bilgi, misyon, vizyon ve ekibimiz.',
}

export default function HakkimizdaPage() {
  return <HakkimizdaClient />
}
