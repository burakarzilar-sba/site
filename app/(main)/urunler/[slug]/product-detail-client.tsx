'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn, SlideIn } from '@/components/ui/animate'
import { useCart } from '@/components/cart-provider'
import { ArrowLeft, ShoppingCart, Package, Plus, Check, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

interface ProductDetail {
  id: string
  name: string
  slug: string
  description: string
  price: number
  imageUrl: string | null
  featured: boolean
  inStock: boolean
  category: { name: string; slug: string }
}

interface RelatedProduct {
  id: string
  name: string
  slug: string
  price: number
  imageUrl: string | null
}

export function ProductDetailClient({ product, related }: { product: ProductDetail; related: RelatedProduct[] }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl })
    setAdded(true)
    toast.success(`${product.name} sepete eklendi!`)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-8">
        <div className="mx-auto max-w-[1200px] px-4">
          <Link href="/urunler">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white gap-2">
              <ArrowLeft className="h-4 w-4" /> Ürünlere Dön
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SlideIn from="left">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg bg-muted">
                {product?.imageUrl ? (
                  <Image src={product.imageUrl} alt={product?.name ?? ''} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full"><Package className="h-20 w-20 text-muted-foreground" /></div>
                )}
              </div>
            </SlideIn>
            <SlideIn from="right">
              <div>
                <Badge variant="secondary" className="mb-2">{product?.category?.name ?? ''}</Badge>
                <h1 className="font-display text-3xl font-bold tracking-tight mb-4">{product?.name ?? ''}</h1>
                <p className="text-muted-foreground leading-relaxed mb-6">{product?.description ?? ''}</p>
                <div className="text-3xl font-bold text-primary mb-6">
                  {product?.price?.toLocaleString?.('tr-TR') ?? '0'} ₺
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" onClick={handleAdd} className="gap-2">
                    {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    {added ? 'Sepete Eklendi' : 'Sepete Ekle'}
                  </Button>
                  <Link href="/iletisim">
                    <Button size="lg" variant="outline" className="gap-2">
                      <Phone className="h-5 w-5" /> Fiyat Sorun
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Not:</strong> Toplu alımlarda özel fiyat teklifi için bizimle iletişime geçin.
                    Sepete eklediğiniz ürünler için talep formu oluşturabilirsiniz.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>

          {(related?.length ?? 0) > 0 && (
            <div className="mt-16">
              <FadeIn>
                <h2 className="font-display text-2xl font-bold tracking-tight mb-6">Benzer Ürünler</h2>
              </FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(related ?? []).map((r: RelatedProduct) => (
                  <FadeIn key={r.id}>
                    <Link href={`/urunler/${r.slug}`}>
                      <Card className="group hover:shadow-lg transition-all border-0 shadow-md overflow-hidden">
                        <div className="relative h-36 bg-muted">
                          {r.imageUrl ? (
                            <Image src={r.imageUrl} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                          ) : (
                            <div className="flex items-center justify-center h-full"><Package className="h-8 w-8 text-muted-foreground" /></div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary">{r.name}</h3>
                          <p className="text-primary font-bold text-sm mt-1">{r.price?.toLocaleString?.('tr-TR') ?? '0'} ₺</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
