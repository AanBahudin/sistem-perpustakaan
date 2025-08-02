import { EllipsisVertical, GraduationCap } from 'lucide-react'

const Card = ({user} : {user: any}) => {
  return (
    <div className='w-full border rounded-lg min-h-[10vh] hover:bg-accent/50 flex items-center justify-between px-4 py-2 gap-x-5 duration-200 ease-in-out'>
        <div className='flex gap-x-5'>
            <div className='w-14 h-14 rounded-full bg-accent/80 flex text-3xl font-semibold items-center justify-center text-accent'>{user.nama[0]}</div>
            <div className='flex flex-col items-start'>
                <h1 className='text-sm font-semibold hover:underline duration-200 ease-in-out cursor-pointer'>{user.nama}</h1>
                <p className='text-xs text-muted-foreground'>{user.email}</p>
                <div className='flex items-center gap-x-4 mt-1'>
                    <GraduationCap className='w-3 h-3'/>
                    <p className='text-muted-foreground text-xs'>{user.role}</p>
                </div>
            </div>
        </div>

        <div className='flex items-center justify-center hover:bg-accent/40 duration-200 ease-in-out rounded-full h-8 w-8'>
            <EllipsisVertical className='h-5 stroke-muted-foreground rounded-full' />
        </div>
    </div>
  )
}

export default Card