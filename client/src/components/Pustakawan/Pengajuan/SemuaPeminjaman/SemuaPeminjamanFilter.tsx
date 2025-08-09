import { Button } from "@/components/ui/button"
import SemuaPeminjamanSearchInput from "./SemuaPeminjamanSearchInput"
import StatusPeminjamanFilter from "./StatusPeminjamanFilter"
import SemuaPeminjamanFilterSheet from "./SemuaPeminjamanFilterSheet"
import { SlidersHorizontal } from "lucide-react"

const SemuaPeminjamanFilter = () => {
    return (
    <section className='w-full my-6 flex items-center gap-x-4'>
      <SemuaPeminjamanSearchInput />
      <StatusPeminjamanFilter />
      <SemuaPeminjamanFilterSheet>
        <Button className='w-[20%] flex items-center gap-x-2 text-white text-xs'>
          <SlidersHorizontal className='w-1 h-1' />
          More Filter
        </Button>
      </SemuaPeminjamanFilterSheet>
    </section>
  )
}

export default SemuaPeminjamanFilter