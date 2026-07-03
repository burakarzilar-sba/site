export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { BlogClient } from './blog-client'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'SBA Elektronik blog - Elektrik mühendisliği, GES, akıllı ev sistemleri ve enerji sektörü hakkında yazılar.',
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  const serialized = posts.map((p: any) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

  return <BlogClient posts={serialized} />
}
