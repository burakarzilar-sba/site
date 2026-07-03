'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FadeIn } from '@/components/ui/animate'
import { LogOut, Mail, ShoppingCart, FileText, Package, Home } from 'lucide-react'

interface Contact { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; status: string; createdAt: string }
interface Inquiry { id: string; name: string; email: string; phone: string | null; message: string | null; items: string; status: string; createdAt: string }

export function AdminClient({ contacts, inquiries, blogCount, productCount, userName }: {
  contacts: Contact[]; inquiries: Inquiry[]; blogCount: number; productCount: number; userName: string
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-[1200px] px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <div className="relative h-8 w-32">
              <Image src="/images/logo-horizontal.png" alt="Logo" fill className="object-contain object-left" />
            </div>
            <span className="text-sm text-muted-foreground">Y\u00f6netim Paneli</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/"><Button variant="ghost" size="sm" className="gap-1"><Home className="h-4 w-4" /> Siteye Git</Button></Link>
            <span className="text-sm">{userName}</span>
            <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: '/giris' })} className="gap-1"><LogOut className="h-4 w-4" /> \u00c7\u0131k\u0131\u015f</Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Mesajlar', value: contacts?.length ?? 0, icon: Mail, color: 'text-blue-500' },
              { label: '\u00dcr\u00fcn Talepleri', value: inquiries?.length ?? 0, icon: ShoppingCart, color: 'text-green-500' },
              { label: 'Blog Yaz\u0131lar\u0131', value: blogCount ?? 0, icon: FileText, color: 'text-purple-500' },
              { label: '\u00dcr\u00fcnler', value: productCount ?? 0, icon: Package, color: 'text-orange-500' },
            ].map((stat, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-4 flex items-center gap-3">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        <Tabs defaultValue="contacts">
          <TabsList>
            <TabsTrigger value="contacts">\u0130leti\u015fim Mesajlar\u0131</TabsTrigger>
            <TabsTrigger value="inquiries">\u00dcr\u00fcn Talepleri</TabsTrigger>
          </TabsList>
          <TabsContent value="contacts" className="mt-4">
            <div className="space-y-3">
              {(contacts ?? []).map((c: Contact) => (
                <Card key={c.id} className="p-4 border-0 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{c.name}</h3>
                        <Badge variant={c.status === 'unread' ? 'default' : 'secondary'} className="text-xs">{c.status === 'unread' ? 'Yeni' : 'Okundu'}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{c.email} {c.phone ? `\u2022 ${c.phone}` : ''}</p>
                      {c.subject && <p className="text-sm font-medium mt-1">{c.subject}</p>}
                      <p className="text-sm mt-1">{c.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{new Date(c.createdAt).toLocaleDateString('tr-TR', { timeZone: 'UTC' })}</span>
                  </div>
                </Card>
              ))}
              {(contacts?.length ?? 0) === 0 && <p className="text-center text-muted-foreground py-8">Hen\u00fcz mesaj yok.</p>}
            </div>
          </TabsContent>
          <TabsContent value="inquiries" className="mt-4">
            <div className="space-y-3">
              {(inquiries ?? []).map((inq: Inquiry) => {
                let parsedItems: any[] = []
                try { parsedItems = JSON.parse(inq.items ?? '[]') } catch {}
                return (
                  <Card key={inq.id} className="p-4 border-0 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{inq.name}</h3>
                          <Badge variant={inq.status === 'pending' ? 'default' : 'secondary'} className="text-xs">{inq.status === 'pending' ? 'Bekliyor' : inq.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{inq.email} {inq.phone ? `\u2022 ${inq.phone}` : ''}</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium">\u00dcr\u00fcnler:</p>
                          <ul className="text-sm text-muted-foreground">
                            {parsedItems.map((item: any, idx: number) => (
                              <li key={idx}>{item?.name ?? ''} x{item?.quantity ?? 1} - {item?.price ?? 0} \u20ba</li>
                            ))}
                          </ul>
                        </div>
                        {inq.message && <p className="text-sm mt-1"><strong>Not:</strong> {inq.message}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{new Date(inq.createdAt).toLocaleDateString('tr-TR', { timeZone: 'UTC' })}</span>
                    </div>
                  </Card>
                )
              })}
              {(inquiries?.length ?? 0) === 0 && <p className="text-center text-muted-foreground py-8">Hen\u00fcz talep yok.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
