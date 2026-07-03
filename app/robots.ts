import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  const headersList = headers()
  const host = headersList.get('x-forwarded-host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/giris'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
