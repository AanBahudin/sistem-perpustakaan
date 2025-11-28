import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ConfirmButton = () => {
    const {durasi: durasiPeminjaman, alasan} = useSelector((state: any) => state.peminjamanState)
    return (
        <Button
        asChild
            type='submit'
            disabled={durasiPeminjaman === '' || alasan.length < 15 || alasan === ''} 
            className="text-white w-full mt-6 disabled:cursor-not-allowed" size='sm'>
                <h1>Ajukkan</h1>
            
        </Button>
    )
}

export const DiajukkanStatus = ({link} : {link: string}) => {
    return (
        <Button variant='default' asChild className='text-white w-full mt-6 cursor-pointer'>
            <Link to={link}>Lihat detail</Link>
        </Button>
    )
}