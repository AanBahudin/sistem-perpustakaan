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
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import getAllKategori from "@/actions/Shared/Kategori/getAllKategoriAction"
import { useSelector } from "react-redux"
import { setKategori } from "@/cart/bukuFilterSheetSlice"
import { store } from "@/store"
import { useEffect } from "react"

const KategoriFilter = () => {

    const {isLoading, data: kategoriData} = useQuery({
        queryKey: ['kategori'],
        queryFn: getAllKategori
    })
    const data = isLoading ? ['Semua'] : ['Semua', ...kategoriData.data.map((item: any) => item.nama)]

    const [searchParams] = useSearchParams()
    const {kategori} = useSelector((state: any) => state.bukuFilterSheetState)
    const initialParams = searchParams.get('kategori') || kategori

    const handleChange = (value: string) => {
        store.dispatch(setKategori(value))
    }

    useEffect(() => {
        store.dispatch(setKategori(initialParams))
    }, [])

    return (
        <section className="w-full flex flex-col mt-3">
            <label htmlFor="category" className='text-sm font-semibold text-muted-foreground mb-2 capitalize'>Kategori Buku</label>

            <main className="w-full flex items-center justify-between gap-x-2">
                <Popover>
                    <PopoverTrigger asChild className="w-full flex-1 !text-xs">
                        <Button variant="outline" role="combobox" className="w-full justify-between !text-[12px]" >
                            {initialParams ? data.find((item: any) => item === initialParams) : "Cari kategori"}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full min-w-[350px] p-0">
                        <Command className="w-[100%]">
                            <CommandInput placeholder="Algoritma, Pemrograman ...." className="h-9 !text-xs" />
                            <CommandList className="scroll-custom w-full">
                                <CommandEmpty className="capitalize !text-xs">Kategori tidak ditemukan.</CommandEmpty>
                                <CommandGroup className="w-full">
                                    {data.map((item: any) => {
                                        return (
                                        <CommandItem className="w-full !text-xs" key={item} value={item} onSelect={(currentValue) => handleChange(currentValue)}>
                                            {item}
                                            <Check className={cn("ml-auto",kategori === item ? "opacity-100" : "opacity-0")}/>
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

export default KategoriFilter