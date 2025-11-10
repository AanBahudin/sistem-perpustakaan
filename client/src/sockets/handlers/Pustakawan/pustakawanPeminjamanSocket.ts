import { toast } from "sonner"

interface PeminjamanData {
    tipe: string,
    data: {_id:string},
    title: string,
    deskripsi: string
}

interface HandleFn {
    data: PeminjamanData,
    navigate: (path: string) => void,
    toastFn: typeof toast
}

export const pustakawanHandlePeminjaman = ({data, navigate, toastFn} : HandleFn) => {



    try {
        const {tipe, data: dataPeminjaman, title, deskripsi} = data
        const detailURL = `/pustakawan/pengajuan/${tipe.toLowerCase()}/${dataPeminjaman._id}`
    
        toastFn(title, {
            description: deskripsi,
            duration: 10000,
            action: {
                label: "Lihat",
                onClick: () => navigate(detailURL)
            }
        })
    } catch (error) {
        console.log('error')
        toast('Terdapat Peminjaman Baru')
    }
}