import PeminjamanDanProfilData from './PeminjamanDanProfilData'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const ProfileSection = ({profileData} : {profileData: any}) => {
  return (
    <section className="w-full my-2 rounded-lg bg-popover px-2 py-4">
      <h2 className='font-bold mb-2 uppercase'>Data pengguna</h2>

      <main className="w-full flex flex-col gap-y-4 mt-4">
        <PeminjamanDanProfilData label='nama lengkap' value={profileData.nama} />
        <PeminjamanDanProfilData label='NIM / NIDN' value={profileData.idKampus} />
        <PeminjamanDanProfilData label='email' value={profileData.email} />
        <PeminjamanDanProfilData label='Nomor Telepon' value={profileData.no_hp} />

        <Button size='sm' asChild className="dark:text-white capitalize text-[12px] mt-4">
            <Link to='/my/profil' className='flex items-center'>
              <ExternalLink className="w-4 h-4" />
              Profil anda
            </Link>
        </Button>
      </main>
    </section>
  )
}

export default ProfileSection