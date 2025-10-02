const PeminjamanKategori = ({kategori} : {kategori: Array<string>}) => {

    if (kategori.length > 3) {
    kategori = kategori.slice(0, 3)
    }
    return (
        <div className="w-full flex gap-x-2 items-center">
            {kategori.map((item: string) => {
                return (
                <h5 className="mt-2 bg-muted w-fit px-6 border rounded py-1 text-[12px]">{item}</h5>
                )
            })}
        </div>
    )
}

export default PeminjamanKategori