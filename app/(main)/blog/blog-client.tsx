'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { Calendar, ArrowRight, BookOpen } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  imageUrl: string | null
  category: string
  createdAt: string
}

export function BlogClient({ posts }: { posts: BlogPost[] }) {
  const categories = ['Tümü', ...Array.from(new Set((posts ?? []).map((p: BlogPost) => p?.category ?? '')))]
  const [active, setActive] = useState('Tümü')

  const filtered = active === 'Tümü' ? (posts ?? []) : (posts ?? []).filter((p: BlogPost) => p?.category === active)

  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Elektrik mühendisliği ve enerji sektörü hakkında güncel yazılar.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((cat: string) => (
                <Button
                  key={cat}
                  variant={active === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </FadeIn>

          {(filtered?.length ?? 0) === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Henüz blog yazısı yok.</p>
              </div>
            </FadeIn>
          ) : (
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
              {filtered.map((post: BlogPost) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-md">
                      {post.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString('tr-TR', { timeZone: 'UTC' })}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.excerpt}</p>
                        <span className="inline-flex items-center text-primary text-sm font-medium gap-1">
                          Devamını Oku <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </>
  )
}
