import { getAllKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import SelectInputCreatePengembalianData from './SelectInputCreatePengembalianData'
import TextAreaCreatePengembalianData from './TextAreaCreatePengembalianData'
import SwitchCreatePengembalianData from './SwitchCreatePengembalianData'
import { createPengembalianDataPustakawan } from '@/actions/Pustakawan/pustakawanPengembalianActions'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PengembalianDataForm = ({dataPeminjaman} : {dataPeminjaman: any}) => {

    const navigate = useNavigate()
    const { kondisi } = dataPeminjaman
    const {data, isLoading} = useQuery({
        queryKey: ['kondisi'],
        queryFn: getAllKondisi
    })
    
    const mutation = useMutation({
        mutationFn: (formData: any) => createPengembalianDataPustakawan(formData),
        onSuccess: (data) => {
            toast('Data Pengembalian Dibuat')
            navigate(`/pustakawan/pengajuan/pengembalian/${data._id}`)
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
                <Button disabled={mutation.isPending} type='submit' className='text-xs text-white'>
                    {mutation.isPending ? <Loader className='animate-spin' /> : 'Buat Data Pengembalian'}
                </Button>
            </form>
        </section>
    )
}

export default PengembalianDataForm