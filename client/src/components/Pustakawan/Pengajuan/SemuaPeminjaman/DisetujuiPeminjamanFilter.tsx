import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { store } from "@/store"
import { setDisetujui } from "@/cart/peminjamanFilterSheetSlice"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const DisetujuiPeminjamanFilter = () => {

  const [searchParams] = useSearchParams()
  
  const {disetujui} = useSelector((state: any) => state.peminjamanFilterSheetState)
  const initialParams = searchParams.get('disetujui') || disetujui

  const selectValue = ['Semua', 'true', 'false']
  const value = ['Semua', 'Disetujui', 'Ditolak']

  const handleChange = (value: string) => {
    store.dispatch(setDisetujui(value))
  }

  useEffect(() => {
      store.dispatch(setDisetujui(initialParams))
  }, [])

  return (
     <section className="w-full mt-4">
      <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Status Peminjaman</h1>
      <ToggleGroup
        defaultValue={initialParams} value={disetujui} 
        onValueChange={handleChange} type="single" 
        className=" flex gap-2 mt-4 w-full rounded-none flex-wrap">
          {value.map((item: string, index:number) => {
              return (
                  <ToggleGroupItem
                      asChild
                      value={selectValue[index]}
                      key={index}>
                      <Button className={`text-white hover:bg-muted min-w-[30%] duration-200 ease-in-out border px-3 text-xs rounded`}>{item}</Button>
                  </ToggleGroupItem>
              )
          })}
      </ToggleGroup>
    </section>
  )
}

export default DisetujuiPeminjamanFilter