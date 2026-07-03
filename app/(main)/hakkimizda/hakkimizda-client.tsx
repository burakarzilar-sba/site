'use client'

import Image from 'next/image'
import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { Card } from '@/components/ui/card'
import { Target, Eye, Shield, Award, Users, Lightbulb } from 'lucide-react'

export function HakkimizdaClient() {
  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Hakkımızda</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              SBA Elektronik Elektrik Mühendislik Ltd. Şti. olarak güvenilir çözüm ortağınızız.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <SlideIn from="left" className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/11/careers_in_electrical_engineering.jpg"
                  alt="SBA Elektronik Ekibi"
                  fill
                  className="object-cover"
                />
              </div>
            </SlideIn>
            <SlideIn from="right" className="w-full md:w-1/2">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Hikayemiz</span>
              <h2 className="font-display text-3xl font-bold tracking-tight mt-2 mb-4">15 Yılı Aşkın Deneyim</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SBA Elektronik Elektrik Mühendislik Ltd. Şti., Antalya’nın Kepez ilçesinde kurulmuş olup, elektrik mühendisliği alanında 15 yılı aşkın deneyime sahiptir.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Kuruluşumuzdan bu yana Antalya, Burdur ve Isparta bölgelerinde endüstriyel, ticari ve konut projelerinde yüzlerce başarılı proje tamamladık. Müşteri memnuniyetini her zaman ön planda tutarak, lisanslı ve sertifikalı hizmet anlayışımızla sektörün güvenilir markalarından biri haline geldik.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Güneş enerji sistemlerinden akıllı ev çözümlerine, trafo kurulumundan proje taahhüde kadar geniş bir hizmet yelpazesiyle müşterilerimizin ihtiyaçlarına en uygun çözümleri sunuyoruz.
              </p>
            </SlideIn>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn>
              <Card className="p-8 border-0 shadow-md h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary rounded-lg p-3"><Target className="h-6 w-6 text-white" /></div>
                  <h2 className="font-display text-2xl font-bold">Misyonumuz</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Müşterilerimize en yüksek kalitede elektrik mühendisliği hizmetleri sunarak, güvenli, verimli ve sürdürülebilir enerji çözümleri üretmek. Her projemizde mükemmelliği hedefleyerek, sektörün standartlarını yükselten yenilikçi yaklaşımlar geliştirmek.
                </p>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card className="p-8 border-0 shadow-md h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary rounded-lg p-3"><Eye className="h-6 w-6 text-white" /></div>
                  <h2 className="font-display text-2xl font-bold">Vizyonumuz</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Türkiye’nin Akdeniz bölgesinde elektrik mühendisliği alanında lider firma olmak. Yenilenebilir enerji ve akıllı teknolojiler konusunda öncü çözümler üreterek, sürdürülebilir bir geleceğe katkı sağlamak.
                </p>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold tracking-tight text-center mb-12">
              Neden <span className="text-primary">Biz?</span>
            </h2>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {[
              { icon: Shield, title: 'Güvenilirlik', desc: 'Lisanslı ve sigortalı hizmet anlayışıyla güveninizi kazanıyoruz.' },
              { icon: Award, title: 'Kalite', desc: 'Tüm projelerimizde en yüksek kalite standartlarını uyguluyoruz.' },
              { icon: Users, title: 'Uzman Kadro', desc: 'Deneyimli mühendis ve teknisyenlerden oluşan profesyonel ekip.' },
              { icon: Lightbulb, title: 'Yenilikçilik', desc: 'En son teknolojileri takip ederek modern çözümler sunuyoruz.' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <Card className="p-6 text-center border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
