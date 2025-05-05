import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { logoutAction } from '@/actions/authActions'

const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
          await logoutAction()
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