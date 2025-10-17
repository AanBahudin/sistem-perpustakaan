import { toast } from "sonner";

interface PerpanjanganData {
    tipe: string,
    data: {_id:string},
    title: string,
    deskripsi: string
}

interface HandleFn {
    data: PerpanjanganData,
    navigate: (path: string) => void,
    toastFn?: typeof toast
}

export const pustakawanHandlePerpanjangan = ({data, navigate} : HandleFn) => {
    try {
        const {tipe, data: dataPeminjaman, title, deskripsi} = data
        const detailURL = `/pustakawan/pengajuan/${tipe.toLowerCase()}/${dataPeminjaman._id}`
    
        toast(title, {
            description: deskripsi,
            duration: 10000,
            action: {
                label: "Lihat",
                onClick: () => navigate(detailURL)
            }
        })
    } catch (error) {
        console.log('error')
        toast('Terdapat Perpanjangan Baru')
    }
} 