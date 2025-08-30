import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { revalidatePath } from 'next/cache'
import { deleteCategory, getAllCategories } from '@/lib/actions/cat'

// export default async function CategoriesPage() {
//   const categories = await getAllCategories()

//   const handleDelete = async (id: string) => {
//     'use server'
//     const res = await deleteCategory(id)
//     if (res?.error) {
//       toast.error(res.error)
//     } else {
//       toast.success('Category deleted!')
//       revalidatePath('/categories')
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 space-y-4">
//       <h2 className="text-2xl font-bold">Categories</h2>

//       {categories.length === 0 ? (
//         <p>No categories found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {categories.map((cat) => (
//             <Card key={cat.id} className="flex flex-col">
//               <CardHeader>
//                 <h3 className="font-semibold text-lg">{cat.name}</h3>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {/* <img src={cat.imageUrl} alt={cat.name} className="h-40 w-full object-cover rounded" /> */}
//                 <p className="text-muted-foreground text-sm">Slug: {cat.slug}</p>
//                 <div className="flex gap-2 mt-2">
//                   <Link href={`/categories/${cat.id}/edit`}>
//                     <Button size="sm">Edit</Button>
//                   </Link>
//                   <form action={handleDelete.bind(null, cat.id)}>
//                     <Button size="sm" variant="destructive" type="submit">Delete</Button>
//                   </form>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  const handleDelete = async (id: string) => {
    'use server'
    const res = await deleteCategory(id)
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Category deleted!')
      revalidatePath('/1')
    }
  }

  return (
    <div className='max-w-7xl mx-auto p-4 space-y-4'>
      <h2 className='text-2xl font-bold flex items-center gap-2'>
        Categories
        <Badge variant='secondary' className='text-sm'>
          {categories.length}
        </Badge>
      </h2>
      

      {categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {categories.map((cat) => (
            <Card key={cat.id} className='flex flex-col overflow-hidden'>
              <div className='h-40 w-full overflow-hidden'>
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className='h-full w-full object-cover rounded-t'
                />
              </div>
              <CardHeader>
                <h3 className='font-semibold text-lg'>{cat.name}</h3>
              </CardHeader>
              <CardContent className='space-y-2'>
                <p className='text-muted-foreground text-sm'>
                  Slug: {cat.slug}
                </p>

                {cat.variations?.length > 0 && (
                  <div className='flex flex-wrap gap-1 mt-2'>
                    {cat.variations.map((variation, index) => (
                      <Badge key={index} variant='secondary'>
                        {variation}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className='flex gap-2 mt-4'>
                  <Link href={`/1/${cat.id}/edit`}>
                    <Button size='sm'>Edit</Button>
                  </Link>
                  <form action={handleDelete.bind(null, cat.id)}>
                    <Button size='sm' variant='destructive' type='submit'>
                      Delete
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
