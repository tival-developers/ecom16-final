'use client'
import { useEffect, useState } from 'react'
import { Menu as MenuIcon, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getAllCategories } from '@/lib/actions/category'

type CategoryType = {
  name: string
  slug: string
}

export default function DepartmentSection() {
  const [isListOpen, setIsListOpen] = useState(false)
  const [categories, setCategories] = useState<
    { name: string; slug: string }[]
  >([])
  const toggleList = () => setIsListOpen((prev) => !prev)

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories()
      if (!res) {
        return
      }
      setCategories(res)
    }
    fetchCategories()
  }, [])

  return (
    <section className='gap-4 p-2 w-full md:w-fit'>
      {/* Sidebar */}
      <aside className='w-full lg:w-64 bg-slate-50 shadow  rounded border border-gray-200'>
        <div className='flex items-center gap-2  px-4 py-1.5 relative '>
          <MenuIcon
            className='cursor-pointer text-amber-600'
            onClick={toggleList}
          />
          <h3 className='font-semibold text-lg'>Shop By Department</h3>
        </div>

        {/* Toggle list on small screens, always show on lg+ */}
        <ul
          className={`space-y-0 text-[15px] font-medium text-gray-700 pl-4 absolute z-50 bg-slate-50 border-2 rounded-lg ${
            isListOpen ? 'block' : 'hidden'
          } `}
        >
          <div className='max-h-[300px] py-1 overflow-y-auto w-[235px] '>
            {categories.map((category: CategoryType) => (
              <li key={category.name}>
                <Link
                  href={`/categories/${category.slug}`}
                  className='py-2 border-b last:border-b-0 block text-gray-800 hover:bg-amber-50   '
                >
                  <div className='flex items-center justify-between px-2'>
                    {category.name}
                    <ChevronRight className='w-4 h-4 text-gray-500' />
                  </div>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </aside>
    </section>
  )
}
