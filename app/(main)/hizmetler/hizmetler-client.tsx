'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FadeIn, SlideIn } from '@/components/ui/animate'
import { SERVICES } from '@/lib/constants'
import { ClipboardCheck, Zap, UserPlus, Building2, Sun, Cable, Box, Home, ArrowRight, CheckCircle } from 'lucide-react'

const iconMap: Record<string, any> = { ClipboardCheck, Zap, UserPlus, Building2, Sun, Cable, Box, Home }

export function HizmetlerClient() {
  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Hizmetlerimiz
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Antalya, Burdur ve Isparta bölgesinde kapsamlı elektrik mühendisliği hizmetleri sunuyoruz.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          {SERVICES.map((svc, index) => {
            const Icon = iconMap[svc?.icon ?? ''] ?? Zap
            const isEven = index % 2 === 0
            return (
              <div key={svc.id} id={svc.id} className="scroll-mt-20 mb-16 last:mb-0">
                <FadeIn>
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        <Image src={svc.image} alt={svc.title} fill className="object-cover" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary rounded-lg p-3">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{svc.title}</h2>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">{svc.description}</p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          Profesyonel ekip ile uygulama
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          Zamanında teslim garantisi
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          Satış sonrası destek
                        </li>
                      </ul>
                      <Link href="/iletisim">
                        <Button className="gap-2">Teklif Alın <ArrowRight className="h-4 w-4" /></Button>
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
