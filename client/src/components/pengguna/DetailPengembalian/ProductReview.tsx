import { ImageOff } from 'lucide-react'
import { PengembalianBukuStats } from '.'

type ProductReviewType = {
    buku: any
}

const ProductReview = ({buku} : ProductReviewType)=> {
  return (
    <section className='w-full flex justify-start gap-x-4'>

      {buku?.cover ? (
        <img className='w-40 border object-contain h-36 rounded-lg' src={buku.cover} alt="" />
      ) : (
        <div className='w-40 h-36 rounded-lg border flex items-center justify-center'> <ImageOff /> </div>
      )}
      

      <main className='flex flex-col items-start justify-start'>
          <p className="uppercase text-primary text-[12px]">BUKU YANG DIPERPANJANG</p>
          <h1 className='font-bold text-lg'>{buku.judul}</h1>
          <p className='text-muted-foreground text-[12px]'>Id: {buku._id}</p>
          <p className='text-muted-foreground text-[12px]'>{buku.tagline}</p>
          <PengembalianBukuStats data={buku} />
      </main>
    </section>
  )
}

export default ProductReview