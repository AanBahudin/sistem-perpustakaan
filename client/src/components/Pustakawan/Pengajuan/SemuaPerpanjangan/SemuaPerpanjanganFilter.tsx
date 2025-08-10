import { Button } from "@/components/ui/button"
import SemuaPerpanjanganSearchInput from "./SemuaPerpanjanganSearchInput"
import StatusPerpanjanganFilter from "./StatusPerpanjanganFilter"
import SemuaPerpanjanganFilterSheet from "./SemuaPerpanjanganFilterSheet"
import { SlidersHorizontal } from "lucide-react"

const SemuaPerpanjanganFilter = () => {
  return (
    <section className='w-full my-6 flex items-center gap-x-4'>
        <SemuaPerpanjanganSearchInput />
        <StatusPerpanjanganFilter />
        <SemuaPerpanjanganFilterSheet>
          <Button className='w-[20%] flex items-center gap-x-2 text-white text-xs'>
            <SlidersHorizontal className='w-1 h-1' />
            More Filter
          </Button>
        </SemuaPerpanjanganFilterSheet>
    </section>
  )
}

export default SemuaPerpanjanganFilter