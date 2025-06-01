import { Link } from "react-router-dom"

const OtherData = ({semuaPeminjaman, currentIdBuku} : {semuaPeminjaman: any, currentIdBuku: string}) => {

  return (
    <section className='col-span-3 w-full border rounded-xl p-4 flex flex-col items-center justify-center gap-y-5 overflow-y-auto'>
      <h1 className="text-left uppercase text-muted-foreground">Peminjaman Lainnya</h1>
      {semuaPeminjaman.filter((item:any) => {
        return item.buku._id !== currentIdBuku
          }).map((item: any, index:number) => {
            const {buku} = item
            return (
              <Link to={`/my/peminjaman/${item._id}/${buku._id}`} key={index} className="flex flex-col w-full items-center justify-center">
                <img className="w-48 h-48 object-fill rounded" src={buku.cover} alt="" />
                <p className="text-sm mt-2 text-muted-foreground">{buku.judul}</p>
              </Link>
            )
      })}
    </section>
  )
}

export default OtherData