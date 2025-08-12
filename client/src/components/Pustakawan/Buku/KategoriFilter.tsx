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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useState } from "react"
import { X } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getAllKategori } from "@/actions/kategoriAction"

const KategoriFilter = () => {
    const location = useLocation()

    const {isLoading, data: kategori} = useQuery({
        queryKey: ['kategori'],
        queryFn: getAllKategori
    })

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const fullParams = new URLSearchParams(searchParams)
    const params = searchParams.get('penerbit')

    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)
    const data = isLoading ? ['Semua'] : ['Semua', ...kategori.data.map((item: any) => item.nama)]

    const handleSelect = (currentValue: any) => {
    const params = new URLSearchParams(searchParams)

    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)

    if (currentValue) {
        params.set('penerbit', currentValue)
    } else {
        params.delete('penerbit')
    }

    navigate(`?${params.toString()}`);
    }

    const resetPenerbit = () => {
        const isParamsExist = searchParams.get('penerbit')
        if (isParamsExist) {                     
            fullParams.delete('penerbit')
            navigate(location.pathname.toString());
        }
        setValue('')
    }

    return (
        <section className="w-full flex flex-col mt-3">
            <label htmlFor="category" className='text-sm font-semibold text-muted-foreground mb-2 capitalize'>Kategori Buku</label>

            <main className="w-full flex items-center justify-between gap-x-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="w-full flex-1 !text-xs">
                        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between !text-[12px]" >
                            {params ? data.find((framework: any) => framework === params) : "Cari kategori"}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full min-w-[350px] p-0">
                        <Command className="w-[100%]">
                            <CommandInput placeholder="Algoritma, Pemrograman ...." className="h-9 !text-xs" />
                            <CommandList className="scroll-custom w-full">
                                <CommandEmpty className="capitalize !text-xs">Kategori tidak ditemukan.</CommandEmpty>
                                <CommandGroup className="w-full">
                                    {data.map((penerbit: any) => {
                                        return (
                                        <CommandItem className="w-full !text-xs" key={penerbit} value={penerbit} onSelect={(currentValue) => handleSelect(currentValue)}>
                                            {penerbit}
                                            <Check className={cn("ml-auto",value === penerbit ? "opacity-100" : "opacity-0")}/>
                                        </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                {params && <Button className='ease-in-out duration-300' onClick={resetPenerbit} type='button' size='icon' variant='destructive'><X /></Button>}
            </main>
        </section>
    )
}

export default KategoriFilter