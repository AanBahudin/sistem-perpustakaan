import SemuaPengembalianSearchInput from "./SemuaPengembalianSearchInput"
import StatusPengembalianFilter from "./StatusPengembalianFilter"
import SemuaPengembalianFilterSheet from "./SemuaPengembalianFilterSheet"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

const SemuaPengembalianFilter = () => {
  return (
    <section className='w-full my-6 flex items-center gap-x-4'>
      <SemuaPengembalianSearchInput />
      <StatusPengembalianFilter />
      <SemuaPengembalianFilterSheet>
        <Button className='w-[20%] flex items-center gap-x-2 text-white text-xs'>
          <SlidersHorizontal className='w-1 h-1' />
          More Filter
        </Button>
      </SemuaPengembalianFilterSheet>
    </section>
  )
}

export default SemuaPengembalianFilter