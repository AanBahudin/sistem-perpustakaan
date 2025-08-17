import { getSinglePerpanjanganPustakawan } from "@/actions/Pustakawan/pustakawanPerpanjanganActions"
import DetailPengajuanBreadCrumbs from "@/components/Pustakawan/Pengajuan/DetailPengajuanBreadCrumbs"
import PerpanjanganApprovalContainer from "@/components/Pustakawan/Pengajuan/DetailPerpanjangan/PerpanjanganApprovalContainer"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const PustakawanDetailPerpanjanganPage = () => {

    const { idPerpanjangan } = useParams()
    const {data, isLoading} = useQuery({
        queryKey: ['detail', 'perpanjangan', idPerpanjangan],
        queryFn: () => getSinglePerpanjanganPustakawan(idPerpanjangan as string)
    })

    if (isLoading) return <h1>Loading ...</h1>
    const { idBuku: buku } = data

    return (
        <Container className="w-full">
            <DetailPengajuanBreadCrumbs text={buku.judul} />
            <PerpanjanganApprovalContainer perpanjangan={data} />
        </Container>
    )
}

export default PustakawanDetailPerpanjanganPage