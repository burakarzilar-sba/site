export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email ve şifre gerekli' }, { status: 400 })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Bu email zaten kayıtlı' }, { status: 400 })
    }
    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({ data: { email, password: hashed, name: name || '' } })
    return NextResponse.json({ id: user.id, email: user.email, name: user.name })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Kayıt işlemi başarısız' }, { status: 500 })
  }
}
