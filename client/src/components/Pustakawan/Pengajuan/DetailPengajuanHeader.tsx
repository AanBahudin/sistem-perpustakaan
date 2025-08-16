import Logo from "@/components/landing/Navbar/Logo"

const DetailPengajuanHeader = () => {
  return (
    <div className='w-full flex items-center justify-between'>
                        {/* LEFT SECTION */}
        <div className='flex gap-x-4 items-center'>
            <Logo />

            <div className='flex flex-col items-start'>
                <h5 className='text-sm font-semibold'>Perpustakaan Informatika</h5>
                <p className='text-xs text-muted-foreground'>perpustakaanteknikinformatika@gmail.com</p>
            </div>
        </div>

        <div className='flex flex-col items-end'>
            <h4 className='text-xs font-semibold'>Diproses Oleh</h4>
            <h3 className='text-xs text-muted-foreground'>Pustakawan 1</h3>
            <p className='text-xs text-muted-foreground'>pustakawan1@gmail.com</p>
        </div>

    </div>
  )
}

export default DetailPengajuanHeader