import { Check, ChevronsUpDown} from "lucide-react"
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
import { getAllPenulisAction } from "@/actions/Shared/Penulis"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { setPenulis } from "@/cart/bukuFilterSheetSlice"
import { store } from "@/store"



const PenulisFilter = () => {

    const {isLoading, data} = useQuery({
        queryKey: ['penulis'],
        queryFn: getAllPenulisAction
    })

    const dataPenulis = isLoading ? ['Memuat'] : ['Semua', ...data]

    const [searchParams] = useSearchParams()
    const {penulis} = useSelector((state: any) => state.bukuFilterSheetState)
    const initialParams = searchParams.get('penulis') || penulis

    const handleChange = (value: string) => {
        store.dispatch(setPenulis(value))
    }

    useEffect(() => {
        store.dispatch(setPenulis(initialParams))
    }, [])

    return (
        <section className="w-full flex flex-col mt-3">
            <label htmlFor="category" className='text-sm font-semibold text-muted-foreground mb-2 capitalize'>Penulis Buku</label>

            <main className="w-full flex items-center justify-between gap-x-2">
                <Popover>
                    <PopoverTrigger asChild className="w-full flex-1 !text-xs">
                        <Button variant="outline" role="combobox" className="w-full justify-between !text-[12px]" >
                            {initialParams ? dataPenulis.find((currentPenulis: any) => currentPenulis === initialParams) : "Cari Penulis"}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full min-w-[350px] p-0">
                        <Command className="w-[100%]">
                            <CommandInput placeholder="John Dose, Ralph Johnson" className="h-9 !text-xs" />
                            <CommandList className="scroll-custom w-full">
                                <CommandEmpty className="capitalize !text-xs">penulis tidak ditemukan.</CommandEmpty>
                                <CommandGroup className="w-full">
                                    {dataPenulis.map((item: string) => {
                                        return (
                                            <CommandItem className="w-full !text-xs" key={item} value={item} onSelect={(currentValue) => handleChange(currentValue)}>
                                                {item}
                                                <Check className={cn("ml-auto",penulis === item ? "opacity-100" : "opacity-0")}/>
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

export default PenulisFilter