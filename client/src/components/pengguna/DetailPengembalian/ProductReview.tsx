import BukuStats from './BukuStats'

type ProductReviewType = {
    buku: any
}

const ProductReview = ({buku} : ProductReviewType)=> {
  return (
    <section className='w-full flex justify-start gap-x-4'>
        <img className='w-40 border object-contain h-36 rounded-lg' src={buku.cover} alt="" />

        <main className='flex flex-col items-start justify-start'>
            <p className="uppercase text-primary text-[12px]">BUKU YANG DIPINJAM</p>
            <h1 className='font-bold text-lg'>{buku.judul}</h1>
            <p className='text-muted-foreground text-[12px]'>Id: {buku._id}</p>
            <p className='text-muted-foreground text-[12px]'>{buku.tagline}</p>
            <BukuStats data={buku} />
        </main>
    </section>
  )
}

export default ProductReview