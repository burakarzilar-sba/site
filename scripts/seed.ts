import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Seed admin user
  const hashedPassword = await bcrypt.hash('johndoe123', 12)
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: { email: 'john@doe.com', name: 'Admin', password: hashedPassword, role: 'admin' },
  })

  // Seed product categories
  const categories = [
    { name: 'Kablolar', slug: 'kablolar', description: 'Elektrik kablolar\u0131 ve iletkenler' },
    { name: 'Panolar', slug: 'panolar', description: 'Elektrik panolar\u0131 ve da\u011f\u0131t\u0131m tablolar\u0131' },
    { name: 'Ayd\u0131nlatma', slug: 'aydinlatma', description: 'LED ve end\u00fcstriyel ayd\u0131nlatma \u00fcr\u00fcnleri' },
    { name: 'Otomasyon', slug: 'otomasyon', description: 'Ak\u0131ll\u0131 ev ve end\u00fcstriyel otomasyon \u00fcr\u00fcnleri' },
  ]

  const createdCategories: any[] = []
  for (const cat of categories) {
    const c = await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    createdCategories.push(c)
  }

  // Seed products
  const products = [
    { name: 'NYY 3x2.5mm\u00b2 Kablo', slug: 'nyy-3x2-5-kablo', description: 'Y\u00fcksek kaliteli yer alt\u0131 kablosu, bina i\u00e7i ve d\u0131\u015f\u0131 kullan\u0131m i\u00e7in uygun.', price: 45, categorySlug: 'kablolar', featured: true },
    { name: 'NYM 3x1.5mm\u00b2 Kablo', slug: 'nym-3x1-5-kablo', description: 'Bina i\u00e7i tesisat kablosu, konut ve ticari binalar i\u00e7in ideal.', price: 28, categorySlug: 'kablolar' },
    { name: 'NHXMH 5x2.5mm\u00b2 Kablo', slug: 'nhxmh-5x2-5-kablo', description: 'Halojensiz, alev iletmeyen g\u00fcvenlik kablosu.', price: 85, categorySlug: 'kablolar' },
    { name: '24 Mod\u00fcl S\u0131va Alt\u0131 Pano', slug: '24-modul-siva-alti-pano', description: 'Kompakt tasar\u0131ml\u0131 24 mod\u00fcll\u00fc s\u0131va alt\u0131 da\u011f\u0131t\u0131m panosu.', price: 320, categorySlug: 'panolar', featured: true },
    { name: '36 Mod\u00fcl S\u0131va \u00dcst\u00fc Pano', slug: '36-modul-siva-ustu-pano', description: 'Kolay montaj i\u00e7in 36 mod\u00fcll\u00fc s\u0131va \u00fcst\u00fc pano.', price: 280, categorySlug: 'panolar' },
    { name: 'LED Panel 60x60 40W', slug: 'led-panel-60x60-40w', description: 'Ofis ve ticari alanlar i\u00e7in y\u00fcksek verimli LED panel ayd\u0131nlatma.', price: 185, categorySlug: 'aydinlatma', featured: true },
    { name: 'LED Projektlr 100W', slug: 'led-projektor-100w', description: 'D\u0131\u015f mekan LED projelt\u00f6r, IP65 koruma s\u0131n\u0131f\u0131.', price: 350, categorySlug: 'aydinlatma' },
    { name: 'Ak\u0131ll\u0131 Priz Wi-Fi', slug: 'akilli-priz-wifi', description: 'Uzaktan kontrol edilebilen Wi-Fi ba\u011flant\u0131l\u0131 ak\u0131ll\u0131 priz.', price: 120, categorySlug: 'otomasyon', featured: true },
    { name: 'Ak\u0131ll\u0131 Termostat', slug: 'akilli-termostat', description: 'Programlanabilir ak\u0131ll\u0131 termostat, enerji tasarrufu sa\u011flar.', price: 450, categorySlug: 'otomasyon' },
    { name: 'Hareket Sens\u00f6r\u00fc', slug: 'hareket-sensoru', description: 'Tavan tipi PIR hareket sens\u00f6r\u00fc, ayd\u0131nlatma otomasyonu i\u00e7in.', price: 75, categorySlug: 'otomasyon' },
  ]

  for (const p of products) {
    const cat = createdCategories.find((c: any) => c.slug === p.categorySlug)
    if (!cat) continue
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        categoryId: cat.id,
        featured: p.featured || false,
      },
    })
  }

  // Seed blog posts
  const blogPosts = [
    {
      title: 'G\u00fcne\u015f Enerji Sistemleri: Yat\u0131r\u0131m Rehberi',
      slug: 'gunes-enerji-sistemleri-yatirim-rehberi',
      excerpt: 'GES yat\u0131r\u0131m\u0131 d\u00fc\u015f\u00fcnenler i\u00e7in kapsaml\u0131 rehber. Maliyet analizi, geri d\u00f6n\u00fc\u015f s\u00fcresi ve dikkat edilmesi gerekenler.',
      category: 'Enerji',
      imageUrl: 'https://sunlightsolar.com/wp-content/uploads/2024/01/commercial-solar-installation.jpeg',
      content: `<h2>G\u00fcne\u015f Enerjisi Neden \u00d6nemli?</h2><p>T\u00fcrkiye, co\u011frafi konumu itibar\u0131yla g\u00fcne\u015f enerjisi potansiyeli y\u00fcksek bir \u00fclkedir. \u00d6zellikle Akdeniz b\u00f6lgesi, y\u0131lda ortalama 2.900 saat g\u00fcne\u015flenme s\u00fcresiyle GES yat\u0131r\u0131mlar\u0131 i\u00e7in idealdir.</p><h2>GES Yat\u0131r\u0131m Maliyetleri</h2><p>2024 y\u0131l\u0131 itibar\u0131yla, 1 kW'l\u0131k bir GES sistemin kurulum maliyeti ortalama 15.000-20.000 TL aras\u0131nda de\u011fi\u015fmektedir. 10 kW'l\u0131k bir \u00e7at\u0131 \u00fcst\u00fc sistem i\u00e7in yakla\u015f\u0131k 150.000-200.000 TL yat\u0131r\u0131m gereklidir.</p><h2>Geri D\u00f6n\u00fc\u015f S\u00fcresi</h2><p>Antalya b\u00f6lgesinde bir GES yat\u0131r\u0131m\u0131n\u0131n geri d\u00f6n\u00fc\u015f s\u00fcresi yakla\u015f\u0131k 4-6 y\u0131ld\u0131r. Sistemlerin \u00f6mr\u00fc 25-30 y\u0131l oldu\u011fu d\u00fc\u015f\u00fcn\u00fcl\u00fcrse, uzun vadede \u00f6nemli tasarruf sa\u011flanmaktad\u0131r.</p><h2>Dikkat Edilmesi Gerekenler</h2><ul><li>\u00c7at\u0131n\u0131n ta\u015f\u0131ma kapasitesi kontrol edilmelidir</li><li>G\u00f6lgeleme analizi yap\u0131lmal\u0131d\u0131r</li><li>Lisanslama s\u00fcre\u00e7leri tamamlanmal\u0131d\u0131r</li><li>Kaliteli panel ve invert\u00f6r se\u00e7imi \u00f6nemlidir</li></ul><p>SBA Elektronik olarak, GES projelerinizde fizibilite \u00e7al\u0131\u015fmas\u0131ndan kuruluma kadar t\u00fcm s\u00fcre\u00e7leri y\u00f6netiyoruz.</p>`,
    },
    {
      title: 'Ak\u0131ll\u0131 Ev Sistemleri ile Enerji Tasarrufu',
      slug: 'akilli-ev-sistemleri-enerji-tasarrufu',
      excerpt: 'Ak\u0131ll\u0131 ev teknolojileri ile enerji t\u00fcketiminizi %30\'a kadar azaltabilirsiniz. \u0130\u015fte detaylar.',
      category: 'Teknoloji',
      imageUrl: 'https://aura.eg/wp-content/uploads/2026/01/Displine_-_News_Install_your_tablet_or_iPad_as_a_smart_home_control_panel_8c7dd6ec-8a1e-4244-a54c-56a846b9b5ea.jpg',
      content: `<h2>Ak\u0131ll\u0131 Ev Nedir?</h2><p>Ak\u0131ll\u0131 ev, evinizin ayd\u0131nlatma, \u0131s\u0131tma, so\u011futma, g\u00fcvenlik ve enerji y\u00f6netimi gibi sistemlerinin otomatik ve uzaktan kontrol edilebilmesidir.</p><h2>Enerji Tasarrufu Nas\u0131l Sa\u011flan\u0131r?</h2><p>Ak\u0131ll\u0131 termostatlar sayesinde evinizin s\u0131cakl\u0131\u011f\u0131 otomatik olarak ayarlan\u0131r. Hareket sens\u00f6rl\u00fc ayd\u0131nlatma sistemleri gereksiz enerji t\u00fcketimini \u00f6nler.</p><h2>Poplar Ak\u0131ll\u0131 Ev \u00c7\u00f6z\u00fcmleri</h2><ul><li>Ak\u0131ll\u0131 ayd\u0131nlatma kontrol\u00fc</li><li>Otomatik perde ve jaluzi sistemleri</li><li>Ak\u0131ll\u0131 termostat ve klima kontrol\u00fc</li><li>G\u00fcvenlik kameralar\u0131 ve alarm sistemleri</li><li>Uzaktan kontroll\u00fc priz ve \u015falterler</li></ul><p>SBA Elektronik, evinizi ak\u0131ll\u0131 eve d\u00f6n\u00fc\u015ft\u00fcrmek i\u00e7in profesyonel \u00e7\u00f6z\u00fcmler sunmaktad\u0131r.</p>`,
    },
    {
      title: 'Elektrik Tesisat\u0131nda G\u00fcvenlik \u0130pu\u00e7lar\u0131',
      slug: 'elektrik-tesisatinda-guvenlik-ipuclari',
      excerpt: 'Ev ve i\u015f yerlerinde elektrik g\u00fcvenli\u011fi i\u00e7in bilmeniz gereken temel kurallar ve \u00f6nlemler.',
      category: 'G\u00fcvenlik',
      content: `<h2>Elektrik G\u00fcvenli\u011fi Neden \u00d6nemli?</h2><p>T\u00fcrkiye'de her y\u0131l y\u00fczlerce elektrik kazas\u0131 meydana gelmektedir. Bu kazalar\u0131n b\u00fcy\u00fck \u00e7o\u011funlu\u011fu basit g\u00fcvenlik \u00f6nlemleriyle \u00f6nlenebilir.</p><h2>Temel G\u00fcvenlik Kurallar\u0131</h2><ul><li>Ka\u00e7ak ak\u0131m r\u00f6lesi (KAR) mutlaka kullan\u0131lmal\u0131d\u0131r</li><li>Topraklama sistemi d\u00fczg\u00fcn \u00e7al\u0131\u015fmal\u0131d\u0131r</li><li>A\u015f\u0131r\u0131 y\u00fck bindirilmemelidir</li><li>Kablolar d\u00fczenli olarak kontrol edilmelidir</li><li>Su ve elektrik bir arada bulunmamal\u0131d\u0131r</li></ul><h2>Periyodik Kontrol</h2><p>Elektrik tesisatlar\u0131n\u0131n y\u0131lda en az bir kez yetkili elektrik m\u00fchendisi taraf\u0131ndan kontrol edilmesi \u00f6nerilir.</p><p>SBA Elektronik olarak, periyodik kontrol ve bak\u0131m hizmetleri sunuyoruz.</p>`,
    },
    {
      title: 'Trafo Bak\u0131m\u0131: Neden \u00d6nemli?',
      slug: 'trafo-bakimi-neden-onemli',
      excerpt: 'Trafolar\u0131n d\u00fczenli bak\u0131m\u0131 enerji verimlili\u011fi ve g\u00fcvenlik a\u00e7\u0131s\u0131ndan kritik \u00f6nem ta\u015f\u0131r.',
      category: 'Enerji',
      imageUrl: 'https://www.michels.us/wp-content/uploads/2022/10/transformer-inside-large-substation-2400x1350-1.webp',
      content: `<h2>Trafo Bak\u0131m\u0131n\u0131n \u00d6nemi</h2><p>Trafolar, elektrik da\u011f\u0131t\u0131m sistemlerinin en kritik bile\u015fenlerindendir. D\u00fczenli bak\u0131m yap\u0131lmad\u0131\u011f\u0131nda ar\u0131za riski artar ve enerji kay\u0131plar\u0131 y\u00fckselir.</p><h2>Bak\u0131m S\u00fcreci</h2><ul><li>Ya\u011f seviyesi ve kalite kontrol\u00fc</li><li>S\u0131cakl\u0131k \u00f6l\u00e7\u00fcmleri</li><li>\u0130zolasyon direnci testleri</li><li>Ba\u011flant\u0131 noktalar\u0131 kontrol\u00fc</li><li>Koruma sistemleri testi</li></ul><h2>Bak\u0131m Periyotlar\u0131</h2><p>Trafolar\u0131n y\u0131lda en az 2 kez bak\u0131m\u0131 yap\u0131lmal\u0131d\u0131r. Y\u00fcksek y\u00fckl\u00fc \u00e7al\u0131\u015fan trafolarda bu periyot 3 aya d\u00fc\u015f\u00fcr\u00fclmelidir.</p><p>SBA Elektronik, trafo kurulumu ve periyodik bak\u0131m hizmetleri sunmaktad\u0131r.</p>`,
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
