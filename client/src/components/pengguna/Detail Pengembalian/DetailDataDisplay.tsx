import { LucideIcon } from "lucide-react"


type DetailDataDisplayType = {
    title: string,
    Icon: LucideIcon,
    value: string | number,
    variant?: string
}

const DetailDataDisplay = ({title, Icon, value, variant = 'stroke-primary'} : DetailDataDisplayType) => {
  return (
    <section className='w-full mt-4'>
        <p className='uppercase text-[12px] text-muted-foreground font-bold'>{title}</p>
        <div className='flex items-center justify-start gap-x-4 mt-1'>
            <Icon className={`w-3 h-3 ${variant}`} />
            <p className='text-[12px] text-muted-foreground'>{value}</p>
        </div>
    </section>
  )
}

export default DetailDataDisplay