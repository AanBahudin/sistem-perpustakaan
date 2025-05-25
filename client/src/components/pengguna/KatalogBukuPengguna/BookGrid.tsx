import { Button } from '@/components/ui/button'
import GridLayoutButtons from '@/globals/GridLayoutButtons'

const BookGrid = ({buku} : {buku: any}) => {

  const {buku: books} = buku

  if (buku.length === 0) {
    return <h1>Oops, tidak ditemukan</h1>
  }

  return (
    <section className='w-full grid grid-cols-12 gap-6'>
      {books.map((item:any, index: number) => {

        let newJudul: string = item.judul
        if (newJudul.length >= 25) {
          newJudul = newJudul.slice(0,27) + '...'
        }
        const newDeskripsi = item.deskripsi.slice(0,120)

        return (
          <main key={index} className='col-span-4 bg-card p-2  flex items-center justify-center gap-x-4 rounded-xl border hover:border-primary duration-150 ease-in-out group'>
            <img src={item.cover} className='w-[300px] h-[160px] overflow-hidden rounded object-cover object-center' alt="" />

            <div className='flex items-start justify-start flex-col'>
              <h1 className='text-lg font-semibold group-hover:underline duration-150 ease-in-out'>{newJudul}</h1>
              <p className='capitalize italic text-[12px] text-muted-foreground text-ellipsis w-full'>{"cara berhasil fokus di dunia yang ramai dan penuh gangguan".slice(0,40)}...</p>
              <p className='text-muted-foreground text-[12px] my-4'>{newDeskripsi}...</p>

              <div className='w-full flex gap-x-2'>
                <Button className='flex-1 text-white text-[12px] self-start flex flex-col' size='sm'>Selengkapnya</Button>
                <GridLayoutButtons id={item._id} />
              </div>
            </div>
          </main>
        )
      })}

    </section>
  )
}

export default BookGrid