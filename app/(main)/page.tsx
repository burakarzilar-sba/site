import { Metadata } from 'next'
import { HomeClient } from './home-client'

export const metadata: Metadata = {
  title: 'SBA Elektronik | Elektrik Mühendislik Hizmetleri - Antalya',
  description: 'Antalya, Burdur ve Isparta bölgesinde profesyonel elektrik mühendisliği hizmetleri. Proje taahhüt, GES, trafo kurulumu, akıllı ev sistemleri.',
}

export default function HomePage() {
  return <HomeClient />
}
