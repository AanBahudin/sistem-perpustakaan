

const InformationContainer = ({data} : {data: any}) => {

  const {penulis, penerbit, tahunTerbit, jumlahHalaman, ISBN, bahasa} = data
  const tahun = new Date(tahunTerbit).getFullYear();

  return (
    <section className="w-full py-4 text-sm rounded flex gap-4 items-center justify-between">
      <main className="w-fit flex flex-col gap-y-2">
        <div className="grid grid-cols-3">
          <p className="col-span-2">Penulis</p>
          <p className="text-muted-foreground col-span-1">{penulis}</p>
        </div>

        <div className="grid grid-cols-3">
          <p className="col-span-2">Penerbit</p>
          <p className="text-muted-foreground col-span-1">{penerbit}</p>
        </div>

        <div className="grid grid-cols-3">
          <p className="col-span-2">Tahun terbit</p>
          <p className="text-muted-foreground col-span-1">{tahun}</p>
        </div>
      </main>

      <main className="w-fit flex flex-col gap-y-2">
        <div className="grid grid-cols-3">
          <p className="col-span-2">Jumlah Halaman</p>
          <p className="text-muted-foreground col-span-1">{jumlahHalaman} lembar</p>
        </div>

        <div className="grid grid-cols-3">
          <p className="col-span-2">Bahasa</p>
          <p className="text-muted-foreground col-span-1">{bahasa || 'Indonesia'}</p>
        </div>

        <div className="grid grid-cols-3">
          <p className="col-span-2">ISBN</p>
          <p className="text-muted-foreground col-span-1">{ISBN}</p>
        </div>
      </main>
    </section>
  )
}

export default InformationContainer