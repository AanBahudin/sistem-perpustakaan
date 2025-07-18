import { ListFilter } from 'lucide-react'

const SearchFilter = () => {
  return (
    <section className='w-full border-r-2'>
        <main className='flex items-start justify-start gap-x-4 min-h-[60vh]'>
            <ListFilter className='w-5 h-5'/>
            <h1 className='uppercase font-semibold'>Filter</h1>
        </main>
    </section>
  )
}

export default SearchFilter