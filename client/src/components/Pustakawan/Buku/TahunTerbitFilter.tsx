import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { store } from "@/store"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import {pustakawanGetTahunBukuAction} from "@/actions/Pustakawan/Buku"
import { setTahunTerbit } from "@/cart/bukuFilterSheetSlice"

const TahunTerbitFilter = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['tahun'],
    queryFn: pustakawanGetTahunBukuAction
  })

  const newData = isLoading ? ['Memuat'] : ['Semua', ...data.map((item: any) => item.toString())]
  const [searchParams] = useSearchParams()
  const {tahunTerbit} = useSelector((state: any) => state.bukuFilterSheetState)
  const initialParams = searchParams.get('tahunTerbit') || tahunTerbit

  const handleChange = (value: string) => {
    store.dispatch(setTahunTerbit(value))
  }

  useEffect(() => {
    store.dispatch(setTahunTerbit(initialParams))
  }, [])
  

  return (
    <section className="w-full flex flex-col mt-3">
      <label htmlFor="category" className='text-sm font-semibold text-muted-foreground mb-2 capitalize'>Tahun terbit buku</label>

      <main className="w-full flex items-center justify-between gap-x-2">
          <Popover>
            <PopoverTrigger asChild className="w-full flex-1 !text-xs">
              <Button variant="outline" role="combobox" className="w-full justify-between !text-[12px]" >
                {initialParams ? newData.find((currentPenerbit: string) => currentPenerbit === initialParams) : "Cari tahun terbit buku"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full min-w-[350px] p-0">
              <Command className="w-[100%]">
                <CommandInput placeholder="Ketik tahun terbit" inputMode="numeric" className="h-9 !text-xs placeholder:text-xs" />
                <CommandList className="scroll-custom w-full">
                  <CommandEmpty className="capitalize !text-xs p-3">Tidak ada hasil</CommandEmpty>
                  <CommandGroup className="w-full">
                    {newData.map((item: string) => {
                      return (
                        <CommandItem className="w-full !text-xs" key={item} value={item} onSelect={(currentValue) => handleChange(currentValue)}>
                          {item}
                          <Check className={cn("ml-auto",tahunTerbit === item ? "opacity-100" : "opacity-0")}/>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
      </main>
    </section>
  )
}

export default TahunTerbitFilter