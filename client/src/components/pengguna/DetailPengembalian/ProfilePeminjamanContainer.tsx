import ProfileSection from "./ProfileSection"
import PeminjamanSection from "./PeminjamanSection"

type ProfilePeminjamanContainer = {
    profileData: any
}

const ProfilePeminjamanContainer = ({profileData} : ProfilePeminjamanContainer) => {
  return (
    <section className='flex gap-x-8 items-start my-2'>
        <ProfileSection profileData={profileData} />
        <PeminjamanSection />
    </section>
  )
}

export default ProfilePeminjamanContainer