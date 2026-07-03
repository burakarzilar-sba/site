'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { useCart } from '@/components/cart-provider'
import { ShoppingCart, Package, Plus, Check } from 'lucide-react'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  imageUrl: string | null
  featured: boolean
  inStock: boolean
}

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  products: Product[]
}

export function UrunlerClient({ categories }: { categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const { addItem, totalItems } = useCart()
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())

  const allProducts = (categories ?? []).flatMap((c: Category) => (c?.products ?? []).map((p: Product) => ({ ...p, categoryName: c.name })))
  const filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter((p: any) => {
        const cat = (categories ?? []).find((c: Category) => c.id === activeCategory)
        return cat ? (cat.products ?? []).some((cp: Product) => cp.id === p.id) : false
      })

  const handleAdd = (product: Product) => {
    addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl })
    setAddedIds((prev) => new Set(prev).add(product.id))
    toast.success(`${product.name} sepete eklendi!`)
    setTimeout(() => setAddedIds((prev) => { const n = new Set(prev); n.delete(product.id); return n }), 2000)
  }

  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex items-center justify-between">
            <FadeIn>
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Ürünlerimiz</h1>
                <p className="text-gray-300 max-w-2xl text-lg">
                  Kaliteli elektrik malzemeleri ve ekipmanları.
                </p>
              </div>
            </FadeIn>
            <Link href="/urunler/sepet">
              <Button variant="secondary" className="gap-2 relative">
                <ShoppingCart className="h-5 w-5" />
                Sepet
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory('all')}
              >
                Tüm Ürünler
              </Button>
              {(categories ?? []).map((cat: Category) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </FadeIn>

          {(filteredProducts?.length ?? 0) === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Bu kategoride ürün bulunamadı.</p>
              </div>
            </FadeIn>
          ) : (
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.06}>
              {filteredProducts.map((product: any) => (
                <StaggerItem key={product.id}>
                  <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-md">
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {product.imageUrl ? (
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex items-center justify-center h-full"><Package className="h-12 w-12 text-muted-foreground" /></div>
                      )}
                      {product.featured && (
                        <Badge className="absolute top-2 left-2 bg-primary">Öne Çıkan</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{product.categoryName}</p>
                      <Link href={`/urunler/${product.slug}`}>
                        <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-primary">
                          {product.price?.toLocaleString?.('tr-TR') ?? '0'} ₺
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleAdd(product)}
                          className="gap-1"
                          variant={addedIds.has(product.id) ? 'secondary' : 'default'}
                        >
                          {addedIds.has(product.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          {addedIds.has(product.id) ? 'Eklendi' : 'Ekle'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </>
  )
}
