'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { FadeIn, SlideIn } from '@/components/ui/animate'
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_FULL_ADDRESS } from '@/lib/constants'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function IletisimClient() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Lütfen gerekli alanları doldurun.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Gönderilemedi')
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      toast.success('Mesajınız başarıyla gönderildi!')
    } catch {
      toast.error('Mesaj gönderilirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">İletişim</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Projeleriniz için bize ulaşın, ücretsiz teklif alın.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SlideIn from="left" className="lg:col-span-2">
              <Card className="p-8 border-0 shadow-md">
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="font-display text-2xl font-bold mb-2">Mesajınız Alındı!</h2>
                    <p className="text-muted-foreground mb-6">En kısa sürede size dönüş yapacağız.</p>
                    <Button onClick={() => setSuccess(false)}>Yeni Mesaj Gönder</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="font-display text-2xl font-bold mb-2">Bize Ulaşın</h2>
                    <p className="text-sm text-muted-foreground mb-4">* ile işaretli alanlar zorunludur.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Ad Soyad *</Label>
                        <Input id="name" value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} placeholder="Adınız" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">E-posta *</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} placeholder="ornek@email.com" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" value={form.phone} onChange={(e: any) => setForm({ ...form, phone: e.target.value })} placeholder="+90 5xx xxx xx xx" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="subject">Konu</Label>
                        <Input id="subject" value={form.subject} onChange={(e: any) => setForm({ ...form, subject: e.target.value })} placeholder="Proje taahhüt, GES, vb." className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Mesajınız *</Label>
                      <Textarea id="message" value={form.message} onChange={(e: any) => setForm({ ...form, message: e.target.value })} placeholder="Projeniz hakkında bilgi verin..." rows={5} className="mt-1" />
                    </div>
                    <Button type="submit" disabled={loading} className="gap-2 w-full md:w-auto">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Bilgileriniz gizli tutulacaktır.</p>
                  </form>
                )}
              </Card>
            </SlideIn>

            <SlideIn from="right">
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-md">
                  <h3 className="font-display font-semibold text-lg mb-4">İletişim Bilgileri</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-lg p-2"><MapPin className="h-5 w-5 text-primary" /></div>
                      <div>
                        <p className="font-medium text-sm">Adres</p>
                        <p className="text-sm text-muted-foreground">{COMPANY_FULL_ADDRESS}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-lg p-2"><Phone className="h-5 w-5 text-primary" /></div>
                      <div>
                        <p className="font-medium text-sm">Telefon</p>
                        <a href={`tel:${COMPANY_PHONE}`} className="text-sm text-primary hover:underline">{COMPANY_PHONE}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-lg p-2"><Mail className="h-5 w-5 text-primary" /></div>
                      <div>
                        <p className="font-medium text-sm">E-posta</p>
                        <a href={`mailto:${COMPANY_EMAIL}`} className="text-sm text-primary hover:underline">{COMPANY_EMAIL}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-lg p-2"><Clock className="h-5 w-5 text-primary" /></div>
                      <div>
                        <p className="font-medium text-sm">Çalışma Saatleri</p>
                        <p className="text-sm text-muted-foreground">Pazartesi - Cuma: 08:00 - 18:00</p>
                        <p className="text-sm text-muted-foreground">Cumartesi: 09:00 - 14:00</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-0 border-0 shadow-md overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51100.0!2d30.6!3d36.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39a5e1f44f015%3A0xf24e62e7b6e0a8a4!2sKepez%2FAntalya!5e0!3m2!1str!2str!4v1700000000000"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SBA Elektronik Konum"
                  />
                </Card>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  )
}
