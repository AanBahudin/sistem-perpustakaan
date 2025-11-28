
const DetailPengembalianInfo = ({data} : {data: any}) => {

    const {idPengguna, idPeminjaman, statusPengembalian} = data
    const {nama} = idPengguna
    const {durasiPeminjaman, _id, kondisi, statusPeminjaman} = idPeminjaman

    return (
        <section className="w-full grid grid-cols-12 gap-x-10 place-items-start my-4 ml-10 text-muted-foreground">
        <div className='w-full col-span-6 grid grid-cols-2'>
            <main className="flex flex-col gap-y-2 font-semibold">
                <p>Nama Peminjam</p>
                <p>Id Peminjaman</p>
                <p>Durasi Peminjaman</p>
                
            </main>

            <main className="flex flex-col gap-y-2">
                <p>: {nama}</p>
                <p>: {_id}</p>
                <p>: {durasiPeminjaman} Hari</p>
            </main>
        </div>
        
        <div className='w-full col-span-6 grid grid-cols-2'>
            <main className="flex flex-col gap-y-2 font-semibold">
                <p>Kondisi Buku</p>
                <p>Status Peminjaman</p>
                <p>Status Pengembalian</p>
            </main>

            <main className="flex flex-col gap-y-2">
                <p>: {kondisi}</p>
                <p>: {statusPeminjaman}</p>
                <p>: {statusPengembalian}</p>
            </main>
        </div>
        
    </section>
    )
}

export default DetailPengembalianInfo