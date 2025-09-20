'use client'
import CountdownTimer from '@/components/countdown'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Trash2 } from 'lucide-react'
import { useFlashSaleStore } from '@/stores/FlashSale'
import { formatDuration, intervalToDuration } from 'date-fns'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/db/essentials/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import Image from 'next/image'

const FormSchema = z.object({
  startAt: z.date({ required_error: 'Start date is required.' }),
  endAt: z.date({ required_error: 'End date is required.' }),
})

interface Product {
  _id: string
  name: string
  imageUrls: string
  originalPrice: number
  startAt: Date
  endAt: Date
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(value)

export default function FlashSaleManager() {
  const { items, fetchFlashSaleItems, addFlashSaleItem, deleteFlashSaleItem } =
    useFlashSaleStore()

  const [productId, setProductId] = useState('')
  const [name, setName] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountAmount, setDiscountAmount] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [imageUrls, setImageUrl] = useState('')
  const [duration, setDuration] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const original = parseFloat(originalPrice)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startAt: undefined,
      endAt: undefined,
    },
  })

  const { watch } = form
  const startAt = watch('startAt')
  const endAt = watch('endAt')

  useEffect(() => {
    fetchFlashSaleItems()
  }, [fetchFlashSaleItems])

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }

    let cancelled = false
    async function fetchProducts() {
      try {
        const res = await fetch(
          `/api/products/search?search=${encodeURIComponent(searchQuery)}`
        )
        if (!res.ok) throw new Error('Failed to fetch products')
        const data: Product[] = await res.json()
        if (!cancelled) setSearchResults(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchProducts()
    return () => {
      cancelled = true
    }
  }, [searchQuery])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (startAt && endAt) {
      const duration = intervalToDuration({
        start: new Date(startAt),
        end: new Date(endAt),
      })
      setDuration(formatDuration(duration))
    }
  }, [startAt, endAt])

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!productId) errs.productId = 'Select a product'
    if (!newPrice || isNaN(Number(newPrice)))
      errs.newPrice = 'Enter valid new price'
    if (items.find((item) => item.productId === productId))
      errs.duplicate = 'Product already in promo list'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSelect = (product: Product) => {
    setProductId(product._id)
    setName(product.name)
    setOriginalPrice(product.originalPrice.toString())
    setNewPrice('')
    setDiscountAmount('')
    setDiscountPercent('')
    setImageUrl(product.imageUrls)
    setSearchQuery(product.name)
    setShowDropdown(false)
    setErrors({})
    form.reset()
    setDuration('')
  }

  const handleAdd = async () => {
    if (!validate() || items.length >= 10) return

    try {
      await addFlashSaleItem({
        productId,
        name,
        originalPrice: Number(originalPrice),
        price: Number(newPrice),
        imageUrls,
        startAt,
        endAt,
        discountPercent: parseFloat(discountPercent),
      })
      await fetchFlashSaleItems()

      setProductId('')
      setName('')
      setOriginalPrice('')
      setDiscountAmount('')
      setDiscountPercent('')
      setNewPrice('')
      setImageUrl('')
      setSearchQuery('')
      setSearchResults([])
      setErrors({})
      form.reset()
      setDuration('')
    } catch (err) {
      console.error(err)
    }
  }

  const onDiscountAmountChange = (val: string) => {
    setDiscountAmount(val)
    const d = parseFloat(val)
    if (!isNaN(d) && original) {
      const newP = original - d
      const percent = (d / original) * 100
      setNewPrice(newP.toFixed(2))
      setDiscountPercent(percent.toFixed(2))
    }
  }

  const onDiscountPercentChange = (val: string) => {
    setDiscountPercent(val)
    const p = parseFloat(val)
    if (!isNaN(p) && original) {
      const d = (p / 100) * original
      const newP = original - d
      setDiscountAmount(d.toFixed(2))
      setNewPrice(newP.toFixed(2))
    }
  }

  const renderDatePicker = (name: 'startAt' | 'endAt', label: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel className='mb-1 font-medium'>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                disabled={(date) => date < new Date()} // ⬅ disable past dates
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Flash Sale Items</h1>

      <Card
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 relative p-4'
        ref={containerRef}
      >
        <div className='col-span-1 sm:col-span-2 md:col-span-4'>
          <label className='block mb-1 font-medium'>Search product</label>
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowDropdown(true)
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder='Search product...'
          />
          {showDropdown && searchResults.length > 0 && (
            <ul className='absolute z-20 bg-white border rounded w-full max-h-48 overflow-auto shadow-md'>
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  className='p-2 cursor-pointer hover:bg-blue-100'
                  onClick={() => handleSelect(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className='block mb-1 font-medium'>Original Price</label>
          <Input value={formatPrice(Number(originalPrice))} readOnly />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Discount Amount</label>
          <Input
            type='number'
            placeholder='e.g. 200'
            value={discountAmount}
            onChange={(e) => onDiscountAmountChange(e.target.value)}
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Discount %</label>
          <Input
            type='number'
            placeholder='e.g. 20'
            value={discountPercent}
            onChange={(e) => onDiscountPercentChange(e.target.value)}
          />
        </div>

        <div className='col-span-1 sm:col-span-2 '>
          <Form {...form}>
            <form className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {renderDatePicker('startAt', 'Start Date')}
              {renderDatePicker('endAt', 'End Date')}
            </form>
          </Form>
        </div>

        <div>
          <label className='block mb-1 font-medium'>Duration</label>
          <Input type='text' placeholder='duration' value={duration} />
        </div>

        {errors.duplicate && (
          <p className='text-red-600 col-span-1 sm:col-span-2 md:col-span-4'>
            {errors.duplicate}
          </p>
        )}

        <div className='col-span-1 sm:col-span-2 md:col-span-4'>
          <Button
            onClick={handleAdd}
            disabled={
              !productId ||
              !newPrice ||
              items.length >= 10 ||
              Object.keys(errors).length > 0
            }
            className='w-full'
          >
            Add to Flash Sale
          </Button>
        </div>
      </Card>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {items.map((item) => {
          const discount = item.originalPrice - item.price
          const percent = ((discount / item.originalPrice) * 100).toFixed(1)
          return (
            <Card key={item._id} className='relative'>
              <CardContent className='p-4 space-y-2'>
                <div className='relative w-full aspect-[3/3]'>
                  <Image
                    src={item.imageUrls}
                    alt={item.name}
                    fill
                    className='object-contain'
                  />
                </div>
                <h2 className='font-semibold'>{item.name}</h2>
                <p className='text-sm text-gray-500 line-through'>
                  {formatPrice(item.originalPrice)}
                </p>
                <p className='text-lg font-bold text-green-600'>
                  {formatPrice(item.price)} ({percent}% OFF)
                </p>
                <div>
                  <span className='text-xs text-muted-foreground'>
                    Ends in:
                  </span>
                  <CountdownTimer startAt={item.startAt} endAt={item.endAt} />
                </div>
                <Button
                  variant='destructive'
                  size='sm'
                  className='absolute top-2 right-2'
                  onClick={() => deleteFlashSaleItem(item._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
