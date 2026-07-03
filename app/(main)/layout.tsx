import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartProvider } from '@/components/cart-provider'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </CartProvider>
  )
}
