import Container from "@/globals/Container"
import { LucideIcon} from 'lucide-react'
import { IconsData } from "@/utils/constants"

const IconBelt = () => {
    return (
        <Container className='w-[70%] rounded-lg min-h-[20vh] h-fit bg-white dark:bg-[#111] shadow-2xl top-[80vh] absolute flex items-center justify-evenly'>
            {IconsData.map((item: any, index: number) => {
                const Icon : LucideIcon = item.icon
                return (
                    <main className="flex flex-col items-center gap-y-2">
                        <div key={index} className='p-3 rounded-xl bg-primary/20'>
                            <Icon className='w-10 stroke-primary h-10' />
                        </div>
                        <p className="text-lg text-muted-foreground">{item.title}</p>
                    </main>
                )
            })}
        </Container>
    )
}

export default IconBelt