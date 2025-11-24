import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { logoutPenggunaAction } from '@/actions/Pengguna/Auth'

const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
          await logoutPenggunaAction()
          navigate('/')
        } catch (err) {
          toast('Gagal logout', {description: 'Terjadi kesalahan saat logout'})
        }
    }

  return (
    <Button onClick={handleLogout} className='text-white'>Logout</Button>
  )
}

export default LogoutButton