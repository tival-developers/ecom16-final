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
    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 p-0.5 md:p-3 rounded-2xl bg-slate-50 border'>
      <div className='p-1 rounded-xl bg-muted flex-shrink-0'>
        <Icon className='h-6 w-6 text-amber-600' />
      </div>
      <div className='text-center sm:text-left'>
        <p className='text-sm md:text-base font-semibold'>{title}</p>
        <p className='text-xs md:text-sm text-muted-foreground'>{desc}</p>
      </div>
    </div>
  )
}
export default async function HomePage() {
  const { bestSelling, recent, trending, featured } =
    await getHomePageProducts()

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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4  p-2 md:p-4 rounded-lg'>
          <Feature
            icon={Truck}
            title='Free Shipping'
            desc='On orders over Ksh 30,000'
          />
          <Feature
            icon={ShieldCheck}
            title='Secure Payment'
            desc='256-bit encryption'
          />
          <Feature
            icon={Gift}
            title='Special Gifts'
            desc='Save on every order'
          />
          <Feature icon={Headset} title='Support 24/7' desc='Ready to help' />
          <Feature
            icon={ShieldCheck}
            title='30-Day Return'
            desc='Hassle-free policy'
          />
        </div>
      </section>

      {/* Recently Added */}
      {recent.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 py-10'>
          <div className='text-center mb-7'>
            <h2 className=' text-2xl font-bold text-amber-600  p-2'>
              Recently <span className='text-black'>Added</span>
            </h2>
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
          <div className=' text-center mb-7'>
            <h2 className=' text-2xl font-bold text-amber-600  p-2'>
              Bestselling <span className='text-black'> Products</span>
            </h2>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {bestSelling.map((item) => (
              <Card
                key={item.product._id}
                className='hover:shadow-lg transition-shadow rounded-2xl overflow-hidden'
              >
                <CardContent className='p-0'>
                  <div className=' bg-muted/30'>
                    <Link href={`/product/${item.product._id}`}>
                      <Image
                        src={item.product.imageUrls?.[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        width={1000}
                        height={800}
                        className='h-full w-full object-cover'
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
                    <p className='text-muted-foreground text-sm'>
                      Stock: {item.product.stock}
                    </p>
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
          <div className='text-center mb-7'>
            <h2 className=' text-2xl font-bold text-amber-600  p-2'>
              Featured <span className='text-black'>Deals</span>
            </h2>
          </div>
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
          <div className='text-center mb-7'>
            <h2 className=' text-2xl font-bold text-amber-600  p-2'>
              Trending <span className='text-black'>Products</span>
            </h2>
          </div>
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
