import React, {useState} from 'react'
import { useQuery } from '@tanstack/react-query'
import getAllKategori from '@/actions/Shared/Kategori/getAllKategoriAction'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, ChevronsUpDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
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
import AddCategoriDialog from './AddCategoriDialog'

const CategorySectionContainer = () => {

  const {isLoading, data: response} = useQuery({
    queryKey: ['kategori'],
    queryFn: getAllKategori
  })

const dataSelect = isLoading ? ['memuat'] : response.data.map((item: any) => item.nama)

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [selectedValue, setSelected] = useState<Array<string>>([])

  const handleValue = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)

    if (!selectedValue.includes(currentValue)) {
      setSelected((prevValue) => [...prevValue, currentValue])
    } else {
      setSelected((prevValue) => {
        const newValue = prevValue.filter((item: string) => item !== currentValue)
        return [...newValue]
      })
    }
  }

  const removeSelected = (currentValue: string) => {
    if (selectedValue.includes(currentValue)) {
      setSelected((prevValue) => {
        const newValue = prevValue.filter((item: string) => item !== currentValue)
        return [...newValue]
      })
    }
  }
  
  return (
    <section className='w-full p-4 bg-muted dark:bg-accent/10 rounded-xl'>
      <h1 className='text-lg font-semibold mb-4'>Kategori</h1>
      <main className='w-full flex flex-col gap-y-2 mb-2'>
        <Label className='text-xs font-normal'>Kategori Buku</Label>
        {selectedValue.length > 0 && (
          <div className='w-full flex flex-wrap gap-2 items-center justify-start'>
            {selectedValue.map((item: string, index: number) => {
              return (
                <div key={index} className='flex justify-center px-2 items-center gap-x-0.5 bg-primary rounded-lg p-0.5'>
                  <Badge key={index} className='text-xs text-white p-0'>
                    {item}
                  </Badge>
                  <X className='w-3 h-3 pointer-events-auto' onClick={() => removeSelected(item)} />
                </div>  
              )
            })}
          </div>
        )}
          <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between text-xs text-muted-foreground" >
                {value
                  ? dataSelect.find((data: string) => data === value)
                  : "Pilih Kategori Buku"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="!w-full p-0">
              <Command className='w-full'>
                <CommandInput  placeholder="Cari kategori..." className="w-full text-muted-foreground text-xs h-9 !placeholder:text-xs" />
                <CommandList>
                  <CommandEmpty className='text-muted-foreground text-xs p-4'>Kategori tidak ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {dataSelect.map((data: string) => {
                      const isDataSelected = selectedValue.includes(data)
                      return (
                        <CommandItem  className='!text-xs py-2 !text-muted-foreground' key={data} value={data}
                          onSelect={(currentValue) => handleValue(currentValue)}
                        >
                          {data}
                          <Check
                            className={cn(
                              "ml-auto w-4 h-4",
                              isDataSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
        </Popover>
      </main>
      <input type="hidden" name="kategori" value={selectedValue} />
      <AddCategoriDialog />
    </section>
  )
}

export default CategorySectionContainer