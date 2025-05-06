import React from 'react'

const PinjamanTerakhir = () => {
  return (
    <div className='w-2/3 h-fit bg-card rounded-xl border p-4'>
        <h1 className='text-2xl font-semibold'>Terakhir Kali Dipinjam</h1>

        <main className='w-full flex gap-x-6 col-span-9'>
        {Array.from({length: 4}).map((_, index) => {
            return (
            <div key={index} className='w-1/3 p-2 border mt-6 rounded'>
                <img className='w-full h-[200px] object-fill grayscale-75' src='https://res.cloudinary.com/dhthnjizr/image/upload/v1746458440/xcygxqv3pt4gzfno2h4z.jpg' alt="" />
                <p className='text-sm text-muted-foreground mt-2'>Clean Architecture</p>
            </div>
            )
        })}
        </main>
    </div>
  )
}

export default PinjamanTerakhir