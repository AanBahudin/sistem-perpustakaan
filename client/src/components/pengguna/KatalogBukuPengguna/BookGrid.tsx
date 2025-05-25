import { Button } from '@/components/ui/button'

const BookGrid = ({buku} : {buku: any}) => {

  const {buku: books} = buku
  return (
    <section className='w-full grid grid-cols-12 gap-6'>
      {books.map((item:any, index: number) => {

        const newDeskripsi = item.deskripsi.slice(0,110)

        return (
          <main key={index} className='col-span-6 bg-card p-4 flex items-center gap-x-4 rounded-xl border'>
            <img src={item.cover} className='max-w-20 h-38 rounded object-cover object-center' alt="" />
            <div className='flex items-start justify-start flex-col'>
              <h1 className='text-lg font-semibold'>{item.judul}</h1>
              <p className='capitalize italic text-[12px] text-muted-foreground text-ellipsis w-full'>{"cara berhasil fokus di dunia yang ramai dan penuh gangguan".slice(0,40)}...</p>
              <p className='text-muted-foreground text-sm my-4'>{newDeskripsi}...</p>

              <Button className='text-white text-[12px] self-start flex flex-col' size='sm'>Selengkapnya</Button>
            </div>
          </main>
        )
      })}

    </section>
  )
}

export default BookGrid