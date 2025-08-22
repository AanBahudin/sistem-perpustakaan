import { Ellipsis, GraduationCap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

const Card = ({user} : {user: any}) => {

    const navigate = useNavigate()
    const navigatePengguna = (id: string) => {
        navigate(`/pustakawan/pengguna/detail/${id}`)
    }

    return (
        <section className='w-full border rounded-lg min-h-[10vh] hover:bg-accent/50 flex items-center justify-between px-4 py-2 gap-x-5 duration-200 ease-in-out'>
            <main className='flex gap-x-5'>
                <div className='w-14 h-14 rounded-full bg-accent/80 flex text-3xl font-semibold items-center justify-center text-accent'>{user.nama[0]}</div>
                <div className='flex flex-col items-start'>
                    <Link to={`pengguna/detail/${user._id}`} className='text-sm font-semibold hover:underline duration-200 ease-in-out cursor-pointer'>{user.nama}</Link>
                    <p className='text-xs text-muted-foreground'>{user.email}</p>
                    <div className='flex items-center gap-x-4 mt-1'>
                        <GraduationCap className='w-3 h-3'/>
                        <p className='text-muted-foreground text-xs'>{user.role}</p>
                    </div>
                </div>
            </main>


            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex items-center justify-center hover:bg-accent/40 duration-200 ease-in-out rounded-full h-8 w-8'>
                        <Ellipsis className="w-3 h-3" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="start">
                    <DropdownMenuItem
                        onClick={() => navigatePengguna(user._id)}
                            className=' flex items-center gap-x-2 text-xs p-2'>
                            Lihat pengguna
                    </DropdownMenuItem>
                </DropdownMenuContent> 
            </DropdownMenu>
        </section>
    )
}

export default Card