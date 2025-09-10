import Container from '@/globals/Container'
import DetailBukuBreadcrumbs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuBreadcrumbs'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import DetailBukuTabs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuTabs'
import { useSelector } from 'react-redux'
import GeneralInfoContainer from '@/components/Pustakawan/Buku/DetailBuku/GeneralInfoContainer'
import StatistikPeminjamanDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatsPeminjamanDetailBuku'
import StatistikHilangDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatistikHilangDetailBuku'
import StatistikPengembalianDetailBuku from '@/components/Pustakawan/Buku/DetailBuku/StatistikPengembalianDetailBuku'
import DetailBukuDropdownMenu from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuDropdownMenu'
import PustakawanDetailBukuLoading from '@/components/Pustakawan/Buku/DetailBuku/PustakawanDetailBukuLoading'
import { prodiGetSingleBuku } from '@/actions/Prodi/prodiBukuActions'

const ProdiDetailBuku = () => {

    const { id: idBuku } = useParams()

    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'buku', idBuku],
        queryFn: () => prodiGetSingleBuku(idBuku as string)
    })

    const { pustakawanDetailBukuTabs: isActive } = useSelector((state: any) => state.detailBukuState)
    if (isLoading) return <PustakawanDetailBukuLoading />

    return (
        <Container className='w-full'>
            <section className='w-full flex items-center justify-between'>
                <DetailBukuBreadcrumbs text={data.buku.judul} />
                <DetailBukuDropdownMenu idBuku={data.buku._id} />
            </section>
            <DetailBukuTabs />

            {isActive === 'Umum' && <GeneralInfoContainer data={data.buku} />}     
            {isActive === 'Peminjaman' && <StatistikPeminjamanDetailBuku data={data} untuk='prodi' />}   
            {isActive === 'Riwayat Pengembalian' && <StatistikPengembalianDetailBuku data={data} untuk='prodi' />}
            {isActive === 'Riwayat Hilang' && <StatistikHilangDetailBuku data={data} untuk='prodi' />}
        </Container>
    )
}

export default ProdiDetailBuku