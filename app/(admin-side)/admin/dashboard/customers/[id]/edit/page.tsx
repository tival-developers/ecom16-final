import { updateUserProfile } from '@/lib/actions/users.action'
import User from '@/lib/db/models/user.model'
import connectToDatabase from '@/lib/db/dbConnection'

interface UserType {
  _id: string
  name: string
  email: string
  password: string
}

//pre-populate the form fields

export default async function Page(props: { params: { id: string } }) {
  // const id = params.id
  const { id } = props.params

  await connectToDatabase
  const user = await User.findById(id).lean<UserType>()

  const updateUserWithId = updateUserProfile.bind(null, id)
  return (
    <form action={updateUserWithId}>
      <div className='flex gap-10 m-3.5'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          required
          defaultValue={user?.name}
          className='border-2'
        />
      </div>
      <div className='flex gap-10 m-3.5'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          required
          defaultValue={user?.email}
          className='border-2'
        />
      </div>
      <div className='flex gap-10 m-3.5'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          required
          className='border-2'
        />
      </div>
      <button type='submit' className='bg-emerald-500 p-2 rounded-md'>
        Update
      </button>
    </form>
  )
}
