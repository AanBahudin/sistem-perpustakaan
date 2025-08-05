import { Button } from '@/components/ui/button'
import SemuaPenggunaSearchInput from './SemuaPenggunaSearchInput'
import TipePenggunaFilter from './TipePenggunaFilter'
import { SlidersHorizontal } from 'lucide-react'
import PenggunaFilterSheet from '../PenggunaFilterSheet'

const SemuaPenggunaFilter = () => {
  return (
    <section className='w-full my-6 flex items-center gap-x-4'>
      <SemuaPenggunaSearchInput />
      <TipePenggunaFilter />
      <PenggunaFilterSheet>
        <Button className='flex-1 flex items-center gap-x-2 text-white text-xs'>
          <SlidersHorizontal className='w-1 h-1' />
          More Filter
        </Button>
      </PenggunaFilterSheet>
    </section>
  )
}

export default SemuaPenggunaFilter