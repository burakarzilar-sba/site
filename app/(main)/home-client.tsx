'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { CounterAnimation } from '@/components/counter-animation'
import { SERVICES, REFERENCES, STATS } from '@/lib/constants'
import {
  ClipboardCheck, Zap, UserPlus, Building2, Sun, Cable, Box, Home,
  ArrowRight, Shield, Award, Clock, ChevronRight
} from 'lucide-react'

const iconMap: Record<string, any> = {
  ClipboardCheck, Zap, UserPlus, Building2, Sun, Cable, Box, Home,
}

export function HomeClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://library.automationdirect.com/eemsushe/2022/05/Fig1_3_43-Panel-Pic-scaled.jpg"
            alt="Elektrik mühendisliği projesi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/70 to-[#1a1a2e]/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4 border border-primary/30">
                Antalya • Burdur • Isparta
              </span>
            </FadeIn>
            <SlideIn from="left" delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
                Profesyonel <span className="text-primary">Elektrik Mühendisliği</span> Hizmetleri
              </h1>
            </SlideIn>
            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                15 yılı aşkın deneyimimizle proje taahhüt, güneş enerji sistemleri, trafo kurulumu ve daha fazlası için güvenilir çözüm ortağınız.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link href="/iletisim">
                  <Button size="lg" className="gap-2 text-base">
                    Ücretsiz Teklif Alın <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/hizmetler">
                  <Button size="lg" variant="secondary" className="gap-2 text-base">
                    Hizmetlerimiz
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-primary text-white py-4">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Shield, text: 'Lisanslı & Sertifikalı' },
              { icon: Clock, text: 'Zamanında Teslimat' },
              { icon: Award, text: '%98 Müşteri Memnuniyeti' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 py-2">
                <item.icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Hizmetlerimiz</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-2">
                Elektrik Mühendisliği <span className="text-primary">Çözümleri</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Endüstriyel, ticari ve konut projeleriniz için kapsamlı elektrik mühendisliği hizmetleri sunuyoruz.
              </p>
            </div>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {SERVICES.map((svc) => {
              const Icon = iconMap[svc?.icon ?? ''] ?? Zap
              return (
                <StaggerItem key={svc.id}>
                  <Link href={`/hizmetler#${svc.id}`}>
                    <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-md">
                      <div className="relative h-40 overflow-hidden">
                        <Image src={svc.image} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 bg-primary rounded-lg p-2">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {svc.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{svc.description}</p>
                        <span className="inline-flex items-center text-primary text-sm font-medium mt-3 gap-1">
                          Detaylar <ChevronRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Rakamlarla <span className="text-primary">SBA Elektronik</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <CounterAnimation end={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Referanslarımız</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-2">
                Güvenen <span className="text-primary">Kurumlar</span>
              </h2>
            </div>
          </FadeIn>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.05}>
            {REFERENCES.map((ref, i) => (
              <StaggerItem key={i}>
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                  <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base">{ref.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{ref.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn delay={0.3}>
            <div className="text-center mt-8">
              <Link href="/referanslar">
                <Button variant="outline" className="gap-2">
                  Tüm Referanslar <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <div className="bg-[#1a1a2e] rounded-xl p-8 md:p-12 text-center text-white">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Projeniz için <span className="text-primary">ücretsiz teklif</span> alın
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Uzman ekibimiz projenizi değerlendirsin ve size en uygun çözümü sunsun.
              </p>
              <Link href="/iletisim">
                <Button size="lg" className="gap-2 text-base">
                  Hemen İletişime Geçin <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
