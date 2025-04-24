import React from 'react'
import Container from '@/globals/Container'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const Kontak = () => {
  return (
    <Container className='mt-10 py-10'>
        <h1 id='kontak' className='text-4xl font-semibold'>Hubungi Kami</h1>

        <main className='grid grid-cols-1 lg:grid-cols-2 place-items-center'>
            <section>
                <p className='text-muted-foreground mt-6 leading-6'>
                Nikmati akses ke beragam koleksi buku, jurnal, dan sumber digital yang mendukung studi dan penelitian Anda. Dengan fasilitas yang nyaman, perpustakaan ini siap menjadi ruang belajar yang inspiratif. Nikmati akses ke beragam koleksi buku, jurnal
                </p>

                <section className='flex flex-col gap-y-4 mt-10'>
                    <div className='flex items-center gap-x-6'>
                        <div className='w-14 h-14 rounded-full bg-muted-foreground'></div>
                        <section>
                            <h4 className='font-medium'>Alamat</h4>
                            <p className='text-muted-foreground'>Jalan Dayanu Ikhsanuddin</p>
                        </section>
                    </div>

                    <div className='flex items-center gap-x-6'>
                        <div className='w-14 h-14 rounded-full bg-muted-foreground'></div>
                        <section>
                            <h4 className='font-medium'>Alamat</h4>
                            <p className='text-muted-foreground'>Jalan Dayanu Ikhsanuddin</p>
                        </section>
                    </div>

                    <div className='flex items-center gap-x-6'>
                        <div className='w-14 h-14 rounded-full bg-muted-foreground'></div>
                        <section>
                            <h4 className='font-medium'>Alamat</h4>
                            <p className='text-muted-foreground'>Jalan Dayanu Ikhsanuddin</p>
                        </section>
                    </div>
                </section>

                <Separator className='my-8' />

                <section>
                    <h3 className='text-lg'>Ikuti kami</h3>

                    <div className='flex gap-x-4 mt-4'>
                        <div className='w-10 h-10 rounded-full bg-muted-foreground'></div>
                        <div className='w-10 h-10 rounded-full bg-muted-foreground'></div>
                        <div className='w-10 h-10 rounded-full bg-muted-foreground'></div>
                        <div className='w-10 h-10 rounded-full bg-muted-foreground'></div>
                    </div>
                </section>
            </section>

            <section className='min-w-[500px] rounded p-6 h-full bg-muted place-self-end hidden lg:grid'>
                <h1 className='text-2xl font-semibold'>Kirim Pesan</h1>

                <div className="flex flex-col mt-6 gap-y-4">
                    <Input placeholder='Nama' type='text' />
                    <Input placeholder='Email' type='email' />
                    <Textarea placeholder='Pesan anda' />
                    <p className="text-sm text-muted-foreground">
                        Pesan anda akan terkirim ke kantor kami
                    </p>
                    <Button  title='Kirim Pesan' className='text-white'>Kirim pesan</Button>
                </div>
            </section>

        </main>
    </Container>
  )
}

export default Kontak