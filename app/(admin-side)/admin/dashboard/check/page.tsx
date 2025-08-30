'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getCategories } from '@/lib/actions/category'
import CreateProduct from '../products/create/page'

export default function AddProductForm() {
  const [categories, setCategories] = useState<any[]>([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    variations: {} as Record<string, string>,
    stock: 0,
    brand: '',
    serialNumber: '',
  })

  const fetchCategories = async () => {
    const res = await getCategories()
    setCategories(res)
    console.log(res)
  }
  useEffect(() => {
    fetchCategories()
    console.log(fetchCategories)
  }, [])

  const handleVariationChange = (key: string, value: string) => {
    setForm({ ...form, variations: { ...form.variations, [key]: value } })
  }

  const handleSubmit = async () => {
    await CreateProduct()
    toast.success('Product Added')
    setForm({
      name: '',
      description: '',
      category: '',
      variations: {},
      stock: 0,
      brand: '',
      serialNumber: '',
    })
  }

  const selectedCat = categories.find((c) => c._id === form.category)

  return (
    <div className='p-4 md:p-10 max-w-3xl mx-auto'>
      <Card>
        <CardContent className='grid gap-4 p-6'>
          <h2 className='text-xl font-bold'>Add Product</h2>

          <div className='grid gap-2'>
            <Label>Product Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className='grid gap-2'>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className='grid gap-2'>
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(val) => {
                const cat = categories.find((c) => c._id === val)
                const defaultVars = {} as Record<string, string>
                Object.keys(cat?.variations || {}).forEach(
                  (k) => (defaultVars[k] = '')
                )
                setForm({ ...form, category: val, variations: defaultVars })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCat &&
            Object.keys(selectedCat.variations || {}).map((key) => (
              <div key={key} className='grid gap-2'>
                <Label>{key}</Label>
                <Input
                  value={form.variations[key] || ''}
                  onChange={(e) => handleVariationChange(key, e.target.value)}
                />
              </div>
            ))}

          <div className='grid md:grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label>Stock</Label>
              <Input
                type='number'
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
              />
            </div>

            <div className='grid gap-2'>
              <Label>Brand</Label>
              <Input
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label>Serial Number</Label>
            <Input
              value={form.serialNumber}
              onChange={(e) =>
                setForm({ ...form, serialNumber: e.target.value })
              }
            />
          </div>

          <Button onClick={handleSubmit} className='w-full'>
            Add Product
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
