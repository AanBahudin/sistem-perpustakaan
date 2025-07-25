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
import { useNavigate, useSearchParams } from "react-router-dom"
import { useState } from "react"


const PenerbitSearchInput = ({data} : {data: any}) => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = searchParams.get('penerbit')

  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const newData = data?.length > 0 ? data : []

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


  return (
    <section className="w-full flex flex-col mt-3">
      <label htmlFor="category" className='uppercase font-semibold text-xs mb-3'>penerbit</label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between text-xs" >
            {params ? newData.find((framework: any) => framework === params) : "Cari penerbit"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder="Cari penerbit..." className="h-9" />
            <CommandList className="scroll-custom w-full">
              <CommandEmpty>Penerbit tidak ditemukan.</CommandEmpty>
              <CommandGroup className="w-full">
                {newData.map((penerbit: any) => {
                  console.log(newData)
                  return (
                    <CommandItem className="w-full" key={penerbit} value={penerbit} onSelect={(currentValue) => handleSelect(currentValue)}>
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
    </section>
  )
}

export default PenerbitSearchInput