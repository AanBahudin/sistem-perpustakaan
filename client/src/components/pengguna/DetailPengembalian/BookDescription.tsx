import { formatTextLength } from '@/utils/formatTextLength'
import { useState } from 'react'

const BookDescription = ({deskripsi} : {deskripsi: string}) => {

    const [showMore, setShowMore] = useState(false)
    const shortDesc = formatTextLength({minLength: 400, text: deskripsi})

    return (
        <section className='w-full'>
            <h2 className='font-bold mb-2 text-xl'>Deskripsi</h2>
            <p className='text-muted-foreground text-sm'>
                {showMore ? deskripsi : shortDesc}  
                <span onClick={() => setShowMore(!showMore)} className='text-primary font cursor-default italic hover:text-primary-foreground'> 
                    {showMore ? '   Lebih sedikit' : ' Selangkapnya ...'}
                </span>
            </p>
        </section>
    )
}

export default BookDescription