import { getDetailPengajuanPeminjaman } from '@/actions/Pustakawan/pustakawanPengajuanActions'
import DetailPengajuanBreadCrumbs from '@/components/Pustakawan/Pengajuan/DetailPengajuanBreadCrumbs'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PeminjamanApprovalContainer from '@/components/Pustakawan/Pengajuan/DetailPeminjaman/PeminjamanApprovalContainer'
import Logo from '@/components/landing/Navbar/Logo'
import DetailPengajuanHeader from '@/components/Pustakawan/Pengajuan/DetailPengajuanHeader'
import { formatDate } from 'date-fns'
import { formatedDate } from '@/utils/formatDate'
import { Separator } from '@/components/ui/separator'

const PustakawanDetailPeminjaman = () => {

    const { idPeminjaman } = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'peminjaman', idPeminjaman],
        queryFn: () => getDetailPengajuanPeminjaman({id: idPeminjaman as string})
    })
    
    if (isLoading) return <h1>Loading ... </h1>
    const {statusPeminjaman} = data
    
    return (
        <Container className='w-full'>
            <DetailPengajuanBreadCrumbs text={data.buku.judul} />

            {statusPeminjaman === 'Diajukan' && <PeminjamanApprovalContainer peminjaman={data} />}
            
            <section className='w-full flex items-start gap-x-8'>
                {/* DETAIL PEMINJAMAN */}
                <main className='w-2/3 border rounded-xl min-h-[80vh] p-8'>
                    <DetailPengajuanHeader />   
                    {/* PEMINJAMAN SECTION */}
                    <section className='w-fuil p-4 bg-muted my-4 rounded-sm flex items-start gap-x-8'>
                        <main className='w-1/2'>
                            <h1 className='text-sm font-light'>Detail Peminjaman</h1>
                            <p className='text-xs text-muted-foreground mt-2'>Peminjaman - {data._id}</p>

                            <div className='w-full text-muted-foreground text-xs mt-4 gap-y-1 flex flex-col'>
                                <div className='w-full flex'>
                                    <p className='w-1/2'>Tanggal Pengajuan</p>
                                    <p>:   {formatedDate(data.createdAt)}</p>
                                </div>

                                <div className='w-full flex'>
                                    <p className='w-1/2'>Durasi Peminjaman</p>
                                    <p>:   {data.durasiPeminjaman} Hari</p>
                                </div>

                                <div className='w-full flex'>
                                    <p className='w-1/2'>Judul Buku</p>
                                    <p>:   {data.buku.judul.slice(0,22)}...</p>
                                </div>
                            </div>
                        </main>

                        <main className='w-1/2 flex flex-col items-end h-fit'>
                            <h1 className='text-sm font-light'>Diajukan Oleh</h1>
                            <p className='text-xs text-muted-foreground mt-2 font-semibold'>{data.peminjam.nama}</p>
                            <p className='text-xs text-muted-foreground'>{data.peminjam.email}</p>
                            <p className='text-xs text-muted-foreground'>{data.peminjam.idKampus} - {data.peminjam.role}</p>
                        </main>
                    </section>

                    <section className='w-full'>
                        <h1 className='text-sm font-semibold'>Detail buku</h1>
                        <p className='text-muted-foreground text-xs'>Detail buku untuk informasi lanjutan</p>
                        <Separator className='my-4'/>
                    </section>
                </main>

                <main className='w-1/3 border rounded-xl min-h-[40vh]'>

                </main>
            </section>

        </Container>
    )
}

export default PustakawanDetailPeminjaman