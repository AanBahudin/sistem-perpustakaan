import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
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


const PenulisSearchInput = ({data} : {data: any}) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = searchParams.get('penulis')

    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)

    const newData = data?.length === 0 ? [] : data

    const handleSelect = (currentValue: any) => {
        const params = new URLSearchParams(searchParams)
        setValue(currentValue === value ? "" : currentValue)
        setOpen(false)

        if (currentValue) {
        params.set('penulis', currentValue)
        } else {
        params.delete('penulis')
        }

        navigate(`?${params.toString()}`);
    }
    
    
    return (
        <section className="w-full flex flex-col mt-3">
            <label htmlFor="penulis" className="uppercase font-semibold text-xs mb-3">penulis</label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="w-full">
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between text-xs" >
                        {params ? data.find((penulis: any) => penulis === params) : "Cari penulis"}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                    <CommandInput placeholder="Cari penulis..." className="h-9" />
                    <CommandList className="scroll-custom w-full">
                        <CommandEmpty>Penulis tidak ditemukan.</CommandEmpty>
                        <CommandGroup className="w-full">
                        {newData.map((penulis: any) => {
                            return (
                            <CommandItem className="w-full" key={penulis} value={penulis} onSelect={(currentValue) => handleSelect(currentValue)}>
                                {penulis}
                                <Check className={cn("ml-auto",value === penulis ? "opacity-100" : "opacity-0")}/>
                            </CommandItem>
                            )
                        })}
                        </CommandGroup>
                    </CommandList>
                    </Command>
                </PopoverContent>
        </Popover>
        </section>
    )
}

export default PenulisSearchInput