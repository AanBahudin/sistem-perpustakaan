import { ThumbsUp } from 'lucide-react'
// import GlobalTooltip from './GlobalTooltip'
import { Button } from '@/components/ui/button'

const LikeButton = () => {
    return (
        <section>
            <Button type='submit' asChild className='w-8 h-8 border p-2 bg-transparent rounded-lg hover:bg-muted duration-200 ease-in-out'>
                <ThumbsUp className={`stroke-white "w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out"`} />
            </Button>
        </section>
    )
}

export default LikeButton