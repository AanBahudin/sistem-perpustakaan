import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { store } from "@/store"
import { setDurasiPerpanjangan } from "@/cart/perpanjanganFilterSheetSlice"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllDurasiPeminjaman } from "@/actions/Pustakawan/pustakawanDurasiActions"

const DurasiPerpanjanganFilter = () => {

  const {isLoading, data} = useQuery({
    queryKey: ['durasi'],
    queryFn: getAllDurasiPeminjaman
  })

  const newData = isLoading ? ['Memuat'] : ['Semua', ...data.map((item: any) => item.durasi)]
  
  const [searchParams] = useSearchParams()
  const {durasi} = useSelector((state: any) => state.perpanjanganFilterSheetState)
  const initialParams = searchParams.get('durasi')?.toString() || durasi

  const handleChange = (value: string) => {
    store.dispatch(setDurasiPerpanjangan(value))
  }

  useEffect(() => {
    store.dispatch(setDurasiPerpanjangan(initialParams))
  }, [])

  return (
    <section className="w-full mt-4">
      <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Durasi Peminjaman</h1>

      <Select 
        value={durasi} 
        onValueChange={(value) => handleChange(value)}
      >
        <SelectTrigger className="w-full !text-xs">
          <SelectValue placeholder="Pilih durasi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="!text-xs">
            <SelectLabel>Durasi Perpanjangan</SelectLabel>
              {newData.map((item: any, index: number) => {
                  return (
                    <SelectItem value={item.toString()} key={index}>
                      {item === 'Semua' ? item : `${item} Hari`}
                    </SelectItem>   
                )
              }
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}

export default DurasiPerpanjanganFilter