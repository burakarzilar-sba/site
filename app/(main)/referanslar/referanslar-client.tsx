'use client'

import { Card } from '@/components/ui/card'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { REFERENCES } from '@/lib/constants'
import { Building2, CheckCircle, Star } from 'lucide-react'

const projects = [
  { client: 'Galeri Kristal', project: 'Otel Elektrik Tesisatı', desc: 'Tüm otel zincirinin elektrik altyapısı ve otomasyon sistemlerinin kurulumu', type: 'Otelcilik' },
  { client: 'Öztiryakiler', project: 'Endüstriyel Tesis Elektriği', desc: 'Endüstriyel mutfak ekipmanları üretim tesisinin komple elektrik projesi', type: 'Endüstriyel' },
  { client: 'Ankutsan', project: 'Fabrika Enerji Sistemi', desc: 'Fabrika binası için trafo kurulumu ve enerji dağıtım sistemi', type: 'Endüstriyel' },
  { client: 'Antalya İl Göç İdaresi', project: 'Kamu Binası Elektrifikasyonu', desc: 'Kamu binasının elektrik altyapısı yenileme ve modernizasyon projesi', type: 'Kamu' },
  { client: 'A101', project: 'Mağaza Elektrik Sistemleri', desc: 'Çok sayıda A101 mağazasının elektrik tesisat ve aydınlatma sistemleri', type: 'Perakende' },
  { client: 'Ada Tarım', project: 'Tarımsal Tesis GES Kurulumu', desc: 'Tarımsal üretim tesisi için güneş enerji sistemi ve elektrik altyapısı', type: 'Tarım' },
  { client: 'Seashell Otel', project: 'Otel Akıllı Sistemler', desc: 'Oda otomasyon sistemleri, enerji yönetimi ve akıllı aydınlatma kurulumu', type: 'Otelcilik' },
]

export function ReferanslarClient() {
  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Referanslarımız</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Güvenilir hizmet anlayışımızla pek çok kurumsal müşteriye hizmet verdik.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">
              Tamamlanan <span className="text-primary">Projeler</span>
            </h2>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {projects.map((p, i) => (
              <StaggerItem key={i}>
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">{p.type}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-1">{p.project}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{p.client}</p>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">
              Müşterilerimiz
            </h2>
          </FadeIn>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.05}>
            {REFERENCES.map((ref, i) => (
              <StaggerItem key={i}>
                <Card className="text-center p-6 hover:shadow-lg transition-all border-0 shadow-md">
                  <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold">{ref.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{ref.desc}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">Tamamlandı</span>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
