import * as React from "react"
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

const SearchCategoryFilter = ({data} : {data: any}) => {

  // URL hooks
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const kategoriParams = searchParams.get('kategori')

  // React Hooks
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const newData = data.length === 0 ? [] : data

  const handleSelect = (currentValue: any) => {
    const params = new URLSearchParams(searchParams)

    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)

    if (currentValue) {
      params.set('kategori', currentValue)
    } else {
      params.delete('kategori')
    }

    navigate(`?${params.toString()}`);
  }

  return (
    <section className='w-full flex flex-col'>
        <label htmlFor="category" className='uppercase font-semibold text-xs mb-3'>kategori</label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="w-full">
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between text-xs" >
              {kategoriParams ? newData.find((framework: any) => framework.nama === kategoriParams)?.nama : "Cari kategori"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full p-0">
            <Command className="w-full">
              <CommandInput placeholder="Cari kategori..." className="h-9" />
              <CommandList className="scroll-custom w-full">
                <CommandEmpty>Kategori tidak ditemukan.</CommandEmpty>
                <CommandGroup className="w-full">
                  {newData.map((framework: any) => {
                    return (
                      <CommandItem className="w-full" key={framework.nama} value={framework.nama} onSelect={(currentValue) => handleSelect(currentValue)}>
                        {framework.nama}
                        <Check className={cn("ml-auto",value === framework.nama ? "opacity-100" : "opacity-0")}/>
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

export default SearchCategoryFilter