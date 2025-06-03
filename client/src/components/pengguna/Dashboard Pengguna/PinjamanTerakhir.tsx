import LastBorrowBook from "./LastBorrowBook"

const PinjamanTerakhir = () => {
  return (
    <div className='col-span-12 lg:col-span-6 h-fit lg:h-[350px] bg-card rounded-xl border p-4'>
        <h3 className="font-semibold">Terakhir Dipinjam</h3>
        <LastBorrowBook />
    </div>
  )
}

export default PinjamanTerakhir