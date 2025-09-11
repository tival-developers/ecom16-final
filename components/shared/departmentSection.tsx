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
    <section className='gap-4 p-2'>
      {/* Sidebar */}
      <aside className='w-full lg:w-64 bg-slate-50 shadow  rounded border border-gray-200'>
        <div className='flex items-center gap-2  px-4 py-1.5 relative '>
          <MenuIcon className='cursor-pointer text-amber-600' onClick={toggleList} />
          <h3 className='font-semibold text-lg'>Shop By Department</h3>
        </div>

        {/* Toggle list on small screens, always show on lg+ */}
        <ul
          className={`space-y-0 text-[15px] font-medium text-gray-700 pl-4 absolute -left-2 z-50 bg-slate-50 ${
            isListOpen ? 'block' : 'hidden'
          } `}
        >
          {categories.map((category: CategoryType) => (
            <li key={category.name}>
              <Link
                href={`/categories/${category.slug}`}
                className='py-1.5 border rounded shadow-md block text-center  text-gray-800 w-[255px] '
              >
                <div className='flex items-center justify-between px-4'>
                  {category.name} <ChevronRight className='w-4 h-4' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}
