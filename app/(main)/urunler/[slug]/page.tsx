export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ProductDetailClient } from './product-detail-client'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug }, include: { category: true } })
  if (!product) return { title: 'Ürün Bulunamadı' }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  })
  if (!product) notFound()

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, inStock: true },
    take: 4,
  })

  const serialized = {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    category: { ...product.category, createdAt: product.category.createdAt.toISOString() },
  }

  const relatedSerialized = related.map((r: any) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }))

  return <ProductDetailClient product={serialized} related={relatedSerialized} />
}
