import { deleteAdmin } from '@/lib/actions/admins';
import { deleteBanner } from '@/lib/actions/banner';
import { deleteBlog } from '@/lib/actions/blogs';
import { deleteCategory } from '@/lib/actions/category';
import { deleteProduct } from '@/lib/actions/products.actions';
import { deleteUser } from '@/lib/actions/users.action';
import { LucidePencil, Trash2 } from 'lucide-react';
import Link from 'next/link';


 
 /******************** update users****************** */ 
export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <LucidePencil  className="w-5" />
    </Link>
  );
}
/********************delete users****************** */ 
export function DeleteUser({ id }: { id: string }) {
  const deleteUserWithId = deleteUser.bind(null, id);
 
  return (
    <form action={deleteUserWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}




/******************** update Admin****************** */ 
export function UpdateAdmin({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/admins/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <LucidePencil  className="w-5" />
    </Link>
  );
}
/********************delete admin****************** */ 
export function DeleteAdmin({ id }: { id: string }) {
  const deleteAdminWithId = deleteAdmin.bind(null, id);
 
  return (
    <form action={deleteAdminWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}
/********************products****************** */ 


/******************** update products****************** */ 
export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <LucidePencil className="w-5" />
    </Link>
  );
}

/********************delete products****************** */ 
export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
 
  return (
    <form action={deleteProductWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}

/********************categories****************** */ 


/******************** update categories****************** */ 
export function UpdateCategory({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/products/product-categories/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <LucidePencil  className="w-5" />
    </Link>
  );
}

/********************delete categories****************** */ 
export function DeleteCategory({ id }: { id: string }) {
  const deleteCategoryWithId = deleteCategory.bind(null, id);
 
  return (
    <form action={deleteCategoryWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}

/********************blogs****************** */ 


/******************** update  Blogs***************** */ 
export function UpdateBlogs({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/blogs/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <LucidePencil className="w-5" />
    </Link>
  );
}

/********************delete Blogs****************** */ 
export function DeleteBlog({ id }: { id: string }) {
  const deleteBlogWithId = deleteBlog.bind(null, id);
 
  return (
    <form action={deleteBlogWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}

//////////////Banners////////////////////

/******************** update  Banner***************** */ 
export function UpdateBanner({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/banners/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <LucidePencil  className="w-5" />
    </Link>
  );
}

/********************delete Banner****************** */ 
export function DeleteBanner({ id }: { id: string }) {
  const deleteBannerWithId = deleteBanner.bind(null, id);
 
  return (
    <form action={deleteBannerWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}

