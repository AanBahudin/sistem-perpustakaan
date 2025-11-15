import Logo from '@/components/landing/Navbar/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Container from '@/globals/Container'
import useLoginPustakawan from '@/hooks/fetchHooks/pustakawanHooks/authHooks/useLoginPustakawan'
import { Eye, Loader } from 'lucide-react'
import { useState } from 'react'

const PustakawanLoginPage = () => {

    const {isLoading, mutationFn} = useLoginPustakawan()
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    return (
        <Container className='min-h-[100vh] bg-[url("/images/callToAction.png")] object-contain bg-center w-full flex items-center justify-center bg-primary/10'>

            <section className='w-[90%] bg-accent border rounded-2xl  lg:max-w-[40vw] py-10 px-20 flex flex-col shadow-2xl'>
                <main className='w-full flex items-center justify-center mb-2'>
                    <Logo />
                </main>

                <h1 className='uppercase font-bold text-lg text-center'>Halo, Pustakawan! 👋</h1>
                <p className='text-center mt-2 text-sm text-muted-foreground'>Yuk, masuk ke dashboard dan mulai bantu jaga kelancaran perpustakaan hari ini. Cek buku, pantau peminjaman, dan tetap jadi andalan mahasiswa!</p>

                <form onSubmit={mutationFn} className='w-full mt-8 flex flex-col gap-y-4'>
                    <div className='flex flex-col'>
                        <Label htmlFor='email' className='text-sm'>Email</Label>
                        <div className='w-full flex items-center gap-x-1 mt-1.5'>
                            <Input className='text-sm selection:text-white' 
                                autoFocus
                                required
                                type='email' id='email' name='email' />
                        </div>
                    </div>

                    <div className='flex flex-col'>
                    <Label className='text-sm' htmlFor='password'>Kata sandi</Label>
                        <div className='w-full flex items-center gap-x-2 mt-1.5'>
                            <Input className='text-sm selection:text-white' 
                                placeholder='xxxx'
                                required
                                minLength={6}
                                type={showPassword ? 'text' : 'password'} 
                                name='password' id='password'
                                value={password} onChange={e => setPassword(e.target.value)} min={8} />
                            {password && (
                                <Button type='button' size='icon' variant='secondary' className='border duration-200 ease-in-out' onClick={handleShowPassword}>
                                    <Eye className={` ${showPassword ? 'stroke-primary' : ''}`} />
                                </Button>
                            )}
                        </div>
                    </div>

                    <Button 
                        className='text-white mt-6'
                        disabled={isLoading}>
                            {isLoading ? <Loader className='animate-spin duration-300' /> : 'Masuk'}
                    </Button>
                </form>
            </section>
        </Container>
    )
}

export default PustakawanLoginPage