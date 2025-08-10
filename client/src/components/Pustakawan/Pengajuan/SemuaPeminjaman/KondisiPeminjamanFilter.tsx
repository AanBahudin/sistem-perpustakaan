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
import { setKondisi } from "@/cart/peminjamanFilterSheetSlice"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllKondisi } from "@/actions/Pustakawan/pustakawanKondisiActionts"

const KondisiPeminjamanFilter = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['kondisi'],
    queryFn: getAllKondisi
  })


  const newData = isLoading ? ['Memuat'] : data
  const [searchParams] = useSearchParams()

  const {kondisi} = useSelector((state: any) => state.peminjamanFilterSheetState)
  const initialParams = searchParams.get('kondisi') || kondisi

  const handleChange = (value: string) => {
    store.dispatch(setKondisi(value))
  }

  useEffect(() => {
    store.dispatch(setKondisi(initialParams))
  }, [])

  return (
    <section className="w-full mt-4">
      <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Kondisi Buku</h1>
      {/* <Separator orientation="horizontal" /> */}
      <Select onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className="w-full !text-xs">
          <SelectValue placeholder="Pilih durasi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="!text-xs">
            <SelectLabel>Durasi Peminjaman</SelectLabel>
            {newData.map((item: any, index: number) => {
              return (
                <SelectItem value={item.kondisi} key={index}>{item.kondisi}</SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}

export default KondisiPeminjamanFilter