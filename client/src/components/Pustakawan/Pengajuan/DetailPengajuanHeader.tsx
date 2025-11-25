import Logo from "@/components/landing/Navbar/Logo"


const DetailPengajuanHeader = ({dataPustakawan} : {dataPustakawan: any}) => {
  return (
    <section className='w-full flex items-center justify-between'>
      <main className='flex gap-x-4 items-center'>
          <Logo />

          <div className='flex flex-col items-start'>
              <h5 className='text-sm font-semibold'>Perpustakaan Informatika</h5>
              <p className='text-xs text-muted-foreground'>perpustakaanteknikinformatika@gmail.com</p>
          </div>
      </main>

      <main className='flex flex-col items-end'>
          <h4 className='text-xs font-semibold'>Diproses Oleh</h4>
          <h3 className='text-xs text-muted-foreground'>{dataPustakawan?.nama}</h3>
          <p className='text-xs text-muted-foreground'>{dataPustakawan?.email}</p>
      </main>

    </section>
  )
}

export default DetailPengajuanHeader