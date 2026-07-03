'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeIn } from '@/components/ui/animate'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string | null
  category: string
  createdAt: string
}

export function BlogDetailClient({ post }: { post: Post }) {
  const handleShare = async () => {
    try {
      if (navigator?.share) {
        await navigator.share({ title: post?.title ?? '', url: window?.location?.href ?? '' })
      } else {
        await navigator?.clipboard?.writeText?.(window?.location?.href ?? '')
        toast.success('Link kopyalandı!')
      }
    } catch {}
  }

  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-12">
        <div className="mx-auto max-w-[800px] px-4">
          <FadeIn>
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white mb-4 gap-2">
                <ArrowLeft className="h-4 w-4" /> Blog'a Dön
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/20 text-primary border-primary/30">{post?.category ?? ''}</Badge>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post?.createdAt ?? '').toLocaleDateString('tr-TR', { timeZone: 'UTC' })}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{post?.title ?? ''}</h1>
          </FadeIn>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[800px] px-4">
          {post?.imageUrl && (
            <FadeIn>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
                <Image src={post.imageUrl} alt={post?.title ?? ''} fill className="object-cover" />
              </div>
            </FadeIn>
          )}
          <FadeIn>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post?.content ?? '' }} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Link href="/blog">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Diğer Yazılar
                </Button>
              </Link>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" /> Paylaş
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
