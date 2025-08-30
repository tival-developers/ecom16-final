'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='bg-emerald-500 p-2 rounded-md'
      disabled={pending}
    >
      {pending ? 'Updating...' : 'Update'}
    </button>
  )
}
