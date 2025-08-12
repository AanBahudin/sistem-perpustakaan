import BukuSearchInput from './BukuSearchInput'
import BukuTersediaFilter from './BukuTersediaFilter'
import SemuaBukuFilterSheet from './SemuaBukuFilterSheet'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'

const SemuaBukuFilter = () => {
  return (
    <section className='w-full my-6 flex items-center gap-x-4'>
        <BukuSearchInput />
        <BukuTersediaFilter />
        <SemuaBukuFilterSheet>
          <Button className='w-[20%] flex items-center gap-x-2 text-white text-xs'>
            <SlidersHorizontal className='w-1 h-1' />
            More Filter
          </Button>
        </SemuaBukuFilterSheet>
    </section>
  )
}

export default SemuaBukuFilter