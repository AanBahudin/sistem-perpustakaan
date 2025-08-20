import { getAllKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import SelectInputCreatePengembalianData from './SelectInputCreatePengembalianData'
import TextAreaCreatePengembalianData from './TextAreaCreatePengembalianData'
import SwitchCreatePengembalianData from './SwitchCreatePengembalianData'

const PengembalianDataForm = ({dataPeminjaman} : {dataPeminjaman: any}) => {

    const { kondisi } = dataPeminjaman
    const {data, isLoading} = useQuery({
        queryKey: ['kondisi'],
        queryFn: getAllKondisi
    })
    
    if (isLoading) return <h1>Loading ... </h1>
    const selectData = isLoading ? ['Memuat'] : data.map((item: any) => item.kondisi)

    return (
        <section className='w-full my-4'>
            <h1 className='font-semibold'>BUAT DATA PENGEMBALIAN</h1>
            <p className='text-xs text-muted-foreground my-1'>Lengkapi form ini untuk mencatat buku yang telah dikembalikan. Data akan tersimpan otomatis dalam sistem.</p>

            <main className='w-full flex flex-col gap-y-3 my-4'>
                <SelectInputCreatePengembalianData kondisi={kondisi} selectData={selectData} />
                <TextAreaCreatePengembalianData />
                <input type="hidden" name='idPeminjaman' id='idPeminjaman' value={dataPeminjaman._id} />
                <SwitchCreatePengembalianData />
                <Button className='text-xs text-white'>Buat Data Pengembalian</Button>
            </main>
        </section>
    )
}

export default PengembalianDataForm