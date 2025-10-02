import { prodiLogin } from '@/actions/Prodi/prodiAuthActions'
import { SecondaryLogo } from '@/components/landing/Navbar/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Container from '@/globals/Container'
import { useMutation } from '@tanstack/react-query'
import { Eye, Loader } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProdiLoginPage = () => {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const mutation = useMutation({
        mutationFn: (data: any) => prodiLogin(data),
        onSuccess: () => {
            toast('Login Berhasil', {description: 'Selamat datang kembali di akun anda! '})
            navigate('/prodi')
        },
        onError: (data: any) => {
            const serverErrMsg = data.response.data.message
            const titleMsg = serverErrMsg ? 'Terjadi kesalahan!' : 'TIdak dapat melakukan login'
            const errMsg = serverErrMsg || 'Tidak dapat melakukan login'
            toast(titleMsg , {description: errMsg})
        }
    })

    const handleSubmit = async(event: any) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)

        mutation.mutate(data)
    }

    return (
        <Container className='min-h-[100vh] w-full flex items-center justify-center dark:bg-accent/10 bg-primary/20'>
            <form onSubmit={handleSubmit} className='w-full border rounded-2xl max-w-[40vw] py-10 px-20 flex flex-col shadow-2xl dark:bg-accent/10 bg-primary/30'>
                <main className='w-full flex items-center justify-center mb-2'>
                    <SecondaryLogo />
                </main>
                <h1 className='uppercase font-bold text-lg text-center'>login program studi</h1>
                <p className='text-center mt-2 text-sm text-muted-foreground'>Yuk, masuk ke dashboard dan mulai bantu jaga kelancaran perpustakaan hari ini. Cek buku, pantau peminjaman, dan tetap jadi andalan mahasiswa!</p>

                <main className='w-full mt-8 flex flex-col gap-y-4'>
                    <div className='flex flex-col'>
                        <Label htmlFor='email' className='text-sm'>Email</Label>
                        <div className='w-full flex items-center gap-x-1 mt-1.5'>
                            <Input className='text-sm selection:text-white' 
                                autoFocus
                                required
                                type='email' id='email' name='email'
                                value={email} onChange={(e => setEmail(e.target.value))} />
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
                                <Button type="button" size='icon' variant='secondary' className='dark:border duration-200 ease-in-out' onClick={handleShowPassword}>
                                    <Eye className={showPassword ? 'stroke-primary' : ''} />
                                </Button>
                            )}
                        </div>
                    </div>

                    <Button
                        type='submit'
                        className='text-white mt-6 bg-primary dark:bg-accent'
                        disabled={mutation.isPending}>
                            {mutation.isPending ? <Loader className='animate-spin duration-300' /> : 'Masuk'}
                    </Button>
                </main>
            </form>
        </Container>
    )
}

export default ProdiLoginPage