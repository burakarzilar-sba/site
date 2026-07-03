'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COMPANY_PHONE } from '@/lib/constants'

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/urunler', label: 'Ürünler' },
  { href: '/referanslar', label: 'Referanslar' },
  { href: '/blog', label: 'Blog' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="mx-auto max-w-[1200px] px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-10 w-40">
            <Image
              src="/images/logo-horizontal.png"
              alt="SBA Elektronik Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === link.href
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${COMPANY_PHONE}`} className="flex items-center gap-2 text-sm font-medium text-primary">
            <Phone className="h-4 w-4" />
            {COMPANY_PHONE}
          </a>
          <Link href="/iletisim">
            <Button size="sm">Teklif Alın</Button>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-border shadow-lg">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-2">
              <a href={`tel:${COMPANY_PHONE}`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary">
                <Phone className="h-4 w-4" />
                {COMPANY_PHONE}
              </a>
              <Link href="/iletisim" onClick={() => setMobileOpen(false)} className="block px-4 mt-2">
                <Button className="w-full" size="sm">Teklif Alın</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
