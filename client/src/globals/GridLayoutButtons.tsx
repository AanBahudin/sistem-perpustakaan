import { Share2 } from 'lucide-react'
import ShareBookDialog from './ShareBookDialog'
import { generateBookLink } from '@/utils/generateBookLink'
import AddLikedButton from './AddLikedButton'
import AddSimpananButton from './AddSimpananButton'

const GridLayoutButtons = ({id} : {id: string}) => {
    return (
        <div className="flex justify-center items-center gap-x-2">
            <AddLikedButton id={id} />
            <AddSimpananButton id={id} />

            <ShareBookDialog>
                <Share2 onClick={() => generateBookLink(id)} className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
            </ShareBookDialog>
        </div>
  )
}

export default GridLayoutButtons