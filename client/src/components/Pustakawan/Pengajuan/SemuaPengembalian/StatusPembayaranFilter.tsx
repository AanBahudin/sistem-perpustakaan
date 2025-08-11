import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { store } from "@/store"
import { setStatusPembayaran } from "@/cart/pengembalianFilterSheetSlice"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const StatusPembayaranFilter = () => {

  const [searchParams] = useSearchParams()
    
  const {statusPembayaran} = useSelector((state: any) => state.pengembalianFilterSheetState)
  const initialParams = searchParams.get('statusPembayaran') || statusPembayaran

  const value = ['Semua', 'Dibayar', 'Belum Bayar']

  const handleChange = (value: string) => {
    store.dispatch(setStatusPembayaran(value))
  }

  useEffect(() => {
    store.dispatch(setStatusPembayaran(initialParams))
  }, [])

  return (
    <section className="w-full mt-4">
      <h1 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">Status Pembayaran</h1>
      {/* <Separator orientation="horizontal" /> */}
      <ToggleGroup 
        defaultValue={initialParams} value={statusPembayaran} 
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

export default StatusPembayaranFilter