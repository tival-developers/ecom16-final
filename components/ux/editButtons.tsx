import { deleteProduct } from '@/lib/actions/products.actions';
import { deleteUser } from '@/lib/actions/users.action';
import { PencilIcon, TrashIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';

 
 /******************** update users****************** */ 
export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
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
        <TrashIcon className="w-5" />
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
      <PencilIcon className="w-5" />
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
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

