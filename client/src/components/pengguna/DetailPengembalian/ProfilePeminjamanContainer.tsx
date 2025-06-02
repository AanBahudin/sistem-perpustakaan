import ProfileSection from "./ProfileSection"
import PeminjamanSection from "./PeminjamanSection"

type ProfilePeminjamanContainer = {
    profileData: any,
    peminjaman: any
}

const ProfilePeminjamanContainer = ({profileData, peminjaman} : ProfilePeminjamanContainer) => {
  return (
    <section className='flex gap-x-8 items-start my-2'>
        <ProfileSection profileData={profileData} />
        <PeminjamanSection peminjaman={peminjaman} />
    </section>
  )
}

export default ProfilePeminjamanContainer