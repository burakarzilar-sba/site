'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { FadeIn } from '@/components/ui/animate'
import { useCart } from '@/components/cart-provider'
import { Trash2, Plus, Minus, ShoppingCart, Send, CheckCircle, Package, ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function SepetClient() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()
  const [showForm, setShowForm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) { toast.error('Ad ve e-posta gerekli.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/product-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: JSON.stringify(items) }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      clearCart()
      toast.success('Talebiniz gönderildi!')
    } catch { toast.error('Gönderilemedi.') }
    finally { setLoading(false) }
  }

  if (success) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-[600px] px-4 text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold mb-2">Talebiniz Alındı!</h1>
          <p className="text-muted-foreground mb-6">En kısa sürede fiyat teklifi ile dönüş yapacağız.</p>
          <Link href="/urunler"><Button>Ürünlere Dön</Button></Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-[#1a1a2e] text-white py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <FadeIn>
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8" />
              <h1 className="font-display text-3xl font-bold">Sepetiniz</h1>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          {(items?.length ?? 0) === 0 ? (
            <div className="text-center py-20">
              <Package className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Sepetiniz boş</h2>
              <p className="text-muted-foreground mb-6">Ürün eklemek için kataloğumuza göz atın.</p>
              <Link href="/urunler"><Button className="gap-2"><ArrowLeft className="h-4 w-4" /> Ürünlere Git</Button></Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {(items ?? []).map((item: any) => (
                  <Card key={item.id} className="p-4 flex items-center gap-4 border-0 shadow-md">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full"><Package className="h-8 w-8 text-muted-foreground" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{item.name}</h3>
                      <p className="text-primary font-bold">{item.price?.toLocaleString?.('tr-TR') ?? '0'} ₺</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, (item.quantity ?? 1) - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity ?? 0}</span>
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, (item.quantity ?? 1) + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>

              <div>
                <Card className="p-6 border-0 shadow-md sticky top-20">
                  <h3 className="font-display font-semibold text-lg mb-4">Sipariş Özeti</h3>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Toplam Ürün</span>
                    <span>{items?.length ?? 0} kalem</span>
                  </div>
                  <div className="flex justify-between mb-4 text-lg font-bold">
                    <span>Toplam</span>
                    <span className="text-primary">{totalPrice?.toLocaleString?.('tr-TR') ?? '0'} ₺</span>
                  </div>
                  {!showForm ? (
                    <Button className="w-full gap-2" onClick={() => setShowForm(true)}>
                      <Send className="h-4 w-4" /> Teklif Talep Et
                    </Button>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div><Label>Ad Soyad *</Label><Input value={form.name} onChange={(e: any) => setForm({...form, name: e.target.value})} className="mt-1" /></div>
                      <div><Label>E-posta *</Label><Input type="email" value={form.email} onChange={(e: any) => setForm({...form, email: e.target.value})} className="mt-1" /></div>
                      <div><Label>Telefon</Label><Input value={form.phone} onChange={(e: any) => setForm({...form, phone: e.target.value})} className="mt-1" /></div>
                      <div><Label>Not</Label><Textarea value={form.message} onChange={(e: any) => setForm({...form, message: e.target.value})} rows={3} className="mt-1" /></div>
                      <Button type="submit" disabled={loading} className="w-full gap-2">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        {loading ? 'Gönderiliyor...' : 'Talebi Gönder'}
                      </Button>
                    </form>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
