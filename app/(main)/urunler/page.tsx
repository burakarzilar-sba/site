export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { UrunlerClient } from './urunler-client'

export const metadata: Metadata = {
  title: 'Ürünler',
  description: 'SBA Elektronik ürün kataloğu - Elektrik malzemeleri, kablolar, panolar ve daha fazlası.',
}

export default async function UrunlerPage() {
  const categories = await prisma.productCategory.findMany({
    include: { products: { where: { inStock: true }, orderBy: { createdAt: 'desc' } } },
    orderBy: { name: 'asc' },
  })

  const serialized = categories.map((c: any) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    products: (c.products ?? []).map((p: any) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    })),
  }))

  return <UrunlerClient categories={serialized} />
}
