import { Metadata } from 'next'
import { IletisimClient } from './iletisim-client'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'SBA Elektronik ile iletişime geçin. Kepez, Antalya. Elektrik mühendisliği hizmetleri için ücretsiz teklif alın.',
}

export default function IletisimPage() {
  return <IletisimClient />
}
