import { LucideIcon, ThumbsUp, SaveIcon, Eye } from "lucide-react"
import GlobalTooltip from "@/globals/GlobalTooltip"
import { Badge } from "@/components/ui/badge"

const DetailBukuBadge = ({like = 0, lihat = 0, simpan = 0} : {like: number, lihat: number, simpan: number}) => {
    const value: Array<number> = [like, simpan, lihat]
    const Icons: Array<LucideIcon> = [ThumbsUp, SaveIcon, Eye]
    const text: Array<string> = ['Suka', 'Simpan', 'Lihat']

    return (
        <section className='flex items-center gap-x-2'>
            {value.map((item: number, index: number) => {
                const Icon: LucideIcon = Icons[index]
                return (
                    <GlobalTooltip key={index} text={text[index]}>
                        <Badge className='text-white flex items-center'>
                            <Icon />
                            {item}
                        </Badge>
                    </GlobalTooltip>
                )
            })}
        </section>
    )
}

export default DetailBukuBadge