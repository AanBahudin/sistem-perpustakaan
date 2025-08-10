import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { store } from "@/store"
import { setDisetujuiPerpanjangan } from "@/cart/perpanjanganFilterSheetSlice"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const StatusPerpanjangFilter = () => {

  const [searchParams] = useSearchParams()
  
  const {disetujui} = useSelector((state: any) => state.perpanjanganFilterSheetState)
  const initialParams = searchParams.get('disetujui') || disetujui

  const value = ['Semua', 'Diterima', 'Pending', 'Ditolak']

  const handleChange = (value: string) => {
    store.dispatch(setDisetujuiPerpanjangan(value))
  }

  useEffect(() => {
    store.dispatch(setDisetujuiPerpanjangan(initialParams))
  }, [])
  
  return (
    <section className="w-full mt-4">
      <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Status Perpanjangan</h1>
      {/* <Separator orientation="horizontal" /> */}
      <ToggleGroup 
        defaultValue={initialParams} value={disetujui} 
        onValueChange={handleChange} type="single" 
        className=" flex gap-2 mt-4 w-full rounded-none flex-wrap">
          {value.map((item: string, index:number) => {
              return (
                <ToggleGroupItem
                    asChild
                    value={item} 
                    key={index}>
                    <Button className={`text-white hover:bg-muted min-w-[30%] duration-200 ease-in-out border px-3 text-xs rounded`}>{item}</Button>
                </ToggleGroupItem>
            )
          })}
      </ToggleGroup>
    </section>
  )
}

export default StatusPerpanjangFilter