'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'

export function GirisClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) {
        toast.error('Ge\u00e7ersiz e-posta veya \u015fifre')
      } else {
        router.replace('/admin')
      }
    } catch {
      toast.error('Giri\u015f ba\u015far\u0131s\u0131z')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="relative h-12 w-40 mx-auto mb-4">
            <Image src="/images/logo-horizontal.png" alt="SBA Elektronik" fill className="object-contain" />
          </div>
          <h1 className="font-display text-2xl font-bold">Y\u00f6netim Paneli</h1>
          <p className="text-sm text-muted-foreground">Giri\u015f yap\u0131n</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label>E-posta</Label><Input type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} className="mt-1" /></div>
          <div><Label>\u015eifre</Label><Input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} className="mt-1" /></div>
          <Button type="submit" disabled={loading} className="w-full gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Giri\u015f Yap
          </Button>
        </form>
      </Card>
    </div>
  )
}
