import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Check, RotateCcw } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { store } from "@/store"
import { useSelector } from "react-redux"
import { resetPerpanjanganFilter } from "@/cart/perpanjanganFilterSheetSlice"
import StatusPerpanjangFilter from "./StatusPerpanjangFilter"
import DurasiPerpanjanganFilter from "./DurasiPerpanjanganFilter"

const SemuaPerpanjanganFilterSheet = ({children} : {children: React.ReactNode}) => {

  const navigate = useNavigate()
  const location = useLocation()

  const filteredParams = () => {
    const { durasi, disetujui } = useSelector((state: any) => state.perpanjanganFilterSheetState)
    const filters = {durasi, disetujui}
    const validParams = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && (value !== 'Semua' || value === '')) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, string>)
    const searchParams = new URLSearchParams(validParams).toString()
    return searchParams
  }

  const queryString = filteredParams()

  const handleClick = () => {
    navigate(`?${queryString.toString()}`)
  }
  
  const handleReset = () => {
    store.dispatch(resetPerpanjanganFilter())
    navigate(location.pathname.toString())
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col items-start justify-between w-full">
          <SheetHeader className="w-full py-10">
            <SheetTitle className="mt-3">Filter Data Perpanjangan</SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
                Saring data perpanjangan sesuai kebutuhanmu.
            </SheetDescription>
            
            <StatusPerpanjangFilter />
            <DurasiPerpanjanganFilter />
          </SheetHeader>

          <main className="w-full flex gap-x-4 items-center justify-stretch self-baseline p-4">
            <Button onClick={handleClick} className="text-white flex-1 font-normal text-xs flex items-center gap-x-2" size='sm'>
              <Check className="w-3 h-3" />
              Terapkan
            </Button>
            <Button onClick={handleReset} className="text-white flex-1 flex items-center gap-x-2" size='sm' variant='destructive'>
              <RotateCcw className="w-2 h-2" />
              Reset
            </Button>
          </main>
      </SheetContent>
    </Sheet>
  )
}

export default SemuaPerpanjanganFilterSheet