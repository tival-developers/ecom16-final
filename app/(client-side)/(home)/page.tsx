import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getHomePageProducts } from '@/lib/actions/homepage/getHomePage'
import { ProductPrice } from '@/lib/utils/product-price'
import HeroSection, {
  PromoBannerLarge,
  PromoBannerMini,
} from '@/components/homepage/banner'
import FlashsaleHomepage from '@/components/homepage/flashsale'
import { Truck, ShieldCheck, Gift, Headset } from 'lucide-react'
import ProductCard from '@/components/cards/product-card'
import AddToCartButton from '@/components/ux/cartadd'
import DepartmentSection from '@/components/shared/departmentSection'
import type { Metadata } from 'next'
import { getCategoriesWithProducts } from '@/lib/actions/homepage'
import ProductShowcase from './shopCategories'
import Image from 'next/image'
import Link from 'next/link'
import { ProductType } from '@/lib/types/product'
import AddToFavoriteButton from '@/components/ux/favAdd'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Home',
  description: 'home',
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  title: string
  desc: string
}) {
  return (
    <div className='flex items-center gap-4 p-4 rounded-2xl bg-card border'>
      <div className='p-3 rounded-xl bg-muted'>
        <Icon className='h-6 w-6' />
      </div>
      <div>
        <p className='text-sm font-semibold'>{title}</p>
        <p className='text-xs text-muted-foreground'>{desc}</p>
      </div>
    </div>
  )
}
export default async function HomePage() {
  const { bestSelling, recent, trending, featured } =
    await getHomePageProducts()
  //console.log('jjjjjjjiiiiiiiii', getHomePageProducts)

  const categoriesWithProducts = await getCategoriesWithProducts()

  return (
    <main className='min-h-screen'>
      {/* Department Section for mobile */}
      <div className='flex md:hidden w-full'>
        <DepartmentSection />
      </div>

      {/* Hero Banner */}
      <HeroSection />

      {/* Service Features */}
      <section className='max-w-7xl mx-auto px-4 mt-6 md:mt-8 relative z-10'>
        <div className='hidden md:grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 border-2 border-amber-600 p-2'>
          <Feature
            icon={Truck}
            title='Free Shipping'
            desc='On orders over $50'
          />
          <Feature
            icon={ShieldCheck}
            title='Secure Payment'
            desc='256‑bit encryption'
          />
          <Feature
            icon={Gift}
            title='Special Gifts'
            desc='Save on every order'
          />
          <Feature icon={Headset} title='Support 24/7' desc='Ready to help' />
          <Feature
            icon={ShieldCheck}
            title='30‑Day Return'
            desc='Hassle‑free policy'
          />
        </div>
      </section>

      {/* Recently Added */}
      {recent.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 py-10'>
          <div className='flex items-center justify-between mb-7'>
            <h2 className='text-xl md:text-2xl font-bold'>Recently Added</h2>
            <Button variant='ghost' className='rounded-xl'>
              View all products
            </Button>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {recent.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Promo Mini-Banners */}
      <PromoBannerMini />

      {/* Bestselling Products */}
      {bestSelling.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 py-10'>
          <h2 className='text-2xl font-bold mb-7'>Our Bestselling Products</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {/* {bestSelling.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))} */}
            {bestSelling.map((item) => (
              <Card
                key={item.product._id}
                className='rounded-xl shadow hover:shadow-lg transition'
              >
                <CardContent className='flex flex-col items-center'>
                  <div className='w-46 h-40 rounded mb-3'>
                    <Link href={`/product/${item.product._id}`}>
                      <Image
                        src={item.product.imageUrls?.[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        height={780}
                        width={1000}
                        className='className="relative h-38 p-1 w-full object-cover rounded-xl'
                      />
                    </Link>
                  </div>
                  <div className='p-4 space-y-1.5 relative'>
                    <div>
                      <AddToFavoriteButton
                        variant='icon'
                        product={item.product}
                      />
                    </div>

                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-medium leading-tight line-clamp-2 mr-2'>
                        {item.product.name}
                      </h3>
                      <Badge variant={'secondary'} className='uppercase'>
                        {item.product.brand}
                      </Badge>
                    </div>
                    <ProductPrice
                      originalPrice={item.product.originalPrice}
                      newPrice={item.product.newPrice}
                    />

                    <AddToCartButton product={item.product} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Featured Deals */}
      {featured.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 py-10'>
          <h2 className='text-xl md:text-2xl font-bold mb-7'>Featured Deals</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {featured.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Trending This Week */}
      {trending.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 py-10'>
          <h2 className='text-xl md:text-2xl font-bold mb-7'>
            Trending This Week
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {trending.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Flashsales */}
      <FlashsaleHomepage />

      {/* Shop by categories */}
      <ProductShowcase categoriesWithProducts={categoriesWithProducts} />

      {/* Promo Banner */}
      <PromoBannerLarge />
    </main>
  )
}
