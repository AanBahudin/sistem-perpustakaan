import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { store } from "@/store"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { setKeadaanBuku } from "@/cart/pengembalianFilterSheetSlice"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import getAllKondisi from "@/actions/Shared/Kondisi/getAllKondisiBuku"

const StatusKeadaaBukuFilter = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['kondisi'],
    queryFn: getAllKondisi
  })
  
  const newData = isLoading ? ['Memuat'] : ['Semua', ...data.map((item: any) => item.kondisi)]

  const [searchParams] = useSearchParams()

  const {keadaanBuku} = useSelector((state: any) => state.pengembalianFilterSheetState)
  const initialParams = searchParams.get('keadaanBuku') || keadaanBuku || 'Semua'

  const handleChange = (value: string) => {
    store.dispatch(setKeadaanBuku(value))
  }

  useEffect(() => {
    store.dispatch(setKeadaanBuku(initialParams))
  }, [])

  return (
    <section className="w-full mt-4">
      <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Kondisi Buku</h1>
      {/* <Separator orientation="horizontal" /> */}
      <Select onValueChange={(value) => handleChange(value)} value={keadaanBuku}>
        <SelectTrigger className="w-full !text-xs">
          <SelectValue placeholder="Pilih durasi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="!text-xs">
            <SelectLabel>Keadaan buku</SelectLabel>
            {newData.map((item: any, index: number) => {
              return (
                <SelectItem value={item} key={index}>{item}</SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}

export default StatusKeadaaBukuFilter