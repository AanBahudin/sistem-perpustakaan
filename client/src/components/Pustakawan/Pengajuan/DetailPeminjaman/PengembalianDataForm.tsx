import { getAllKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'
import { useQuery } from '@tanstack/react-query'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const PengembalianDataForm = ({dataPeminjaman} : {dataPeminjaman: any}) => {

    const { kondisi } = dataPeminjaman
    
    const [switchValue, setSwitchValue] = useState(false)
    const {data, isLoading} = useQuery({
        queryKey: ['kondisi'],
        queryFn: getAllKondisi
    })
    
    if (isLoading) return <h1>Loading ... </h1>
    const selectData = isLoading ? ['Memuat'] : data.map((item: any) => item.kondisi)
    const handleSwitchChange = () => {
        setSwitchValue(!switchValue)
    }

    return (
        <section className='w-full my-4'>
            <h1 className='font-semibold'>BUAT DATA PENGEMBALIAN</h1>
            <p className='text-xs text-muted-foreground my-1'>Lengkapi form ini untuk mencatat buku yang telah dikembalikan. Data akan tersimpan otomatis dalam sistem.</p>

            <main className='w-full flex flex-col gap-y-3 my-4'>
                <div className='flex flex-col'>
                    <Label className='text-sm mb-1'>Kondisi Buku</Label>
                    <p className='text-xs text-muted-foreground mb-1'>Tentukan keadaan buku saat dikembalikan.</p>
                    <Select defaultValue={kondisi} name='kondisiBuku'>
                        <SelectTrigger className="w-full text-xs">
                            <SelectValue placeholder="Pilih Kondisi Buku" className='!text-xs' />
                        </SelectTrigger>
                        <SelectContent className='!text-xs'>
                            <SelectGroup>
                                <SelectLabel>Kondisi</SelectLabel>
                                {selectData.map((item: string, index: number) => {
                                    return (
                                        <SelectItem className='text-xs' value={item} key={index}>{item}</SelectItem>
                                    )
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col'>
                    <Label className='text-sm mb-1'>Catatan Pengembalian</Label>
                    <p className='text-xs text-muted-foreground mb-1'>Catatan mengenai pengembalian</p>
                    <Textarea placeholder="Catatan pengembalian" className='!text-xs placeholder:text-xs' />
                </div>

                <input type="hidden" name='idPeminjaman' id='idPeminjaman' value={dataPeminjaman._id} />

                <div className='flex flex-col'>
                    <Label className='text-sm mb-1'>Buku Hilang</Label>
                    <p className='text-xs text-muted-foreground mb-2'>Laporan jika buku yang dikembalikan hilang</p>
                    <div className="flex items-center space-x-2">
                        <Switch
                            name='statusHilang'
                            onCheckedChange={handleSwitchChange}
                            // onChange={handleSwitchChange}
                            id="airplane-mode"  />
                        <Label htmlFor="airplane-mode" className={`text-xs  ${switchValue ? 'text-destructive' : 'text-destructive/50'}`}>Buku Hilang</Label>
                    </div>
                </div>

                <Button className='text-xs text-white'>Buat Data Pengembalian</Button>
            </main>
        </section>
    )
}

export default PengembalianDataForm