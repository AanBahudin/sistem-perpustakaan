import { CarouselItem } from '@/components/ui/carousel'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
const KategoryCard = ({data} : {data: any}) => {

    const [searchParams] = useSearchParams()
    const params = searchParams.get('q')
    const baseURL = '/my/discovery/category?q='
    return (
        <>
            {data.map((item:any, index:number) => {
                let isActive = params === item.nama
                let newTitle : string = item.nama
                if (newTitle.length > 15) {
                    newTitle = `${newTitle.slice(0, 12) }...`
                }
                return (
                    <CarouselItem key={index} className="basis-1/6 flex">
                        <div className={`w-full flex flex-col ${isActive && 'border-primary'} items-center justify-center p-4 rounded-xl border hover:border-primary duration-150 ease-in-out`}>
                            <Link to={`${baseURL}${item.nama}`} className='font-semibold text-center cursor-default'>{newTitle}</Link>
                        </div>
                    </CarouselItem>
                )
            })}
        </>
    )
}

export default KategoryCard