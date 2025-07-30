import { useState } from 'react'
import { Link } from 'react-router-dom'

const PustakawanUserDataContainer = () => {


    const [activeMenu, setActiveMenu] = useState('dosen')
    const items = ['dosen', 'mahasiswa', 'terbaru']

  return (
    <section className='w-full bg-accent border my-8 rounded-2xl h-[60vh] px-4 pt-8 pb-4 flex flex-col items-start'>
        <main className='w-full flex items-center justify-between'>
            <h1 className='text-lg'>Ringkasan Daftar Pengguna</h1>
            <Link to='/pustakawan/pengguna' className='text-xs hover:underline duration-200 ease-in-out cursor-default'>Lihat semua</Link>
        </main>

        <main className='w-full grid grid-cols-3 text-center text-xs mt-8 mb-4'>
            {items.map((item: string, index: number) => {
                return (    
                    <h1 onClick={() => setActiveMenu(item)} key={index} className={`${item === activeMenu ? 'border-b' : ' hover:rounded hover:bg-muted-foreground/10' } py-2 cursor-default duraticn-200 ease-in-out capitalize`}>{item}</h1>
                )
            })}
        </main>

        <main className='w-full flex flex-1 overflow-y-scroll scroll-custom flex-col items-start gap-y-4'>
            {Array.from({length: 6}).map((_, index: number) => {
                return (
                    <div key={index} className='w-full border rounded-lg min-h-[10vh] flex px-4 py-2 gap-x-5'>
                        <div className='w-14 h-14 rounded-full bg-muted-foreground'></div>
                        <div className='flex flex-col items-start'>
                            <h1 className='text-sm font-semibold'>Aan Bahudin</h1>
                        </div>
                    </div>
                )
            })}
        </main>
    </section>
  )
}

export default PustakawanUserDataContainer