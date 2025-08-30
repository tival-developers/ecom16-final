import { Input } from '@/components1/ui/input'
import SearchIcon from '../shared/SearchButton'

export function SearchInput() {
  return (
    <>
      <div>
        <div className='relative'>
          <Input type='email' placeholder='hp elitebook 840 g1' />
          <div className='absolute right-2 top-1'>
            <SearchIcon />
          </div>
        </div>
      </div>
    </>
  )
}
