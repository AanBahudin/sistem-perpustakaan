import { CheckCheck, CheckCircle2Icon, LucideIcon } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Link } from 'react-router-dom'

type AlertContainerType = {
    title: string,
    link?: string,
    description: string
    Icon?: LucideIcon
}

export const DefaultAlert = ({title, Icon = CheckCircle2Icon, description} : AlertContainerType) => {
    return (
        <Alert className="bg-primary/10">
            <Icon />
            <AlertTitle className="font-bold capitalize">{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

export const LinkAlert = ({Icon=CheckCircle2Icon, title, description, link = '/my'} : AlertContainerType) => {
    return (
        <Alert className="bg-secondary">
            <Icon />
            <AlertTitle className="font-bold capitalize">{title}</AlertTitle>
            <AlertDescription className='flex items-center'>
                {description} 
                <Link className='underline hover:cursor-pointer' to={link}>Disini</Link>
            </AlertDescription>
        </Alert>
    )
}

export const DangerAlert = ({title, Icon = CheckCircle2Icon, description} : AlertContainerType) => {
    return (
        <Alert className="bg-destructive/70">
            <Icon />
            <AlertTitle className="font-bold capitalize">{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

export const DiajukkanAlert = ({idPinjam} : {idPinjam: string}) => {
    return (
        <Alert className="bg-secondary">
            <CheckCheck />
            <AlertTitle className="font-bold capitalize">Peminjaman Telah Diajukan</AlertTitle>
            <AlertDescription className='flex'>Anda dapat melihat detail pengajuan anda <Link to={`/my/peminjaman/${idPinjam}`} className='underline'>Disini</Link></AlertDescription>
        </Alert>
    )
}