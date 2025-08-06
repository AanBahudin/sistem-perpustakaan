import { Button } from '@/components/ui/button'
import SemuaPenggunaSearchInput from './SemuaPenggunaSearchInput'
import TipePenggunaFilter from './TipePenggunaFilter'
import { SlidersHorizontal } from 'lucide-react'
import PenggunaFilterSheet from '../PenggunaFilterSheet'

const SemuaPenggunaFilter = ({usedIn = 'default'} : {usedIn?: string}) => {
  return (
    <section className='w-full my-6 flex items-center gap-x-4'>
      <SemuaPenggunaSearchInput placeholder="Cari dosen berdasarkan nama atau NIDN" />
      {usedIn === 'default' && <TipePenggunaFilter />}
      <PenggunaFilterSheet usedIn={usedIn}>
        <Button className='w-[20%] flex items-center gap-x-2 text-white text-xs'>
          <SlidersHorizontal className='w-1 h-1' />
          More Filter
        </Button>
      </PenggunaFilterSheet>
    </section>
  )
}

export default SemuaPenggunaFilter