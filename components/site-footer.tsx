import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'
import { COMPANY_SHORT, COMPANY_PHONE, COMPANY_MOBILE_PHONE, COMPANY_EMAIL, COMPANY_FULL_ADDRESS } from '@/lib/constants'

export function SiteFooter() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="relative h-12 w-44 mb-4">
              <Image
                src="/images/logo-alt.png"
                alt="SBA Elektronik"
                fill
                className="object-contain object-left brightness-200"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Antalya, Burdur ve Isparta bölgesinde profesyonel elektrik mühendisliği hizmetleri sunuyoruz.
            </p>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-4">Hızlı Erişim</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/hizmetler" className="text-sm hover:text-primary transition-colors">Hizmetlerimiz</Link>
              <Link href="/urunler" className="text-sm hover:text-primary transition-colors">Ürünler</Link>
              <Link href="/referanslar" className="text-sm hover:text-primary transition-colors">Referanslar</Link>
              <Link href="/iletisim" className="text-sm hover:text-primary transition-colors">İletişim</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-4">İletişim</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{COMPANY_FULL_ADDRESS}</span>
              </div>
              <a href={`tel:${COMPANY_PHONE}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                {COMPANY_PHONE}

              </a>
              <a href={`tel:${COMPANY_MOBILE_PHONE}`} className="flex items-center gap-2 hover:text-primary transition-colors">
  <Phone className="h-4 w-4 text-primary" />
  {COMPANY_MOBILE_PHONE}
</a>
              <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                {COMPANY_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {COMPANY_SHORT}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
