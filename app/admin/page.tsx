export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AdminClient } from './admin-client'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/giris')

  const [contacts, inquiries, blogCount, productCount] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.productInquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.blogPost.count(),
    prisma.product.count(),
  ])

  return (
    <AdminClient
      contacts={contacts.map((c: any) => ({ ...c, createdAt: c.createdAt.toISOString() }))}
      inquiries={inquiries.map((i: any) => ({ ...i, createdAt: i.createdAt.toISOString() }))}
      blogCount={blogCount}
      productCount={productCount}
      userName={session?.user?.name ?? session?.user?.email ?? ''}
    />
  )
}
