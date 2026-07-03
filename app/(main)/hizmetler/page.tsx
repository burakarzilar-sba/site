import { Metadata } from 'next'
import { HizmetlerClient } from './hizmetler-client'

export const metadata: Metadata = {
  title: 'Hizmetlerimiz',
  description: 'SBA Elektronik olarak proje taahhüt, GES kurulumu, trafo kurulumu, akıllı ev sistemleri ve daha fazla elektrik mühendisliği hizmeti sunuyoruz.',
}

export default function HizmetlerPage() {
  return <HizmetlerClient />
}
