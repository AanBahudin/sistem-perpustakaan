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
import { getAllPenerbit } from "@/actions/Shared/Penerbit/penerbitActions"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { store } from "@/store"
import { setPenerbit } from "@/cart/bukuFilterSheetSlice"

const PenerbitFilter = () => {

    const {isLoading, data} = useQuery({
        queryKey: ['penerbit'],
        queryFn: getAllPenerbit
    })

    const dataPenerbit = isLoading ? ['Memuat'] : ['Semua', ...data]

    const [searchParams] = useSearchParams()
    const {penerbit} = useSelector((state: any) => state.bukuFilterSheetState)
    const initialParams = searchParams.get('penerbit') || penerbit

    const handleChange = (value: string) => {
        store.dispatch(setPenerbit(value))
    }

    useEffect(() => {
        store.dispatch(setPenerbit(initialParams))
    }, [])

    return (
        <section className="w-full flex flex-col mt-3">
            <label htmlFor="category" className='text-sm font-semibold text-muted-foreground mb-2 capitalize'>Penerbit Buku</label>

            <main className="w-full flex items-center justify-between gap-x-2">
                <Popover>
                    <PopoverTrigger asChild className="w-full flex-1 !text-xs">
                        <Button variant="outline" role="combobox" className="w-full justify-between !text-[12px]" >
                            {initialParams ? dataPenerbit.find((currentPenerbit: string) => currentPenerbit === initialParams) : "Cari Penerbit"}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full min-w-[350px] p-0">
                        <Command className="w-[100%]">
                            <CommandInput placeholder="Advance programming, Tech Love... " className="h-9 !text-xs placeholder:text-xs" />
                            <CommandList className="scroll-custom w-full">
                                <CommandEmpty className="capitalize !text-xs p-3">Tidak ada hasil</CommandEmpty>
                                <CommandGroup className="w-full">
                                    {dataPenerbit.map((item: string) => {
                                        return (
                                            <CommandItem className="w-full !text-xs" key={item} value={item} onSelect={(currentValue) => handleChange(currentValue)}>
                                                {item}
                                                <Check className={cn("ml-auto",penerbit === item ? "opacity-100" : "opacity-0")}/>
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

export default PenerbitFilter