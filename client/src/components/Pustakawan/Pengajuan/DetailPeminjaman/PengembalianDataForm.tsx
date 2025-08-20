import { getAllKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import SelectInputCreatePengembalianData from './SelectInputCreatePengembalianData'
import TextAreaCreatePengembalianData from './TextAreaCreatePengembalianData'
import SwitchCreatePengembalianData from './SwitchCreatePengembalianData'
import { createPengembalianDataPustakawan } from '@/actions/Pustakawan/pustakawanPengembalianActions'
import { toast } from 'sonner'

const PengembalianDataForm = ({dataPeminjaman} : {dataPeminjaman: any}) => {

    const { kondisi } = dataPeminjaman
    const {data, isLoading} = useQuery({
        queryKey: ['kondisi'],
        queryFn: getAllKondisi
    })
    
    const mutation = useMutation({
        mutationFn: (formData: any) => createPengembalianDataPustakawan(formData),
        onSuccess: () => {
            toast('Data Pengembalian Dibuat')
        },
        onError: () => {
            toast('Gagal membuat data pengembalian')
        }
    })

    if (isLoading) return <h1>Loading ... </h1>
    const selectData = isLoading ? ['Memuat'] : data.map((item: any) => item.kondisi)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        mutation.mutate(data)
    }

    return (
        <section className='w-full my-4'>
            <h1 className='font-semibold'>BUAT DATA PENGEMBALIAN</h1>
            <p className='text-xs text-muted-foreground my-1'>Lengkapi form ini untuk mencatat buku yang telah dikembalikan. Data akan tersimpan otomatis dalam sistem.</p>

            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-3 my-4'>
                <SelectInputCreatePengembalianData kondisi={kondisi} selectData={selectData} />
                <TextAreaCreatePengembalianData />
                <input type="hidden" name='idPeminjaman' id='idPeminjaman' value={dataPeminjaman._id} />
                <SwitchCreatePengembalianData />
                <Button type='submit' className='text-xs text-white'>Buat Data Pengembalian</Button>
            </form>
        </section>
    )
}

export default PengembalianDataForm