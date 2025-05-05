import { accountStatus } from '@/actions/authActions';
import Logo from '@/components/landing/Navbar/Logo';
import { Button } from '@/components/ui/button';
import loginImage from '@/assets/images/loginImg.png'
import Container from '@/globals/Container';
import { QueryClient } from '@tanstack/react-query'
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { Check, X } from 'lucide-react';

export const loader = (queryClient : QueryClient) => async() => {
    const {verifikasiEmail, verifikasiProdi, nama} = await accountStatus()
    
    return {verifikasiEmail, verifikasiProdi, nama}
}

const Verify : React.FC = () => {

    const {verifikasiEmail, verifikasiProdi, nama} = useLoaderData() 

    return (
        <Container className='h-fit lg:h-[100vh] lg:p-20'>
            <section className='h-full mt-30 lg:mt-0 grid grid-cols-1 lg:grid-cols-2 p-10 gap-x-10 border rounded-xl shadow-2xl overflow-hidden'>
                <div className='grid content-center'>
                    <Logo />
                    <h1 className='text-foreground text-3xl font-semibold mt-4'>Hallo {nama}</h1>
                    <h3 className='text-sm mt-2'>Akunmu belum sepenuhnya aktif. Untuk dapat menggunakan layanan perpustakaan, mohon selesaikan dua langkah berikut:</h3>

                    <main className='flex gap-x-2 items-start text-sm mt-6'>
                        <span> {verifikasiEmail ? <Check className='stroke-primary' size={20} /> : <X className='stroke-red-400' size={20} />} </span>
                        <div>
                            <h5>Verifikasi Email</h5>
                            <p className='text-muted-foreground'>Kami telah mengirimkan email verifikasi ke alamat yang kamu gunakan saat mendaftar. Silakan cek kotak masuk (atau folder spam) dan klik tautan verifikasi.</p>
                        </div>
                    </main>

                    <main className='flex gap-x-2 text-sm mt-2'>
                        <span> {verifikasiProdi ? <Check className='stroke-primary' size={20} /> : <X className='stroke-red-400' size={20} />} </span>
                        <div>
                            <h5>Menunggu Persetujuan Program Studi</h5>
                            <p className='text-muted-foreground'>Setelah email diverifikasi, akunmu akan diperiksa oleh pihak program studi. Proses ini biasanya memerlukan waktu 1–2 hari kerja.</p>
                        </div>
                    </main>

                    <Button size={'sm'} className='mt-10'>Logout</Button>
                </div>

                <div className='col-span-1 h-full hidden lg:grid content-center place-items-end'>
                    <img className='w-[500px] h-[500px] object-cover rounded-2xl' src={loginImage} />
                </div>

            </section>
        </Container>
    )
}

export default Verify