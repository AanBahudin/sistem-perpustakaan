import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

const SemuaPengembalianSearchInput = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fullParams = new URLSearchParams(searchParams)
  const params = searchParams.get('query') || ""

  const [searchValue, setSearchValue] = useState(params)
  const handleSearchValue = (e: any) => {
    setSearchValue(e.target.value)
  }
  
  const resetSearchValue = () => {
    setSearchValue('')
    fullParams.delete('query')
    navigate(`?${fullParams.toString()}`)
  }

  const handleSearchToParams = useDebouncedCallback((value: string) => {
    if (value) {
      fullParams.delete('page')
      fullParams.set('query', value)
    } else {
      fullParams.delete('query')
    }
    navigate(`?${fullParams.toString()}`);
  }, 600)

  return (
    <section className='flex-1 flex items-center border group px-2 rounded-lg gap-x-2 bg-accent/40'>
      <Search className='w-4 h-4 text-muted-foreground' />
      <Input
          autoFocus={params ? true : false}
          value={searchValue}
          onChange={e => {
              handleSearchToParams(e.target.value)
              handleSearchValue(e)
          }}
          className='border-none placeholder:text-xs selection:text-white focus:outline-none focus:ring-0 focus-visible:ring-0 !bg-transparent rounded-none placeholder:text-muted-foreground focus:placeholder:text-transparent' 
          placeholder='Cari pengguna' />

      <div onClick={resetSearchValue} className={`${!searchValue && 'hidden'} p-1 rounded-full hover:bg-destructive/5 duration-200 ease-in-out`}>
        <X className='w-4 h-4 stroke-destructive' />
      </div>
    </section>
  )
}

export default SemuaPengembalianSearchInput