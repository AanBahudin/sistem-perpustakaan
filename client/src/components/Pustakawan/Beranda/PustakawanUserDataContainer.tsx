import { EllipsisVertical, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const PustakawanUserDataContainer = () => {


    const [activeMenu, setActiveMenu] = useState('dosen')
    const items = ['dosen', 'mahasiswa', 'terbaru']

  return (
    <section className='w-full bg-accent/40 border my-8 rounded-2xl h-[60vh] px-4 pt-8 pb-4 flex flex-col items-start'>
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
                    <div key={index} className='w-full border rounded-lg min-h-[10vh] hover:bg-accent/50 flex items-center justify-between px-4 py-2 gap-x-5 duration-200 ease-in-out'>
                        <div className='flex gap-x-5'>
                            <div className='w-14 h-14 rounded-full bg-muted-foreground flex text-3xl font-semibold items-center justify-center text-accent'>{'AanBahudin'[0]}</div>
                            <div className='flex flex-col items-start'>
                                <h1 className='text-sm font-semibold hover:underline duration-200 ease-in-out cursor-pointer'>Aan Bahudin</h1>
                                <p className='text-xs text-muted-foreground'>aanbahudin@gmali.comm</p>
                                <div className='flex items-center gap-x-4 mt-1'>
                                    <GraduationCap className='w-3 h-3'/>
                                    <p className='text-muted-foreground text-xs'>Dosen</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-center hover:bg-accent/40 duration-200 ease-in-out rounded-full h-8 w-8'>
                            <EllipsisVertical className='h-5 stroke-muted-foreground rounded-full' />
                        </div>
                    </div>
                )
            })}
        </main>
    </section>
  )
}

export default PustakawanUserDataContainer