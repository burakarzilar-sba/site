export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, message, items } = data ?? {}

    if (!name || !email || !items) {
      return NextResponse.json({ error: 'Gerekli alanlar eksik' }, { status: 400 })
    }

    await prisma.productInquiry.create({
      data: { name, email, phone: phone || null, message: message || null, items },
    })

    try {
      const appUrl = process.env.NEXTAUTH_URL || ''
      let parsedItems: any[] = []
      try { parsedItems = JSON.parse(items) } catch {}
      const itemsList = parsedItems.map((i: any) => `<li>${i?.name ?? ''} x${i?.quantity ?? 1} - ${i?.price ?? 0} \u20ba</li>`).join('')

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">Yeni \u00dcr\u00fcn Talebi</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
            <p><strong>\u00dcr\u00fcnler:</strong></p><ul>${itemsList}</ul>
            ${message ? `<p><strong>Not:</strong> ${message}</p>` : ''}
          </div>
        </div>
      `

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_RN_TALEBI_BILDIRIMI,
          subject: `Yeni \u00dcr\u00fcn Talebi: ${name}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'burakarzilar@gmail.com',
          reply_to: email,
          sender_email: `noreply@${appUrl ? new URL(appUrl).hostname : 'sbaelektronik.com'}`,
          sender_alias: 'SBA Elektronik',
        }),
      })
    } catch (emailErr: any) {
      console.error('Email send error:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Product inquiry error:', error)
    return NextResponse.json({ error: 'Talep g\u00f6nderilemedi' }, { status: 500 })
  }
}
