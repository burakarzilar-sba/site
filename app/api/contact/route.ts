export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, subject, message } = data ?? {}

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Gerekli alanlar eksik' }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, subject: subject || null, message },
    })

    // Send email notification
    try {
      const appUrl = process.env.NEXTAUTH_URL || ''
      const appName = appUrl ? new URL(appUrl).hostname.split('.')[0] : 'SBA Elektronik'

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">Yeni \u0130leti\u015fim Formu</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>E-posta:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
            ${subject ? `<p><strong>Konu:</strong> ${subject}</p>` : ''}
            <p><strong>Mesaj:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #e67e22;">${message}</div>
          </div>
        </div>
      `

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_LETIIM_FORMU_BILDIRIMI,
          subject: `Yeni \u0130leti\u015fim: ${name} - ${subject || 'Genel'}`,
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
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Mesaj g\u00f6nderilemedi' }, { status: 500 })
  }
}
